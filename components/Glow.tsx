'use client';
// Soft light field plus a silk ribbon of thin lines: large blurred glows drift underneath
// (a tiny canvas, the blur is free when scaled up), and a few dozen parallel curves twist slowly
// on top at screen resolution. Live instances run on the
// GSAP ticker and pause off screen; covers draw once; reduced motion gets one still frame.
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePage } from '@/engine/next';
import { isTouch, prefersReducedMotion } from '@/engine';

// Warm amber, bone, slate blue, deep teal: muted so text on top stays the focus.
const palette = ['232,150,80', '236,226,208', '96,118,168', '52,112,116'];

function rand(seed: string) {
  let h = 2166136261;
  for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967295;
  };
}

export default function Glow({ seed, live = false, band, parallax, className = '' }: {
  seed: string;
  live?: boolean;
  /** Vertical position of the ribbon (0 top, 1 bottom); seeded when omitted. */
  band?: number;
  /** Scroll parallax drift (see engine data-parallax); the CSS must let it overflow its frame. */
  parallax?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  usePage(() => {
    const root = ref.current;
    if (!root) return;
    const [c, lc] = root.querySelectorAll('canvas');
    const g = c.getContext('2d')!;
    const lg = lc.getContext('2d')!;
    const r = rand(seed);
    const blobs = Array.from({ length: 4 }, (_, i) => ({
      x: 0.25 + r() * 0.7,
      y: 0.2 + r() * 0.7,
      rad: 0.35 + r() * 0.35,
      color: palette[i === 0 ? 0 : Math.floor(r() * palette.length)],
      a: i === 0 ? 0.42 : 0.16 + r() * 0.18,
      sx: 0.03 + r() * 0.05,
      sy: 0.03 + r() * 0.05,
      p: r() * 6.28,
    }));
    // The ribbon: where it crosses the frame, how it tilts and twists comes from the seed.
    const rib = {
      y: band ?? 0.38 + r() * 0.3,
      tilt: -0.35 + r() * 0.3,
      spread: 0.18 + r() * 0.12,
      amp: 0.08 + r() * 0.06,
      k: 1.2 + r() * 1.4,
      twist: 0.8 + r() * 1.2,
      p: r() * 6.28,
    };
    const touch = isTouch();
    const LINES = touch ? 18 : 28;
    const s = { t: 0, px: 0, py: 0 };
    let w = 0, h = 0, lw = 0, lh = 0, dpr = 1;

    const size = () => {
      // A quarter-resolution canvas: smooth gradients, a fraction of the pixels.
      w = c.width = Math.max(1, Math.round(c.clientWidth / 4));
      h = c.height = Math.max(1, Math.round(c.clientHeight / 4));
      // Every redraw uploads the whole bitmap to the compositor, which dominated desktop frames
      // (1.4 s of commit per 3 s idle at 1x). Drawn at 0.6x and scaled up by CSS: ~2.8x fewer
      // pixels, and the slight softening suits the light-trail look.
      dpr = 0.6;
      lw = lc.width = Math.round(lc.clientWidth * dpr);
      lh = lc.height = Math.round(lc.clientHeight * dpr);
      draw();
    };

    function draw() {
      g.globalCompositeOperation = 'source-over';
      g.fillStyle = '#0d0e11';
      g.fillRect(0, 0, w, h);
      g.globalCompositeOperation = 'lighter';
      const m = Math.max(w, h);
      for (const b of blobs) {
        const x = (b.x + Math.sin(s.t * b.sx * 6.28 + b.p) * 0.06 + s.px * 0.05) * w;
        const y = (b.y + Math.cos(s.t * b.sy * 6.28 + b.p) * 0.05 + s.py * 0.04) * h;
        const grad = g.createRadialGradient(x, y, 0, x, y, b.rad * m);
        grad.addColorStop(0, `rgba(${b.color},${b.a})`);
        grad.addColorStop(0.45, `rgba(${b.color},${b.a * 0.35})`);
        grad.addColorStop(1, `rgba(${b.color},0)`);
        g.fillStyle = grad;
        g.fillRect(0, 0, w, h);
      }
      drawRibbon();
    }

    function drawRibbon() {
      lg.clearRect(0, 0, lw, lh);
      if (!lw) return;
      lg.globalCompositeOperation = 'lighter';
      lg.lineWidth = 1;
      const fade = lg.createLinearGradient(0, 0, lw, 0);
      fade.addColorStop(0, 'rgba(232,150,80,0)');
      fade.addColorStop(0.3, 'rgba(232,150,80,0.55)');
      fade.addColorStop(0.65, 'rgba(236,226,208,0.5)');
      fade.addColorStop(1, 'rgba(120,140,190,0.05)');
      lg.strokeStyle = fade;
      const steps = touch ? 44 : 52, t = s.t * 1.6;
      for (let i = 0; i < LINES; i++) {
        const u = i / (LINES - 1) - 0.5;
        lg.globalAlpha = 0.25 + 0.75 * (1 - Math.abs(u) * 2) ** 2; // brighter at the centre of the ribbon
        lg.beginPath();
        for (let j = 0; j <= steps; j++) {
          const x = j / steps;
          const a = x * rib.k * 6.28 + t + rib.p;
          // Every line shares one wave; its offset follows cos(), so the band narrows and twists.
          const y = rib.y + rib.tilt * (x - 0.5) + s.py * 0.03
            + rib.amp * Math.sin(a * 0.5 + s.px * 0.6)
            + u * rib.spread * Math.cos(x * rib.twist * 6.28 + t * 0.7 + rib.p);
          if (j) lg.lineTo(x * lw, y * lh); else lg.moveTo(x * lw, y * lh);
        }
        lg.stroke();
      }
      lg.globalAlpha = 1;
    }

    const ro = new ResizeObserver(size);
    ro.observe(root);
    if (!live || prefersReducedMotion()) return () => ro.disconnect();

    const aim = { x: 0, y: 0 };
    const move = (e: PointerEvent) => { aim.x = e.clientX / innerWidth - 0.5; aim.y = e.clientY / innerHeight - 0.5; };
    if (!isTouch()) addEventListener('pointermove', move, { passive: true });
    // The drift is slow, so redraw every other frame (every third on touch): it halves the canvas
    // and the backdrop-blur work behind the glass panels without a visible difference.
    const every = 3;
    let frame = 0;
    const tick = () => {
      if (++frame % every) return;
      const k = gsap.ticker.deltaRatio() * every;
      s.t += 0.014 * k;
      s.px += (aim.x - s.px) * (1 - Math.pow(0.96, k));
      s.py += (aim.y - s.py) * (1 - Math.pow(0.96, k));
      draw();
    };
    const st = ScrollTrigger.create({
      trigger: root,
      start: 'top bottom',
      end: 'bottom top',
      onToggle: (self) => (self.isActive ? gsap.ticker.add(tick) : gsap.ticker.remove(tick)),
    });
    if (st.isActive) gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      st.kill();
      ro.disconnect();
      removeEventListener('pointermove', move);
    };
  });

  return (
    <div ref={ref} className={`glow ${className}`} aria-hidden="true" data-parallax={parallax}>
      <canvas />
      <canvas />
    </div>
  );
}
