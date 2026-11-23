// Global motion and chrome behaviour: runs once on the client before the first page initializes.
// Returns a promise the engine waits on before it plays the page's entrance.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ease, onPage, onScroll, prefersReducedMotion, scrollToY, setTransition } from '@/engine';
import { runOpening } from './opening';
import * as page from './page';
import { setAccent, syncPrefs, toggleTheme } from './prefs';
import { toggleMusic } from './sound';
import { toast } from './toast';

gsap.registerPlugin(ScrollTrigger);

function transitions() {
  let label = '';
  document.addEventListener('click', (e) => {
    const a = (e.target as Element).closest<HTMLElement>('a');
    if (a) label = a.dataset.title ?? '';
  }, true);

  setTransition({
    leave: (c) => {
      c.querySelector('.curtain__label')!.textContent = label;
      const band = c.querySelector('.curtain__band');
      const panel = c.querySelector('.curtain__panel');
      const up = { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.6, ease: ease.inOut };
      const down = { clipPath: 'inset(100% 0% 0% 0%)' };
      return gsap.timeline()
        .set(c, { autoAlpha: 1 })
        .fromTo(band, down, up, 0)
        .fromTo(panel, down, up, 0.14)
        .fromTo(panel!.children, { yPercent: 50, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.5, stagger: 0.07, ease: ease.out }, 0.45);
    },
    enter: (c) => gsap.timeline()
      .to(c.querySelector('.curtain__panel'), { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.65, ease: ease.inOut }, 0.15)
      .to(c.querySelector('.curtain__band'), { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.65, ease: ease.inOut }, 0.27)
      .set(c, { autoAlpha: 0 }),
  });
}

function progress() {
  const root = document.documentElement;
  const bar = document.querySelector<HTMLElement>('.progress');
  onScroll(({ y, progress: p }) => {
    root.classList.toggle('is-scrolled', y > 8);
    if (bar) bar.style.transform = `scaleX(${p})`;
  });
}

function controls() {
  syncPrefs();
  document.addEventListener('click', async (e) => {
    const t = e.target as Element;
    const tool = t.closest<HTMLElement>('[data-tool]');
    if (tool?.dataset.tool === 'theme') { toggleTheme(tool); return; }
    if (tool?.dataset.tool === 'sound') {
      if (!('AudioContext' in window)) toast('Music is not available in this browser');
      else toast((await toggleMusic()) ? 'Music on' : 'Music off');
      return;
    }
    if (t.closest('[data-top]')) { scrollToY(0); return; }
    const copy = t.closest<HTMLElement>('[data-copy]');
    if (!copy) return;
    try {
      await navigator.clipboard.writeText(copy.dataset.copy!);
      toast(copy.dataset.copied ?? 'Copied');
    } catch {
      toast('Copy is blocked here, select the text instead');
    }
  });
  document.addEventListener('change', (e) => {
    const input = e.target as HTMLInputElement;
    if (input.name === 'accent') setAccent(input.value);
  });
}

export function setupMotion() {
  transitions();
  progress();
  controls();

  onPage(() => {
    syncPrefs();
    const off: (() => void)[] = [];
    if (!prefersReducedMotion()) {
      // Heights first: the pans and the journey decide where everything below them sits.
      page.pans(off);
      page.hero(off);
      page.ink();
      page.journey(off);
      page.marquee(off);
      page.magnetic(off);
      page.kinetic(off);
    }
    return () => off.forEach((f) => f());
  });

  return runOpening();
}
