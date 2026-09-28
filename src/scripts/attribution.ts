// First-touch attribution: UTM tags, fbclid, referrer and landing page, kept for 30 days.
const KEY = 'twist_attr';
const TTL_MS = 30 * 24 * 60 * 60 * 1000;
const UTM = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;

export type Attribution = Partial<Record<(typeof UTM)[number] | 'fbclid' | 'referrer' | 'first_page', string>>;

function read(): { ts: number; data: Attribution } | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed?.ts !== 'number' || Date.now() - parsed.ts > TTL_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

let current: Attribution = {};

export function captureAttribution(): void {
  const stored = read();
  if (stored) {
    current = stored.data;
    return;
  }
  const params = new URLSearchParams(location.search);
  const data: Attribution = { first_page: location.pathname };
  for (const k of UTM) {
    const v = params.get(k);
    if (v) data[k] = v.slice(0, 200);
  }
  const fbclid = params.get('fbclid');
  if (fbclid) data.fbclid = fbclid.slice(0, 500);
  try {
    if (document.referrer && new URL(document.referrer).origin !== location.origin) {
      data.referrer = document.referrer.slice(0, 500);
    }
  } catch {
    /* ignore malformed referrer */
  }
  current = data;
  try {
    localStorage.setItem(KEY, JSON.stringify({ ts: Date.now(), data }));
  } catch {
    /* storage blocked: keep it in memory for this page view */
  }
}

export function getAttribution(): Attribution {
  return current;
}
