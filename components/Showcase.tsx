'use client';
// Gallery of real covers that pans with the page, a bar naming the one in view, and a list view.
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { featured, projects } from '@/lib/data';
import { scrollToY } from '@/engine';
import { ArrowRight, Chevron, External, GitHub } from './Icons';
import Img, { Cover } from './Img';
import ProjectRow from './ProjectRow';

type View = 'gallery' | 'list';

function ViewSwitch({ view, onPick }: { view: View; onPick: (v: View) => void }) {
  return (
    <div className="switch" role="group" aria-label="Show the work as">
      <button type="button" data-view-pick="list" aria-pressed={view === 'list'} onClick={() => onPick('list')}>List</button>
      <span aria-hidden="true">/</span>
      <button type="button" data-view-pick="gallery" aria-pressed={view === 'gallery'} onClick={() => onPick('gallery')}>Gallery</button>
    </div>
  );
}

export default function Showcase() {
  const [view, setView] = useState<View>('gallery');
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLElement>(null);
  const picked = useRef<View>(null);

  // motion/page.ts reports how far the band has panned.
  useEffect(() => {
    const el = root.current;
    const band = el?.querySelector('[data-pan]');
    if (!el || !band) return;
    const onPan = (e: Event) => {
      const progress = (e as CustomEvent<number>).detail;
      const cards = el.querySelectorAll<HTMLElement>('.gcard');
      const track = el.querySelector<HTMLElement>('[data-pan-track]')!;
      // The sampling line travels from the first cover's side to the last one's as the band pans.
      const line = innerWidth * (0.3 + 0.4 * progress) - track.getBoundingClientRect().left;
      let next = 0;
      cards.forEach((c, i) => { if (c.offsetLeft <= line) next = i; });
      setIndex(next);
    };
    band.addEventListener('pan', onPan);
    return () => band.removeEventListener('pan', onPan);
  }, []);

  // Switching view changes the section's height. Measure again, and start from its top.
  useEffect(() => {
    if (!picked.current || !root.current) return;
    ScrollTrigger.refresh();
    scrollToY(root.current.getBoundingClientRect().top + scrollY);
    const buttons = root.current.querySelectorAll<HTMLElement>(`[data-view-pick="${view}"]`);
    [...buttons].find((b) => b.offsetParent)?.focus({ preventScroll: true });
  }, [view]);

  const pick = (v: View) => { picked.current = v; setView(v); };
  const p = featured[index];

  return (
    <section id="work" ref={root} className="showcase" data-view={view} aria-labelledby="work-title">
      <h2 id="work-title" className="sr-only">Selected work</h2>
      <span className="columns-bg" aria-hidden="true" />

      <div className="pan" data-pan>
        <div className="pan__sticky" data-pan-sticky>
          <div className="pan__top showcase__top">
            <span className="label" aria-hidden="true">Selected work</span>
            <ViewSwitch view={view} onPick={pick} />
          </div>

          <div className="pan__view">
            <ul className="pan__track gallery" data-pan-track>
              {featured.map((f, i) => {
                const [w, h] = f.cover!;
                const alt = f.shots?.[0];
                return (
                  <li key={f.slug} className={`gcard${open && i === index ? ' is-open' : ''}`}>
                    <Link prefetch={false} className="gcard__link" href={`/work/${f.slug}/`} data-title={f.title}>
                      <span className="sr-only">{f.title}, {f.kind}</span>
                      <Cover project={f} className="gcard__media" sizes="(min-width: 768px) 80vw, 92vw" style={{ '--ar': w / h } as CSSProperties} />
                      {alt && <Img className="gcard__alt" src={`/projects/${f.slug}-shot1.webp`} width={alt.size[0]} height={alt.size[1]} alt="" loading="lazy" />}
                    </Link>
                    <p className="gcard__text">{f.summary}</p>
                  </li>
                );
              })}
              <li className="gend">
                <Link prefetch={false} href="/work/" data-title="Work">
                  <span className="gend__count">{projects.length}</span>
                  <span className="gend__label">All work<ArrowRight /></span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="showcase__bar">
            <div className="bar__line">
              <button type="button" className="bar__title" aria-expanded={open} aria-controls="work-panel" onClick={() => setOpen((o) => !o)}>
                <span className="bar__num">{String(index + 1).padStart(2, '0')}</span>
                <span key={p.slug} className="bar__name">{p.title}</span>
                <span className="bar__chev" aria-hidden="true"><Chevron /></span>
              </button>
              <div className="bar__meta">
                {p.badge && <span className="meta bar__badge">{p.badge}</span>}
                <span className="meta">{p.year}</span>
                {p.live ? (
                  <a className="round" href={p.live} target="_blank" rel="noopener noreferrer" aria-label={`Open ${p.title}`}><External /></a>
                ) : p.repo && (
                  <a className="round" href={p.repo} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} on GitHub`}><GitHub /></a>
                )}
              </div>
            </div>
            <div id="work-panel" hidden={!open}>
              <div className="bar__panel">
                <p className="prose">{p.summary} {p.result}</p>
                <div className="bar__side">
                  <ul className="tags">{p.stack.map((s) => <li key={s}>{s}</li>)}</ul>
                  <Link prefetch={false} className="arrow-link" href={`/work/${p.slug}/`} data-title={p.title}>
                    Read the case
                    <ArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="showcase__list">
        <div className="showcase__listhead">
          <span className="label" aria-hidden="true">Selected work</span>
          <ViewSwitch view={view} onPick={pick} />
        </div>
        <ul className="plist">{featured.map((f, i) => <ProjectRow key={f.slug} project={f} n={i + 1} />)}</ul>
      </div>
    </section>
  );
}
