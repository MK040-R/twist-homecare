// Accordions: one item open at a time; tapping the open item closes it.
export function initAccordions(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>('[data-accordion]').forEach((group) => {
    group.addEventListener('click', (e) => {
      const btn = (e.target as Element).closest<HTMLButtonElement>('button[aria-controls]');
      if (!btn || !group.contains(btn)) return;
      const open = btn.getAttribute('aria-expanded') === 'true';
      group.querySelectorAll<HTMLButtonElement>('button[aria-controls]').forEach((b) => setItem(b, false));
      if (!open) setItem(btn, true);
    });
  });
}

function setItem(btn: HTMLButtonElement, open: boolean): void {
  btn.setAttribute('aria-expanded', String(open));
  const panel = document.getElementById(btn.getAttribute('aria-controls') || '');
  if (panel) panel.hidden = !open;
  const sign = btn.querySelector('.sign');
  if (sign) sign.textContent = open ? '−' : '+';
}
