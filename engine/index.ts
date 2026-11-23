// Engine core: framework-agnostic page lifecycle. No DOM access at import time (SSR-safe).
//   boot(setup)            once, on first load: setup → page init → intro
//   leave() → cleanup()    before the route swaps
//   enter()                after the new page is in the DOM: init → enter animation → intro
// Page code hooks in with onPage(fn): it runs inside a gsap.context, so its tweens and
// ScrollTriggers are reverted automatically. Return a cleanup for anything else.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initScroll, resetScroll, scrollToY, startScroll, stopScroll } from './scroll';
import { initReveals } from './reveal';
import { playEnter, playLeave } from './transition';
import { prefersReducedMotion } from './env';

export { onScroll, scrollState, scrollToY, stopScroll, startScroll } from './scroll';
export { setTransition } from './transition';
export { ease, isTouch, isMobile, prefersReducedMotion } from './env';

export type PageFn = (page: { intro: gsap.core.Timeline; path: string }) => void | (() => void);
const pageFns = new Set<PageFn>();
const cleanups: (() => void)[] = [];
let ctx: gsap.Context | null = null;
let intro: gsap.core.Timeline | null = null;
let ready = false;
let booted = false;

/** Run fn on every page load (and now, if a page is ready). Returns an unsubscribe. */
export function onPage(fn: PageFn) {
  pageFns.add(fn);
  if (ready) runPageFn(fn);
  return () => { pageFns.delete(fn); };
}

function runPageFn(fn: PageFn) {
  ctx?.add(() => {
    const c = fn({ intro: intro!, path: location.pathname });
    if (typeof c === 'function') cleanups.push(c);
  });
}

export function syncFlags() {
  const h = document.documentElement.classList;
  h.add('js', 'is-booted');
  h.toggle('motion', !prefersReducedMotion());
}

function initPage() {
  syncFlags();
  ctx = gsap.context(() => { intro = initReveals(document); });
  ready = true;
  pageFns.forEach(runPageFn);
  requestAnimationFrame(() => ScrollTrigger.refresh());
}

// Anchors land only after the page code has sized the sticky sections above them.
function toHash() {
  const el = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (!el) return;
  ScrollTrigger.refresh();
  scrollToY(el.getBoundingClientRect().top + window.scrollY - (parseFloat(getComputedStyle(el).scrollMarginTop) || 0), true);
}

/** `setup` may return a promise (an opening, say): the entrance waits for it. */
export async function boot(setup?: () => void | Promise<void>) {
  if (booted) return;
  booted = true;
  syncFlags();
  initScroll();
  const ready = setup?.();
  initPage();
  toHash();
  document.documentElement.classList.add('is-loaded');
  await ready;
  intro?.play();
}

export async function leave() {
  stopScroll();
  await playLeave();
}

export function cleanup() {
  if (!ready) return;
  ready = false;
  cleanups.splice(0).forEach((c) => c());
  ctx?.revert();
  ctx = null;
}

/** `transition: false` for back/forward, where no leave ran. */
export async function enter({ transition = true, scrollTop = true } = {}) {
  if (!booted) return;
  cleanup();
  if (scrollTop) resetScroll();
  initPage();
  if (transition) {
    toHash();
    await playEnter();
  }
  startScroll();
  intro?.play();
  document.getElementById('main')?.focus({ preventScroll: true });
}
