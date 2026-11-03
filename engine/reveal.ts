// Declarative motion through data attributes:
//   data-split="lines|words"   masked text reveal (SplitText), on scroll or on intro
//   data-reveal="wipe|fade"     block reveal; wipe runs left to right, along the time axis
//   data-intro                  play with the page intro instead of on scroll
//   data-delay="0.2"            extra delay (seconds)
//   data-parallax="0.1"         scrubbed vertical drift, as a fraction of the element's height.
//                               Put it on media that overflows a clipped frame (inset -n% 0).
// Every effect is skipped under reduced motion; CSS keeps content visible without JS.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ease, prefersReducedMotion } from './env';

gsap.registerPlugin(ScrollTrigger, SplitText);

const durations = { lines: 1.2, words: 1.1 } as const;
const staggers = { lines: 0.08, words: 0.035 } as const;

// autoSplit re-splits after font load / resize. A text that already revealed must stay revealed.
function splitTween(el: HTMLElement, isIntro: boolean) {
  const type = (el.dataset.split || 'lines') as keyof typeof durations;
  const delay = parseFloat(el.dataset.delay || '0');
  const s = { tween: undefined as gsap.core.Tween | undefined, done: false, requested: false };
  SplitText.create(el, {
    type: type === 'lines' ? 'lines' : `lines,${type}`,
    mask: 'lines',
    autoSplit: true,
    linesClass: 'split-line',
    onSplit(self) {
      gsap.set(el, { visibility: 'visible' });
      if (s.done) return;
      s.tween = gsap.from(type === 'lines' ? self.lines : self.words, {
        yPercent: 110,
        duration: durations[type],
        stagger: staggers[type],
        ease: ease.out,
        delay,
        paused: isIntro && !s.requested,
        onComplete: () => { s.done = true; },
        scrollTrigger: isIntro ? undefined : { trigger: el, start: 'top 90%', once: true },
      });
      return s.tween;
    },
  });
  return () => { s.requested = true; s.tween?.play(); };
}

function blockTween(el: HTMLElement, paused: boolean) {
  const kind = el.dataset.reveal || 'wipe';
  const delay = parseFloat(el.dataset.delay || '0');
  gsap.set(el, { visibility: 'visible' });
  const from = kind === 'fade' ? { autoAlpha: 0 } : { clipPath: 'inset(100% 0% 0% 0%)' };
  const to = kind === 'fade' ? { autoAlpha: 1 } : { clipPath: 'inset(0% 0% 0% 0%)' };
  return gsap.fromTo(el, from, {
    ...to,
    duration: kind === 'fade' ? 0.9 : 1.3,
    ease: ease.out,
    delay,
    paused,
    clearProps: 'clipPath',
    scrollTrigger: paused ? undefined : { trigger: el, start: 'top 92%', once: true },
  });
}

/** Wire every reveal inside `root`. Returns the intro timeline (paused) for the page entrance. */
export function initReveals(root: ParentNode = document) {
  const intro = gsap.timeline({ paused: true });
  if (prefersReducedMotion()) return intro;
  root.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
    const isIntro = el.hasAttribute('data-intro');
    const play = splitTween(el, isIntro);
    if (isIntro) intro.add(play, 0);
  });
  root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    const isIntro = el.hasAttribute('data-intro');
    const t = blockTween(el, isIntro);
    if (isIntro) intro.add(() => { t.play(); }, 0);
  });
  root.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const amount = parseFloat(el.dataset.parallax || '0.1');
    gsap.fromTo(el, { yPercent: -amount * 100 }, {
      yPercent: amount * 100,
      ease: 'none',
      scrollTrigger: { trigger: el.parentElement || el, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });
  return intro;
}
