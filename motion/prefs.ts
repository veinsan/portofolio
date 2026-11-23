// Theme (with a circular reveal from the button) and accent, both saved on this device.
import { accents } from '@/lib/data';
import { prefersReducedMotion } from '@/engine';
import { toast } from './toast';

const root = () => document.documentElement;
const BAR = { light: '#fbfaf6', dark: '#0e1013' };

function save(key: string, value: string) {
  try { localStorage.setItem(key, value); } catch { /* private mode: the choice lasts for this visit */ }
}

/** Put the controls and the browser bar in step with what the inline script chose before paint. */
export function syncPrefs() {
  const dark = root().dataset.theme === 'dark';
  document.querySelectorAll('[data-tool="theme"]').forEach((b) => b.setAttribute('aria-pressed', String(dark)));
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? BAR.dark : BAR.light);
  const accent = root().dataset.accent;
  document.querySelectorAll<HTMLInputElement>('input[name="accent"]').forEach((i) => { i.checked = i.value === accent; });
}

export function toggleTheme(from: Element) {
  const next = root().dataset.theme === 'dark' ? 'light' : 'dark';
  const apply = () => {
    root().dataset.theme = next;
    syncPrefs();
  };
  save('theme', next);
  if (!document.startViewTransition || prefersReducedMotion()) {
    apply();
    return;
  }
  const box = from.getBoundingClientRect();
  const x = box.left + box.width / 2;
  const y = box.top + box.height / 2;
  const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  document.startViewTransition(apply).ready.then(() => {
    root().animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
      { duration: 700, easing: 'cubic-bezier(0.76, 0, 0.24, 1)', pseudoElement: '::view-transition-new(root)' },
    );
  }).catch(() => { /* skipped transition, the theme is already applied */ });
}

export function setAccent(value: string) {
  if (!(accents as readonly string[]).includes(value)) return;
  root().dataset.accent = value;
  save('accent', value);
  toast(`${value[0].toUpperCase()}${value.slice(1)} accent`);
}
