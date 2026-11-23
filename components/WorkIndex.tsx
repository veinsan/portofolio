'use client';
// Every project: filter by kind, and the cover of the row you point at shows beside the list.
import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { categories, projects, type Category, type Project } from '@/lib/data';
import { Cover } from './Img';
import ProjectRow from './ProjectRow';
import Rings from './Rings';

type Filter = 'All' | Category;
const FILTERS: Filter[] = ['All', ...categories];
const match = (p: Project, f: Filter) => f === 'All' || p.categories.includes(f);

export default function WorkIndex() {
  const [filter, setFilter] = useState<Filter>('All');
  const [point, setPoint] = useState(projects[0]);
  const rows = useRef<HTMLUListElement>(null);
  const list = projects.filter((p) => match(p, filter));
  const shown = list.includes(point) ? point : list[0];

  useEffect(() => { ScrollTrigger.refresh(); }, [filter]);

  useEffect(() => {
    const items = [...(rows.current?.children ?? [])];
    const visible = projects.filter((p) => match(p, filter));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setPoint(visible[items.indexOf(e.target)]); });
    }, { rootMargin: '-44% 0px -55% 0px' });
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [filter]);

  return (
    <div className="index wide">
      <div className="filters" role="group" aria-label="Filter projects">
        {FILTERS.map((f) => (
          <button key={f} type="button" className="tally" aria-pressed={filter === f} onClick={() => setFilter(f)}>
            {f}
            <b>{projects.filter((p) => match(p, f)).length}</b>
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">{list.length} projects shown.</p>

      <div className="index__grid">
        <ul className="plist" ref={rows}>
          {list.map((p) => <ProjectRow key={p.slug} project={p} n={projects.indexOf(p) + 1} onPoint={() => setPoint(p)} />)}
        </ul>
        <div className="index__preview" aria-hidden="true">
          <div className="index__frame">
            {shown.cover ? (
              <Cover key={shown.slug} project={shown} sizes="40vw" lazy={false} />
            ) : (
              <div key={shown.slug} className="type-cover">
                <Rings />
                <span className="type-cover__name">{shown.title}</span>
              </div>
            )}
          </div>
          <p className="meta">{[shown.title, shown.when ?? shown.year].join(' / ')}</p>
        </div>
      </div>
    </div>
  );
}
