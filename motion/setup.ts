// Global motion: runs once on the client before the first page initializes.
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ease, isTouch, onPage, onScroll, prefersReducedMotion, setTransition } from '@/engine';

gsap.registerPlugin(SplitText);

export function setupMotion() {
  // Page transition: a dark panel rises carrying the destination's name, then lifts off the new page.
  let label = '';
  document.addEventListener('click', (e) => {
    const a = (e.target as Element).closest<HTMLElement>('a');
    label = a?.dataset.title || '';
  }, true);
  setTransition({
    leave: (c) => {
      const panel = c.querySelector<HTMLElement>('.curtain__panel')!;
      const text = c.querySelector<HTMLElement>('.curtain__label')!;
      text.textContent = label;
      return gsap.timeline()
        .set(c, { autoAlpha: 1 })
        .fromTo(panel, { clipPath: 'inset(100% 0% 0% 0% round 1.25rem)' }, { clipPath: 'inset(0% 0% 0% 0% round 0rem)', duration: 0.8, ease: ease.inOut })
        .fromTo(text, { yPercent: 60, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.6, ease: ease.out }, '-=0.35');
    },
    enter: (c) => gsap.timeline()
      .to(c.querySelector('.curtain__label'), { yPercent: -40, autoAlpha: 0, duration: 0.35, ease: 'power2.in' })
      .to(c.querySelector('.curtain__panel'), { clipPath: 'inset(0% 0% 100% 0% round 1.25rem)', duration: 0.85, ease: ease.inOut }, '-=0.1')
      .set(c, { autoAlpha: 0 }),
  });

  // The pill steps aside while reading down and returns on the way up.
  let last = 0;
  onScroll(({ y }) => {
    if (Math.abs(y - last) < 6) return;
    document.documentElement.classList.toggle('frame-away', y > 240 && y > last);
    last = y;
  });

  // Card tracks: the arrow pages forward one card and wraps to the start at the end.
  onPage(() => {
    const off: (() => void)[] = [];
    document.querySelectorAll<HTMLButtonElement>('[data-track-next]').forEach((btn) => {
      const track = btn.parentElement?.querySelector<HTMLElement>('[data-track]');
      if (!track) return;
      const go = () => {
        const card = track.firstElementChild as HTMLElement | null;
        const step = (card?.offsetWidth ?? 300) + parseFloat(getComputedStyle(track).columnGap || '16');
        const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
        track.scrollTo({ left: atEnd ? 0 : track.scrollLeft + step, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
      };
      btn.addEventListener('click', go);
      off.push(() => btn.removeEventListener('click', go));
    });
    return () => off.forEach((f) => f());
  });

  onPage(() => {
    if (prefersReducedMotion()) return;
    const off: (() => void)[] = [];

    // Statement: words ink in as you read down (scrubbed), the Vantra intro paragraph.
    document.querySelectorAll<HTMLElement>('[data-ink]').forEach((el) => {
      const split = SplitText.create(el, { type: 'words', wordsClass: 'ink-word' });
      gsap.fromTo(split.words, { opacity: 0.18 }, {
        opacity: 1, stagger: 0.08, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true },
      });
      off.push(() => split.revert());
    });

    // Event strip: one slow loop, sped up by scroll velocity.
    const track = document.querySelector<HTMLElement>('[data-marquee]');
    if (track) {
      const loop = gsap.to(track, { xPercent: -50, ease: 'none', duration: 40, repeat: -1 });
      off.push(onScroll(({ velocity }) => {
        gsap.to(loop, { timeScale: 1 + Math.min(Math.abs(velocity) / 10, 4), duration: 0.4, overwrite: true });
      }));
    }

    // Rows with a real image: a preview follows the pointer.
    const box = document.querySelector<HTMLElement>('.preview');
    const rows = [...document.querySelectorAll<HTMLElement>('[data-preview]')];
    if (box && rows.length && !isTouch()) {
      const img = box.querySelector('img')!;
      gsap.set(box, { autoAlpha: 0, scale: 0.92 });
      const x = gsap.quickTo(box, 'x', { duration: 0.6, ease: ease.soft });
      const y = gsap.quickTo(box, 'y', { duration: 0.6, ease: ease.soft });
      let px = 0, py = 0;
      const move = (e: PointerEvent) => { px = e.clientX; py = e.clientY; x(px + 24); y(py); };
      const show = (e: Event) => {
        const src = (e.currentTarget as HTMLElement).dataset.preview!;
        if (!img.src.endsWith(src)) img.src = src;
        gsap.to(box, { autoAlpha: 1, scale: 1, duration: 0.45, ease: ease.out, overwrite: 'auto' });
      };
      const hide = () => gsap.to(box, { autoAlpha: 0, scale: 0.92, duration: 0.3, ease: ease.soft, overwrite: 'auto' });
      rows.forEach((r) => { r.addEventListener('pointerenter', show); r.addEventListener('pointerleave', hide); });
      addEventListener('pointermove', move, { passive: true });
      off.push(onScroll(() => {
        const under = document.elementFromPoint(px, py)?.closest('[data-preview]');
        if (!under) hide();
      }));
      off.push(() => {
        rows.forEach((r) => { r.removeEventListener('pointerenter', show); r.removeEventListener('pointerleave', hide); });
        removeEventListener('pointermove', move);
        hide();
      });
    }
    return () => off.forEach((f) => f());
  });
}
