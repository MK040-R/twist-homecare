// Notify me popup: open/close, the three steps, and the calls to /api/signup.
import { track } from './track';
import { getAttribution } from './attribution';

type Product = 'everyday-wash' | 'quikwash' | 'undergarment-wash' | 'any';
type ErrorKey = 'empty' | 'invalid' | 'ratelimit' | 'network' | 'server';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function newEventId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  }
}

export function initNotify(): void {
  const dialog = document.getElementById('notify') as HTMLDialogElement | null;
  if (!dialog || typeof dialog.showModal !== 'function') return;

  const d = dialog.dataset;
  const errors = JSON.parse(d.errors || '{}') as Record<ErrorKey, string>;
  const names = JSON.parse(d.names || '{}') as Record<string, string>;
  const steps = Array.from(dialog.querySelectorAll<HTMLElement>('[data-step]'));
  const title = dialog.querySelector<HTMLElement>('#notify-title')!;
  const form = dialog.querySelector<HTMLFormElement>('form')!;
  const input = form.querySelector<HTMLInputElement>('input[type="email"]')!;
  const honeypot = form.querySelector<HTMLInputElement>('input[name="website"]')!;
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  const errorEl = dialog.querySelector<HTMLElement>('#notify-error')!;
  const pageProduct = (document.body.dataset.product as Product) || 'any';

  let product: Product = 'any';
  let opener: HTMLElement | null = null;
  let token = '';
  let busy = false;

  const productName = () => names[product] || '';
  const fill = (tpl: string) => tpl.replace('{Product}', productName());

  const showStep = (n: number) => {
    steps.forEach((s) => (s.hidden = s.dataset.step !== String(n)));
    if (n > 1) steps[n - 1].querySelector<HTMLElement>('.title')?.focus();
  };

  const setError = (key: ErrorKey | null) => {
    errorEl.hidden = !key;
    errorEl.textContent = key ? errors[key] : '';
    if (key === 'empty' || key === 'invalid') input.setAttribute('aria-invalid', 'true');
    else input.removeAttribute('aria-invalid');
  };

  const setBusy = (on: boolean) => {
    busy = on;
    submit.setAttribute('aria-busy', String(on));
    submit.textContent = on ? d.buttonLoading! : d.button!;
  };

  // Keep the sheet above the on-screen keyboard (iOS does not resize the layout viewport).
  const vv = window.visualViewport;
  const onViewport = () => {
    if (!vv) return;
    const hidden = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
    dialog.style.setProperty('--kb', `${hidden}px`);
  };

  const open = (p: Product, from: HTMLElement | null) => {
    product = p;
    opener = from;
    title.textContent = p === 'any' ? d.titleAny! : fill(d.titleProduct!);
    setError(null);
    setBusy(false);
    showStep(1);
    if (!dialog.open) {
      dialog.showModal();
      document.documentElement.classList.add('dialog-open');
      vv?.addEventListener('resize', onViewport);
      vv?.addEventListener('scroll', onViewport);
    }
    input.focus({ preventScroll: true });
    track('popup_open', { product: p });
  };

  const close = () => dialog.open && dialog.close();

  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('dialog-open');
    vv?.removeEventListener('resize', onViewport);
    vv?.removeEventListener('scroll', onViewport);
    dialog.style.removeProperty('--kb');
    if (location.hash === '#notify') history.replaceState(null, '', location.pathname + location.search);
    opener?.focus({ preventScroll: true });
    opener = null;
  });

  // Close on a tap outside the sheet (the backdrop belongs to the dialog element).
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) close();
  });

  // Keep Tab inside the popup.
  dialog.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const focusable = Array.from(
      dialog.querySelectorAll<HTMLElement>('button, input:not([tabindex="-1"]), [href]'),
    ).filter((el) => !el.closest('[hidden]') && el.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  dialog.querySelectorAll('[data-close]').forEach((b) => b.addEventListener('click', close));
  dialog.querySelector('[data-skip]')?.addEventListener('click', close);

  input.addEventListener('input', () => {
    if (!errorEl.hidden) setError(null);
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (busy) return;
    const email = input.value.trim();
    if (!email) return setError('empty'), input.focus();
    if (!EMAIL_RE.test(email) || email.length > 254) return setError('invalid'), input.focus();
    setError(null);
    setBusy(true);
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          email,
          product,
          page: location.pathname,
          website: honeypot.value,
          attribution: getAttribution(),
        }),
      });
      if (res.status === 400) return setError('invalid'), input.focus();
      if (res.status === 429) return setError('ratelimit');
      if (!res.ok) return setError('server');
      const body = (await res.json().catch(() => ({}))) as { token?: string };
      token = body.token || '';
      track('signup_success', { product, event_id: newEventId() });
      showAsk();
    } catch {
      setError('network');
    } finally {
      setBusy(false);
    }
  });

  const showAsk = () => {
    dialog.querySelectorAll<HTMLElement>('[data-for]').forEach((f) => {
      f.hidden = f.dataset.for !== (product === 'any' ? 'any' : 'product');
    });
    const q = dialog.querySelector<HTMLElement>('[data-q]');
    if (q) q.textContent = fill(d.qProduct!);
    showStep(2);
  };

  dialog.querySelectorAll<HTMLButtonElement>('[data-answer]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const answer = btn.dataset.answer!;
      const question = product === 'any' ? 'first_choice' : `price_${product}`;
      btn.setAttribute('aria-busy', 'true');
      // Fire and forget: the visitor should not wait on this.
      fetch('/api/signup', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ token, question, answer }),
        keepalive: true,
      }).catch(() => {});
      track('answer_submitted', { product, question, answer });
      btn.removeAttribute('aria-busy');
      showStep(3);
    });
  });

  // Every Notify me button, anywhere on the page.
  document.addEventListener('click', (e) => {
    const trigger = (e.target as Element).closest<HTMLElement>('[data-notify]');
    if (!trigger) return;
    e.preventDefault();
    open(((trigger.dataset.notify as Product) || pageProduct) as Product, trigger);
  });

  // Ads can link straight to the popup, e.g. /quikwash#notify.
  const fromHash = () => {
    if (location.hash === '#notify') open(pageProduct, null);
  };
  window.addEventListener('hashchange', fromHash);
  fromHash();
}
