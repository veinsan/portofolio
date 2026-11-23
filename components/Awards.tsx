'use client';
// Medal board: filter by level, sort three ways, click a result to strike it onto the medal.
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { results, type Result } from '@/lib/data';
import { scrollToY } from '@/engine';
import { ArrowRight } from './Icons';
import Medal from './Medal';

const PREVIEW = 6;
const isPodium = (r: Result) => !!r.suffix && Number(r.mark) <= 3;

const filters = [
  { id: 'all', label: 'All results', test: () => true },
  { id: 'podium', label: 'Podiums', test: isPodium },
  { id: 'international', label: 'International', test: (r: Result) => r.level === 'International' },
  { id: 'national', label: 'National', test: (r: Result) => r.level === 'National' },
] as const;
type Filter = (typeof filters)[number]['id'];

// `data.ts` lists results best first, and sort is stable, so ties keep that order.
const levelOrder = (r: Result) => (r.level === 'International' ? 0 : r.level === 'National' ? 1 : 2);
const sorts = [
  { id: 'rank', label: 'Rank', order: () => 0, group: (r: Result) => (isPodium(r) ? 'Podium' : 'Finals and honors') },
  { id: 'newest', label: 'Newest', order: (r: Result) => -(r.month ?? 0), group: (r: Result) => (r.month ? r.when : 'Earlier in 2026') },
  { id: 'level', label: 'Level', order: levelOrder, group: (r: Result) => r.level ?? 'Other' },
] as const;
type Sort = (typeof sorts)[number]['id'];

export default function Awards() {
  const [filter, setFilter] = useState<Filter>('all');
  const [sort, setSort] = useState<Sort>('rank');
  const [all, setAll] = useState(false);
  const [on, setOn] = useState(results[0]);
  const held = useRef<{ el: HTMLElement; top: number }>(null);

  const by = sorts.find((s) => s.id === sort)!;
  const test = filters.find((f) => f.id === filter)!.test;
  const list = results.filter(test).sort((a, b) => by.order(a) - by.order(b));
  const shown = all ? list : list.slice(0, PREVIEW);

  const groups: { name: string; rows: Result[] }[] = [];
  shown.forEach((r) => {
    const name = by.group(r);
    const last = groups[groups.length - 1];
    if (last?.name === name) last.rows.push(r);
    else groups.push({ name, rows: [r] });
  });

  // The page gets taller or shorter, so everything below has to be measured again.
  useEffect(() => { ScrollTrigger.refresh(); }, [filter, sort, all, on]);

  // Opening a row closes the one above it. Keep the clicked row where it was on screen.
  useLayoutEffect(() => {
    if (!held.current) return;
    const { el, top } = held.current;
    held.current = null;
    const moved = el.getBoundingClientRect().top - top;
    if (Math.abs(moved) > 1) scrollToY(scrollY + moved, true);
  }, [on]);
  const select = (r: Result, el: HTMLElement) => {
    if (r === on) return;
    held.current = { el, top: el.getBoundingClientRect().top };
    setOn(r);
  };

  const pick = (id: Filter) => {
    setFilter(id);
    const first = results.filter(filters.find((f) => f.id === id)!.test)[0];
    if (first) setOn(first);
  };

  return (
    <section id="awards" className="section awards" aria-labelledby="awards-title">
      <div className="wide">
        <div className="head">
          <h2 id="awards-title" className="h2">Awards &amp; honors</h2>
          <p className="lead head__aside">Every result from 2026, best first. Pick one and it gets minted on the medal.</p>
        </div>

        <div className="board">
          <div className="board__aside">
            <Medal result={on} />
            <p className="board__caption" aria-live="polite">
              <span className="meta">{[on.when, on.level].filter(Boolean).join(' / ')}</span>
              <span className="h3 board__event">{on.event}</span>
            </p>
          </div>

          <div>
            <div className="board__controls">
              <div className="tallies" role="group" aria-label="Filter results">
                {filters.map((f) => (
                  <button key={f.id} type="button" className="tally" aria-pressed={filter === f.id} onClick={() => pick(f.id)}>
                    <b>{String(results.filter(f.test).length).padStart(2, '0')}</b>
                    {f.label}
                  </button>
                ))}
              </div>
              <div className="switch" role="group" aria-label="Sort results">
                {sorts.map((s) => (
                  <button key={s.id} type="button" aria-pressed={sort === s.id} onClick={() => setSort(s.id)}>{s.label}</button>
                ))}
              </div>
            </div>

            <div id="award-list">
              {groups.map((g) => (
                <div key={g.name}>
                  <h3 className="group__title label">
                    {g.name}
                    <span aria-hidden="true">{String(list.filter((r) => by.group(r) === g.name).length).padStart(2, '0')}</span>
                  </h3>
                  <ul>
                    {g.rows.map((r) => {
                      const active = r === on;
                      return (
                        <li key={r.event} className={`row-item${active ? ' is-on' : ''}`}>
                          <button type="button" className="row" aria-expanded={active} onClick={(e) => select(r, e.currentTarget)}>
                            <span className="row__mark">
                              <span className={`row__num${r.suffix ? '' : ' row__num--word'}`}>
                                {r.mark}
                                {r.suffix && <sup>{r.suffix}</sup>}
                              </span>
                              <span className="meta">{r.label}</span>
                            </span>
                            <span className="row__event">{r.event}</span>
                            <span className="row__when meta">{r.when}</span>
                            <span className="row__host">{[r.host, r.level, r.of && `of ${r.of}`].filter(Boolean).join(', ')}</span>
                          </button>
                          {active && (
                            <div className="row__detail">
                              <p className="prose">{r.note}</p>
                              <ul className="tags">{r.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                              <Link prefetch={false} className="arrow-link" href={`/work/${r.slug}/`} data-title={r.event}>
                                Read the project
                                <ArrowRight />
                              </Link>
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            {list.length > PREVIEW && (
              <button type="button" className="pill pill--line board__more" aria-expanded={all} aria-controls="award-list" onClick={() => setAll((a) => !a)}>
                {all ? 'Show fewer' : `Show all ${list.length} results`}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
