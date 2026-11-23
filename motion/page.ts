// Per-page motion. Runs inside the engine's gsap.context, so tweens and triggers revert on leave.
// Each effect finds its own markup and does nothing without it.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isTouch, scrollState, scrollToY } from '@/engine';

gsap.registerPlugin(ScrollTrigger);

type Off = (() => void)[];
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const all = <T extends Element = HTMLElement>(s: string, root: ParentNode = document) => [...root.querySelectorAll<T>(s)];
const finePointer = () => !isTouch();

export function hero(off: Off) {
  const section = document.querySelector<HTMLElement>('[data-hero]');
  if (!section) return;
  const photo = section.querySelector<HTMLElement>('[data-hero-photo]')!;
  const sticky = section.querySelector<HTMLElement>('.hero__sticky')!;
  const pct = section.querySelector<HTMLElement>('[data-scan]')!;
  const badge = section.querySelector('[data-badge]');
  const cue = section.querySelector('.cue');

  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: () => (getComputedStyle(sticky).position === 'sticky' ? 'bottom bottom' : 'bottom 30%'),
    scrub: true,
    invalidateOnRefresh: true,
    onUpdate: ({ progress }) => {
      const p = clamp(progress / 0.85, 0, 1);
      photo.style.setProperty('--scan', `${p * 100}%`);
      photo.classList.toggle('is-scanning', p > 0 && p < 1);
      pct.textContent = String(Math.round(p * 100));
      if (cue) (cue as HTMLElement).style.opacity = p > 0.06 ? '0' : '';
    },
  });
  gsap.to(section.querySelectorAll('.rings i'), {
    scale: (i: number) => 1.12 + i * 0.14,
    ease: 'none',
    scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true },
  });
  if (badge) gsap.to(badge, { rotation: 300, ease: 'none', scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: 0.4 } });

  if (!finePointer()) return;
  const inner = photo.querySelector('.hero__shift');
  gsap.set(inner, { scale: 1.035 });
  const x = gsap.quickTo(inner, 'x', { duration: 1, ease: 'power3' });
  const y = gsap.quickTo(inner, 'y', { duration: 1, ease: 'power3' });
  const move = (e: PointerEvent) => {
    x((e.clientX / innerWidth - 0.5) * -14);
    y((e.clientY / innerHeight - 0.5) * -10);
    const box = inner!.getBoundingClientRect();
    const scale = box.width / photo.offsetWidth;
    const px = (e.clientX - box.left) / scale;
    const py = (e.clientY - box.top) / scale;
    photo.style.setProperty('--mx', `${px}px`);
    photo.style.setProperty('--my', `${py}px`);
    photo.classList.toggle('is-lens', px > 0 && px < photo.offsetWidth && py > 0 && py < photo.offsetHeight);
  };
  const out = () => photo.classList.remove('is-lens');
  sticky.addEventListener('pointermove', move);
  sticky.addEventListener('pointerleave', out);
  off.push(() => {
    sticky.removeEventListener('pointermove', move);
    sticky.removeEventListener('pointerleave', out);
    photo.style.removeProperty('--scan');
  });
}

/**
 * Sticky pans: the section is as tall as its sticky frame plus the track's overflow, and scroll
 * moves the track. No fixed pin, so no layout shift. The gallery listens to the `pan` event.
 */
export function pans(off: Off) {
  all('[data-pan]').forEach((section) => {
    const frame = section.querySelector<HTMLElement>('[data-pan-sticky]');
    const track = section.querySelector<HTMLElement>('[data-pan-track]');
    if (!frame || !track) return;
    const bar = section.querySelector<HTMLElement>('[data-pan-bar]');
    const grid = section.querySelector<HTMLElement>('[data-pan-grid]');

    const distance = () => Math.max(0, track.offsetWidth - frame.clientWidth);
    const size = () => {
      section.style.height = frame.offsetParent === null ? '' : `${frame.offsetHeight + distance()}px`;
    };
    size();
    ScrollTrigger.addEventListener('refreshInit', size);

    const report = (p: number) => {
      if (bar) bar.style.transform = `scaleX(${p})`;
      grid?.style.setProperty('--grid-x', `${-((p * distance() * 0.3) % 48)}px`);
      section.dispatchEvent(new CustomEvent('pan', { detail: p }));
    };
    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      onUpdate() { report(this.progress()); },
      scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: 0.5, invalidateOnRefresh: true },
    });

    // Tab can land on something panned out of view: scroll to where it shows.
    const reveal = (e: FocusEvent) => {
      const el = e.target as HTMLElement;
      if (!track.contains(el) || !el.matches(':focus-visible')) return;
      const box = el.getBoundingClientRect();
      if (box.left >= 0 && box.right <= innerWidth) return;
      const fromStart = box.left - track.getBoundingClientRect().left;
      const want = clamp(fromStart - Math.max(24, (innerWidth - box.width) / 2), 0, distance());
      scrollToY(section.getBoundingClientRect().top + scrollY + want);
    };
    section.addEventListener('focusin', reveal);

    off.push(() => {
      ScrollTrigger.removeEventListener('refreshInit', size);
      section.removeEventListener('focusin', reveal);
      tween.kill();
      section.style.height = '';
    });
  });
}

