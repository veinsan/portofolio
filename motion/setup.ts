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

  // Projects preview + pinned horizontal sections.
  onPage(() => {
    const off: (() => void)[] = [];

    // Projects: the sticky preview follows the row under the pointer or keyboard focus.
    const proj = document.querySelector<HTMLElement>('[data-proj]');
    if (proj) {
      const frames = [...proj.querySelectorAll<HTMLElement>('.pv')];
      const rows = [...proj.querySelectorAll<HTMLElement>('[data-pv]')];
      const show = (e: Event) => {
        const row = e.currentTarget as HTMLElement;
        const i = Number(row.dataset.pv);
        frames.forEach((f, j) => f.toggleAttribute('data-on', j === i));
        rows.forEach((r) => (r === row ? r.setAttribute('aria-current', 'true') : r.removeAttribute('aria-current')));
      };
      rows.forEach((r) => { r.addEventListener('pointerenter', show); r.addEventListener('focus', show); });
      off.push(() => rows.forEach((r) => { r.removeEventListener('pointerenter', show); r.removeEventListener('focus', show); }));
    }

    // FAQ: animate <details> open and close (native toggle stays the no-JS/reduced-motion path).
    if (!prefersReducedMotion()) {
      document.querySelectorAll<HTMLDetailsElement>('.faq__item').forEach((d) => {
        const summary = d.querySelector('summary');
        const body = d.querySelector<HTMLElement>('.faq__body');
        if (!summary || !body) return;
        const click = (e: Event) => {
          e.preventDefault();
          const closing = d.open && !d.classList.contains('is-closing');
          gsap.killTweensOf(body);
          if (closing) {
            d.classList.add('is-closing');
            gsap.to(body, { height: 0, opacity: 0, duration: 0.45, ease: 'power3.inOut',
              onComplete: () => { d.open = false; d.classList.remove('is-closing'); gsap.set(body, { clearProps: 'height,opacity' }); } });
          } else {
            const from = d.open ? body.offsetHeight : 0; // reopening mid-close starts where it is
            d.classList.remove('is-closing');
            d.open = true;
            gsap.fromTo(body, { height: from, opacity: d.open && from ? gsap.getProperty(body, 'opacity') : 0 },
              { height: 'auto', opacity: 1, duration: 0.6, ease: ease.out, clearProps: 'height,opacity' });
          }
        };
        summary.addEventListener('click', click);
        off.push(() => summary.removeEventListener('click', click));
      });
    }

    // Pinned horizontal sections (Jason's "drag with scroll"): the section holds still while
    // vertical scroll slides its track sideways, so nothing needs a sideways scroll.
    // Reduced motion skips this; the CSS lays the cards out as a wrapping grid instead.
    if (!prefersReducedMotion()) {
      document.querySelectorAll<HTMLElement>('[data-hpan]').forEach((section) => {
        const track = section.querySelector<HTMLElement>('[data-hpan-track]');
        const frame = track?.parentElement;
        if (!track || !frame) return;
        // Slide until the last card's right edge sits one gutter from the viewport edge.
        const dist = () => {
          const last = track.lastElementChild as HTMLElement | null;
          if (!last) return 0;
          const right = last.getBoundingClientRect().right - (gsap.getProperty(track, 'x') as number);
          const gutter = parseFloat(getComputedStyle(track).paddingRight) || 0;
          return Math.max(0, Math.ceil(right + gutter - document.documentElement.clientWidth));
        };
        const tween = gsap.to(track, {
          x: () => -dist(),
          ease: 'none',
          scrollTrigger: {
            trigger: section, start: 'top top', end: () => `+=${dist()}`,
            pin: true, scrub: 0.6, invalidateOnRefresh: true, refreshPriority: 1,
          },
        });
        // Keyboard: tabbing to a card off to the side scrolls the page to where that card is in view.
        const focus = (e: FocusEvent) => {
          const card = (e.target as HTMLElement).closest('li');
          const st = tween.scrollTrigger;
          if (!card || !st) return;
          const x = Math.min(dist(), Math.max(0, card.offsetLeft - frame.clientWidth / 2 + card.offsetWidth / 2));
          scrollTo({ top: st.start + x, behavior: 'instant' });
        };
        track.addEventListener('focusin', focus);
        off.push(() => track.removeEventListener('focusin', focus));
      });
    }

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
