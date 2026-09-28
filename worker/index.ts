/**
 * Cloudflare Worker: serves the static site from ./dist and handles POST /api/signup.
 *
 * Two kinds of request go to /api/signup:
 *   1. A signup:  { email, product, page, website, attribution }  -> { ok: true, token }
 *   2. An answer: { token, question, answer }                     -> 204
 * The token from (1) proves the answer belongs to the email that just signed up.
 *
 * Secrets (set in the Cloudflare dashboard, or .dev.vars locally): see .env.example.
 */

interface Env {
  ASSETS: { fetch: (req: Request) => Promise<Response> };
  SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  SIGNING_SECRET?: string;
  IP_HASH_SALT?: string;
}

const PRODUCTS = ['everyday-wash', 'quikwash', 'undergarment-wash', 'any'] as const;
const ANSWERS: Record<string, readonly string[]> = {
  price: ['yes', 'maybe', 'no'],
  first_choice: ['everyday-wash', 'quikwash', 'undergarment-wash'],
};
const EMAIL_RE = /^[^\s@"'<>()\[\],;:\\]+@[^\s@"'<>()\[\],;:\\]+\.[a-z]{2,}$/i;
const MAX_BODY = 8 * 1024;
const TOKEN_TTL_S = 60 * 60;

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });

const str = (v: unknown, max: number): string | null =>
  typeof v === 'string' && v.trim() ? v.trim().slice(0, max) : null;

export function isValidEmail(email: string): boolean {
  if (email.length > 254 || !EMAIL_RE.test(email)) return false;
  const [local, domain] = email.split('@');
  return local.length <= 64 && !domain.includes('..') && !domain.startsWith('.') && !domain.startsWith('-');
}

// ---- Tokens: base64url(payload).base64url(HMAC-SHA256(payload)) ----
const enc = new TextEncoder();
const b64url = (buf: ArrayBuffer | Uint8Array) =>
  btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const fromB64url = (s: string) => Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0));

async function hmacKey(secret: string) {
  return crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
}
async function signToken(email: string, secret: string): Promise<string> {
  const payload = b64url(enc.encode(JSON.stringify({ e: email, x: Math.floor(Date.now() / 1000) + TOKEN_TTL_S })));
  const sig = await crypto.subtle.sign('HMAC', await hmacKey(secret), enc.encode(payload));
  return `${payload}.${b64url(sig)}`;
}
async function verifyToken(token: string, secret: string): Promise<string | null> {
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return null;
  try {
    const ok = await crypto.subtle.verify('HMAC', await hmacKey(secret), fromB64url(sig), enc.encode(payload));
    if (!ok) return null;
    const { e, x } = JSON.parse(new TextDecoder().decode(fromB64url(payload)));
    return typeof e === 'string' && typeof x === 'number' && x > Date.now() / 1000 ? e : null;
  } catch {
    return null;
  }
}

async function sha256(text: string): Promise<string> {
  return b64url(await crypto.subtle.digest('SHA-256', enc.encode(text)));
}

// ---- Supabase (PostgREST RPC) ----
async function rpc(env: Env, fn: string, args: Record<string, unknown>): Promise<Response> {
  const key = env.SUPABASE_SERVICE_ROLE_KEY!;
  const headers: Record<string, string> = { apikey: key, 'content-type': 'application/json' };
  // Legacy service_role keys are JWTs and also go in Authorization. New sb_secret_ keys only need apikey.
  if (key.startsWith('eyJ')) headers.authorization = `Bearer ${key}`;
  return fetch(`${env.SUPABASE_URL!.replace(/\/$/, '')}/rest/v1/rpc/${fn}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(args),
  });
}

async function handleSignup(req: Request, env: Env): Promise<Response> {
  if (req.method !== 'POST') return json(405, { error: 'method_not_allowed' });

  // Only accept posts from our own pages. Locally, `npm run dev` serves pages on another port.
  const origin = req.headers.get('origin');
  const url = new URL(req.url);
  const isLocal = (h: string) => h === 'localhost' || h === '127.0.0.1';
  if (origin) {
    const o = new URL(origin);
    if (o.host !== url.host && !(isLocal(o.hostname) && isLocal(url.hostname))) return json(403, { error: 'forbidden' });
  }

  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY || !env.SIGNING_SECRET) {
    console.error('Signup endpoint is missing SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY or SIGNING_SECRET');
    return json(500, { error: 'not_configured' });
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY) return json(413, { error: 'too_large' });
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return json(400, { error: 'bad_json' });
  }
  if (!body || typeof body !== 'object') return json(400, { error: 'bad_json' });

  // (2) An answer to the optional question.
  if (typeof body.token === 'string') {
    const email = await verifyToken(body.token, env.SIGNING_SECRET);
    if (!email) return json(401, { error: 'bad_token' });
    const question = str(body.question, 40) ?? '';
    const answer = str(body.answer, 40) ?? '';
    const kind = question === 'first_choice' ? 'first_choice' : /^price_(everyday-wash|quikwash|undergarment-wash)$/.test(question) ? 'price' : null;
    if (!kind || !ANSWERS[kind].includes(answer)) return json(400, { error: 'bad_answer' });
    const res = await rpc(env, 'record_answer', { p_email: email, p_question: question, p_answer: answer });
    if (!res.ok) {
      console.error('record_answer failed', res.status, await res.text());
      return json(502, { error: 'db' });
    }
    return new Response(null, { status: 204 });
  }

  // (1) A signup. The honeypot field is invisible to people; bots fill it in.
  // Answer exactly like a success so bots learn nothing, but store nothing.
  if (str(body.website, 200)) return json(200, { ok: true, token: '' });

  const email = (str(body.email, 320) ?? '').toLowerCase();
  if (!isValidEmail(email)) return json(400, { error: 'invalid_email' });

  const product = PRODUCTS.includes(body.product as (typeof PRODUCTS)[number]) ? (body.product as string) : 'any';
  const page = str(body.page, 200);
  const a = (body.attribution && typeof body.attribution === 'object' ? body.attribution : {}) as Record<string, unknown>;
  const ip = req.headers.get('cf-connecting-ip') ?? '';

  const res = await rpc(env, 'upsert_signup', {
    p_email: email,
    p_product: product,
    p_page: page?.startsWith('/') ? page : null,
    p_first_page: str(a.first_page, 200),
    p_utm_source: str(a.utm_source, 200),
    p_utm_medium: str(a.utm_medium, 200),
    p_utm_campaign: str(a.utm_campaign, 200),
    p_utm_content: str(a.utm_content, 200),
    p_utm_term: str(a.utm_term, 200),
    p_fbclid: str(a.fbclid, 500),
    p_referrer: str(a.referrer, 500),
    p_user_agent: str(req.headers.get('user-agent'), 500),
    p_ip_hash: ip ? await sha256(`${env.IP_HASH_SALT ?? env.SIGNING_SECRET}:${ip}`) : null,
  });
  if (!res.ok) {
    console.error('upsert_signup failed', res.status, await res.text());
    return json(502, { error: 'db' });
  }
  const result = (await res.json()) as { status?: string };
  if (result.status === 'rate_limited') return json(429, { error: 'rate_limited' });

  return json(200, { ok: true, token: await signToken(email, env.SIGNING_SECRET) });
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);
    if (url.pathname === '/api/signup') {
      try {
        return await handleSignup(req, env);
      } catch (err) {
        console.error('Signup error', err);
        return json(500, { error: 'server' });
      }
    }
    return env.ASSETS.fetch(req);
  },
};
