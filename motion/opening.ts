// Loader, then the gate, then (with sound) a short opening cut through the year's podiums.
// Resolves when the page is uncovered, so the hero's own entrance plays in view.
import { gsap } from 'gsap';
import { ease, startScroll, stopScroll } from '@/engine';
import { playMusic } from './sound';

const FOLD_MS = 260;
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function runOpening(): Promise<void> {
  const root = document.documentElement;
  const el = document.querySelector<HTMLElement>('[data-opening]');
  if (!el || !root.classList.contains('gated')) return Promise.resolve();

  const q = <T extends HTMLElement>(s: string) => el.querySelector<T>(s)!;
  const start = q<HTMLButtonElement>('[data-op-start]');
  const silent = q<HTMLButtonElement>('[data-op-silent]');
  const skip = q<HTMLButtonElement>('[data-op-skip]');
  // Everything else is out of reach while the dialog is up.
  const behind = [...document.querySelectorAll<HTMLElement>('body > header, body > main, body > footer, .menu-btn, .skip-link')];
  behind.forEach((b) => { b.inert = true; });
  stopScroll();

  return new Promise<void>((resolve) => {
    let show: gsap.core.Timeline | undefined;
    let ended = false;

    const end = () => {
      if (ended) return;
      ended = true;
      show?.kill();
      document.removeEventListener('keydown', key);
      try { sessionStorage.setItem('opened', '1'); } catch { /* it shows again next visit */ }
      gsap.to(el, {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: 0.85,
        ease: ease.inOut,
        onComplete: () => {
          root.classList.remove('gated');
          el.style.removeProperty('clip-path');
          behind.forEach((b) => { b.inert = false; });
          startScroll();
          document.getElementById('main')?.focus({ preventScroll: true });
        },
      });
      // The hero starts while the cover is still leaving.
      setTimeout(resolve, 380);
    };

    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') end();
      // Enter or Space begins while the dialog itself has focus.
      else if ((e.key === 'Enter' || e.key === ' ') && el.dataset.phase === 'gate' && document.activeElement === el) {
        e.preventDefault();
        start.click();
      }
    };
    document.addEventListener('keydown', key);

    const play = () => {
      void playMusic();
      el.dataset.phase = 'show';
      skip.focus();

      const scene = (name: string) => [...el.querySelectorAll<HTMLElement>(`[data-scene="${name}"]`)];
      const [folds] = scene('folds');
      const [clean] = scene('clean');
      const [name] = scene('name');
      const wins = scene('win');

      const t = gsap.timeline({ onComplete: end, defaults: { ease: ease.out } });
      const cut = (s: HTMLElement) => t.set(el.querySelectorAll('[data-scene]'), { autoAlpha: 0 }).set(s, { autoAlpha: 1 });

      cut(folds);
      t.fromTo(folds.querySelectorAll('.op-cols i'), { scaleY: 0 }, { scaleY: 1, duration: 1.1, stagger: 0.14 })
        .fromTo(folds.querySelector('.op-word'), { yPercent: 35, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.9 }, '<0.25')
        .to(folds, { autoAlpha: 0, duration: 0.3 }, '+=0.25');

      cut(clean);
      t.fromTo(clean.querySelector('.op-word'), { scale: 1.25, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.8 })
        .to(clean, { autoAlpha: 0, duration: 0.3 }, '+=0.3');

      wins.forEach((w, i) => {
        cut(w);
        t.fromTo(w.querySelector('.op-win__photo'), { rotateY: i % 2 ? 55 : -55, scale: 1.2 }, { rotateY: 0, scale: 1, duration: 0.75 })
          .fromTo(w.querySelector('.op-win__text'), { xPercent: 12, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, duration: 0.6 }, '<0.05')
          .to({}, { duration: 0.34 });
      });

      cut(name);
      t.fromTo(name.querySelectorAll('.rings i'), { scale: 0.3, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1.3, stagger: 0.08 })
        .fromTo(name.querySelectorAll('p'), { yPercent: 30, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.9, stagger: 0.12 }, '<0.15')
        .to({}, { duration: 0.7 });
      show = t;
    };

    start.addEventListener('click', play, { once: true });
    silent.addEventListener('click', end, { once: true });
    skip.addEventListener('click', end, { once: true });

    (async () => {
      const bars = el.querySelectorAll('.op-folds i');
      const verdict = q('[data-op-verdict]');
      for (let i = 0; i < bars.length; i++) {
        verdict.textContent = `Checking fold ${i + 1} of ${bars.length}`;
        await wait(FOLD_MS);
        bars[i].classList.add('is-done');
      }
      verdict.textContent = 'No leaks found';
      await wait(520);
      if (ended) return;
      el.querySelectorAll<HTMLImageElement>('img[data-src]').forEach((img) => { img.src = img.dataset.src!; });
      el.dataset.phase = 'gate';
      el.focus({ preventScroll: true });
    })();
  });
}
