'use client';
// A struck medal in CSS 3D: stacked edge layers between two engraved faces. Selecting a result
// spins it, swaps the face while it is edge-on, and rings out. The pointer tilts it.
import { useEffect, useId, useRef, useState, type CSSProperties } from 'react';
import type { Result } from '@/lib/data';

const SIDES = 14;
const point = (i: number, r: number) => {
  const a = ((i + 0.5) / SIDES) * Math.PI * 2 - Math.PI / 2;
  return [50 + r * Math.cos(a), 50 + r * Math.sin(a)].map((v) => v.toFixed(2)) as [string, string];
};
const POLY = Array.from({ length: SIDES }, (_, i) => point(i, 49.5).map((v) => `${v}%`).join(' ')).join(', ');
const INNER = Array.from({ length: SIDES }, (_, i) => point(i, 33).join(',')).join(' ');
const EDGES = Array.from({ length: 14 }, (_, i) => -7 + i * 1.08);
const SPIN_MS = 900;

export default function Medal({ result }: { result: Result }) {
  const id = useId().replace(/:/g, '');
  const [shown, setShown] = useState(result);
  const shownRef = useRef(result);
  const tilt = useRef<HTMLDivElement>(null);
  const spin = useRef<HTMLDivElement>(null);
  const impact = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (shownRef.current === result) return;
    const swap = () => { shownRef.current = result; setShown(result); };
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (still || !spin.current) {
      const now = requestAnimationFrame(swap);
      return () => cancelAnimationFrame(now);
    }
    const turn = spin.current.animate(
      [
        { transform: 'rotateY(0deg) scale(1)' },
        { transform: 'rotateY(90deg) scale(1.07)', offset: 0.22 },
        { transform: 'rotateY(360deg) scale(1)' },
      ],
      { duration: SPIN_MS, easing: 'cubic-bezier(0.33, 0.6, 0.3, 1)' },
    );
    const mid = setTimeout(swap, SPIN_MS * 0.18);
    const hit = setTimeout(() => impact.current?.animate(
      [{ opacity: 0.9, transform: 'scale(0.9)' }, { opacity: 0, transform: 'scale(1.5)' }],
      { duration: 750, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
    ), SPIN_MS * 0.6);
    return () => { clearTimeout(mid); clearTimeout(hit); turn.cancel(); };
  }, [result]);

  const hold = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = tilt.current;
    if (!el || e.pointerType !== 'mouse') return;
    const box = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - box.left) / box.width - 0.5;
    const y = (e.clientY - box.top) / box.height - 0.5;
    el.classList.add('is-held');
    el.style.setProperty('--rx', `${-y * 30}deg`);
    el.style.setProperty('--ry', `${x * 40}deg`);
    el.style.setProperty('--shine', `${50 - x * 90}%`);
  };
  const release = () => {
    const el = tilt.current;
    if (!el) return;
    el.classList.remove('is-held');
    ['--rx', '--ry', '--shine'].forEach((p) => el.style.removeProperty(p));
  };

  const word = !shown.suffix;
  const unit = `${shown.short} ${shown.when.slice(-4)} / `;
  const rim = unit.repeat(Math.max(1, Math.round(80 / unit.length))).trimEnd();

  return (
    <div
      className="medal"
      data-metal={shown.metal}
      style={{ '--poly': POLY } as CSSProperties}
      onPointerMove={hold}
      onPointerLeave={release}
      aria-hidden="true"
    >
      <span ref={impact} className="medal__impact" />
      <div ref={tilt} className="medal__tilt">
        <div ref={spin} className="medal__spin">
          {/* Painted back to front: engines that flatten clipped 3D layers still end on the engraved face. */}
          <div className="medal__face medal__face--back" />
          {EDGES.map((z) => <i key={z} className="medal__edge" style={{ '--z': `${z}px` } as CSSProperties} />)}
          <div className="medal__face">
            <svg viewBox="0 0 100 100">
              <defs>
                <path id={id} d="M50 11.500a38.500 38.500 0 1 1 0 77a38.500 38.500 0 1 1 0-77" />
              </defs>
              <circle cx="50" cy="50" r="46.300" fill="none" stroke="currentColor" strokeOpacity="0.3" strokeWidth="0.5" />
              <polygon points={INNER} fill="none" stroke="currentColor" strokeOpacity="0.45" strokeWidth="0.6" />
              <text fill="currentColor" textLength="239" lengthAdjust="spacing" style={{ fontFamily: 'var(--mono)', fontSize: '4.300px' }}>
                <textPath href={`#${id}`} textLength="239" lengthAdjust="spacing">
                  {rim}
                </textPath>
              </text>
              <text x="50" y={word ? 54 : 57.500} textAnchor="middle" fill="currentColor" style={{ fontFamily: 'var(--serif)', fontSize: word ? '18px' : '28px' }}>
                {shown.mark}
                {shown.suffix && <tspan dy="-9" style={{ fontSize: '10px' }}>{shown.suffix}</tspan>}
              </text>
              <text x="50" y="68" textAnchor="middle" fill="currentColor" style={{ fontFamily: 'var(--mono)', fontSize: '4px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                {shown.label}
              </text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
