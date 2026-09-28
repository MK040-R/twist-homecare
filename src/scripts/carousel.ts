// Scroll-snap carousels with dots that follow the scroll and can be tapped.
const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initCarousels(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>('[data-carousel]').forEach((wrap) => {
    const track = wrap.querySelector<HTMLElement>('.car');
    const dots = Array.from(wrap.querySelectorAll<HTMLButtonElement>('.dot'));
    if (!track) return;
    const items = Array.from(track.children) as HTMLElement[];
    const pad = () => parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0;

    let current = 0;
    const setCurrent = (i: number) => {
      if (i === current) return;
      current = i;
      dots.forEach((d, j) => d.setAttribute('aria-current', String(j === i)));
    };

    let raf = 0;
    track.addEventListener(
      'scroll',
      () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const x = track.scrollLeft;
          const atEnd = x + track.clientWidth >= track.scrollWidth - 2;
          if (atEnd) return setCurrent(items.length - 1);
          let best = 0;
          let bestDist = Infinity;
          items.forEach((el, i) => {
            const d = Math.abs(el.offsetLeft - pad() - x);
            if (d < bestDist) { bestDist = d; best = i; }
          });
          setCurrent(best);
        });
      },
      { passive: true },
    );

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        const el = items[i];
        if (!el) return;
        track.scrollTo({ left: el.offsetLeft - pad(), behavior: reduceMotion() ? 'auto' : 'smooth' });
        setCurrent(i);
      });
    });
  });
}
