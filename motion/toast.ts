let timer: ReturnType<typeof setTimeout> | undefined;

/** One short confirmation at the bottom of the screen, read out by screen readers. */
export function toast(message: string) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = message;
  el.classList.add('is-on');
  clearTimeout(timer);
  timer = setTimeout(() => el.classList.remove('is-on'), 2200);
}
