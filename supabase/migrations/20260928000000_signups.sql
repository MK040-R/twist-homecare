-- Twist pre-launch signups.
-- Run once in the Supabase SQL editor (or with `supabase db push`). Safe to re-run.
-- The browser never talks to these tables: the site's server endpoint uses the secret
-- (service role) key, and row-level security is on with no public policies.

create extension if not exists citext;

-- One row per email. A repeat signup updates the row instead of creating a new one.
create table if not exists public.signups (
  id           uuid primary key default gen_random_uuid(),
  email        citext not null unique,          -- case-insensitive
  products     text[] not null default '{}',    -- every product signed up for: everyday-wash, quikwash, undergarment-wash, any
  answers      jsonb not null default '{}',     -- optional popup answers, e.g. {"price_quikwash": "maybe"}
  first_page   text,                            -- first page seen on the site (first touch)
  last_page    text,                            -- page of the most recent signup
  utm_source   text,
  utm_medium   text,
  utm_campaign text,
  utm_content  text,
  utm_term     text,
  fbclid       text,
  referrer     text,
  user_agent   text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

alter table public.signups enable row level security;
revoke all on public.signups from anon, authenticated;

-- Basic per-IP rate limit. Stores a salted SHA-256 of the IP, never the IP itself,
-- and rows older than an hour are deleted on every signup.
create table if not exists public.signup_rate_limits (
  ip_hash      text not null,
  attempted_at timestamptz not null default now()
);
create index if not exists signup_rate_limits_lookup on public.signup_rate_limits (ip_hash, attempted_at);

alter table public.signup_rate_limits enable row level security;
revoke all on public.signup_rate_limits from anon, authenticated;

-- Insert or update a signup, and apply the rate limit, in one call.
-- Returns {"status": "ok"} or {"status": "rate_limited"}.
create or replace function public.upsert_signup(
  p_email        text,
  p_product      text,
  p_page         text,
  p_first_page   text default null,
  p_utm_source   text default null,
  p_utm_medium   text default null,
  p_utm_campaign text default null,
  p_utm_content  text default null,
  p_utm_term     text default null,
  p_fbclid       text default null,
  p_referrer     text default null,
  p_user_agent   text default null,
  p_ip_hash      text default null,
  p_max_attempts int  default 5,
  p_window_secs  int  default 600
) returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  recent int;
begin
  delete from signup_rate_limits where attempted_at < now() - interval '1 hour';

  if p_ip_hash is not null then
    select count(*) into recent
      from signup_rate_limits
     where ip_hash = p_ip_hash
       and attempted_at > now() - make_interval(secs => p_window_secs);
    if recent >= p_max_attempts then
      return jsonb_build_object('status', 'rate_limited');
    end if;
    insert into signup_rate_limits (ip_hash) values (p_ip_hash);
  end if;

  insert into signups (
    email, products, first_page, last_page,
    utm_source, utm_medium, utm_campaign, utm_content, utm_term,
    fbclid, referrer, user_agent
  ) values (
    lower(p_email), array[p_product], coalesce(p_first_page, p_page), p_page,
    p_utm_source, p_utm_medium, p_utm_campaign, p_utm_content, p_utm_term,
    p_fbclid, p_referrer, p_user_agent
  )
  on conflict (email) do update set
    products     = (select array_agg(distinct p order by p) from unnest(signups.products || excluded.products) as p),
    last_page    = excluded.last_page,
    -- Attribution is first-touch: keep what we already have.
    first_page   = coalesce(signups.first_page, excluded.first_page),
    utm_source   = coalesce(signups.utm_source, excluded.utm_source),
    utm_medium   = coalesce(signups.utm_medium, excluded.utm_medium),
    utm_campaign = coalesce(signups.utm_campaign, excluded.utm_campaign),
    utm_content  = coalesce(signups.utm_content, excluded.utm_content),
    utm_term     = coalesce(signups.utm_term, excluded.utm_term),
    fbclid       = coalesce(signups.fbclid, excluded.fbclid),
    referrer     = coalesce(signups.referrer, excluded.referrer),
    user_agent   = excluded.user_agent,
    updated_at   = now();

  return jsonb_build_object('status', 'ok');
end;
$$;

-- Store one answer from the popup's optional question.
create or replace function public.record_answer(p_email text, p_question text, p_answer text)
returns void
language sql
security definer
set search_path = public
as $$
  update signups
     set answers = answers || jsonb_build_object(p_question, p_answer),
         updated_at = now()
   where email = lower(p_email);
$$;

revoke all on function public.upsert_signup(text, text, text, text, text, text, text, text, text, text, text, text, text, int, int) from public, anon, authenticated;
revoke all on function public.record_answer(text, text, text) from public, anon, authenticated;
grant execute on function public.upsert_signup(text, text, text, text, text, text, text, text, text, text, text, text, text, int, int) to service_role;
grant execute on function public.record_answer(text, text, text) to service_role;
