/*
 * Analytics slot. Deliberately does nothing yet.
 *
 * When tracking is approved, plug in here:
 * - Meta Pixel: fbq('track', <standard event>, params, { eventID: params.event_id }).
 *   Map 'signup_success' to 'Lead'. The event_id lets Meta deduplicate against CAPI.
 * - Meta Conversions API: send the same event from worker/index.ts after a successful
 *   signup, with the same event_id, so browser and server events merge.
 * - GA4: gtag('event', event, params).
 */
export function track(event: string, params: Record<string, unknown> = {}): void {
  void event;
  void params;
}