export function ink() {
  all('[data-ink]').forEach((el) => {
    gsap.fromTo(el.querySelectorAll('.w'), { opacity: 0.16 }, {
      opacity: 1,
      stagger: 0.08,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top 85%', end: 'bottom 50%', scrub: true },
    });
  });
}

export function journey(off: Off) {
  const section = document.querySelector<HTMLElement>('[data-journey]');
  if (!section) return;
  const path = section.querySelector<SVGPathElement>('[data-journey-path]')!;
  const dot = section.querySelector<SVGCircleElement>('[data-journey-dot]')!;
  const steps = all('[data-step]', section);
  const nodes = all<SVGCircleElement>('[data-node]', section);
  const length = path.getTotalLength();

  const draw = (progress: number) => {
    // A little rest at both ends, so the first and last steps can be read.
    const p = clamp((progress - 0.04) / 0.88, 0, 1);
    path.setAttribute('stroke-dashoffset', String(1 - p));
    const at = path.getPointAtLength(p * length);
    dot.setAttribute('cx', String(at.x));
    dot.setAttribute('cy', String(at.y));
    const now = Math.floor(p * (steps.length - 1) + 0.04);
    steps.forEach((s, i) => s.classList.toggle('is-on', i === now));
    nodes.forEach((n, i) => n.classList.toggle('is-done', i <= now));
  };
  draw(0);
  ScrollTrigger.create({ trigger: section, start: 'top top', end: 'bottom bottom', scrub: true, onUpdate: (s) => draw(s.progress) });
  off.push(() => steps.forEach((s) => s.classList.remove('is-on')));
}

export function marquee(off: Off) {
  all('[data-marquee]').forEach((el) => {
    const track = el.querySelector<HTMLElement>('[data-marquee-track]');
    const set = track?.firstElementChild as HTMLElement | null;
    if (!track || !set) return;
    let x = 0;
    let dir = -1;
    let seen = false;
    const io = new IntersectionObserver(([e]) => { seen = e.isIntersecting; });
    io.observe(el);
    const move = (_: number, ms: number) => {
      if (!seen) return;
      const v = scrollState().velocity;
      if (Math.abs(v) > 0.5) dir = v > 0 ? -1 : 1;
      const w = set.offsetWidth;
      x += dir * (45 + Math.min(Math.abs(v) * 14, 700)) * Math.min(ms, 64) / 1000;
      if (x <= -w) x += w;
      if (x > 0) x -= w;
      track.style.transform = `translate3d(${x}px,0,0)`;
    };
    gsap.ticker.add(move);
    off.push(() => { gsap.ticker.remove(move); io.disconnect(); });
  });
}

export function magnetic(off: Off) {
  if (!finePointer()) return;
  all('[data-magnetic]').forEach((el) => {
    const x = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' });
    const y = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' });
    const move = (e: PointerEvent) => {
      const box = el.getBoundingClientRect();
      x((e.clientX - box.left - box.width / 2) * 0.22);
      y((e.clientY - box.top - box.height / 2) * 0.3);
    };
    const home = () => { x(0); y(0); };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', home);
    off.push(() => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', home);
    });
  });
}

/** The footer name: letters rise with scroll and lean away from the pointer. */
export function kinetic(off: Off) {
  const name = document.querySelector<HTMLElement>('[data-kinetic]');
  if (!name) return;
  const letters = all('.foot__ch', name);
  gsap.fromTo(letters, { yPercent: 70 }, {
    yPercent: 0,
    stagger: 0.05,
    ease: 'none',
    scrollTrigger: { trigger: name, start: 'top bottom', end: 'bottom 97%', scrub: 0.4 },
  });
  if (!finePointer()) return;
  const sy = letters.map((l) => gsap.quickTo(l, 'scaleY', { duration: 0.5, ease: 'power3' }));
  const move = (e: PointerEvent) => {
    const boxes = letters.map((l) => l.getBoundingClientRect());
    boxes.forEach((b, i) => sy[i](1 - 0.28 * Math.max(0, 1 - Math.abs(e.clientX - (b.left + b.width / 2)) / 170)));
  };
  const home = () => sy.forEach((f) => f(1));
  name.addEventListener('pointermove', move);
  name.addEventListener('pointerleave', home);
  off.push(() => {
    name.removeEventListener('pointermove', move);
    name.removeEventListener('pointerleave', home);
  });
}
