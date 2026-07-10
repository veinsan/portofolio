"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import type { Project } from "@/lib/data";
import { ExternalLink, GitHub } from "@/components/icons";

/**
 * Interactive project showcase: a tab list of projects driving a preview
 * panel. Follows the WAI-ARIA tabs pattern (roving tabindex, arrow keys).
 * The panel is re-keyed on selection so the enter transition replays;
 * prefers-reduced-motion disables it in globals.css.
 */
export default function ProjectShowcase({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);
  const project = projects[active];
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  // Fade the rail's clipped edge while more tabs exist to the right
  const [moreRight, setMoreRight] = useState(false);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const update = () =>
      setMoreRight(el.scrollWidth - el.clientWidth - el.scrollLeft > 8);
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, []);

  function selectAndFocus(i: number) {
    const next = (i + projects.length) % projects.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    switch (e.key) {
      case "ArrowDown":
      case "ArrowRight":
        e.preventDefault();
        selectAndFocus(active + 1);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        e.preventDefault();
        selectAndFocus(active - 1);
        break;
      case "Home":
        e.preventDefault();
        selectAndFocus(0);
        break;
      case "End":
        e.preventDefault();
        selectAndFocus(projects.length - 1);
        break;
    }
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-8">
      {/* Project list: horizontal scroll row on mobile, vertical rail on desktop */}
      <div
        ref={listRef}
        role="tablist"
        aria-label="Selected projects"
        onKeyDown={onKeyDown}
        data-fade-end={moreRight}
        className="-mx-5 flex gap-2.5 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0 lg:flex-col lg:gap-3 lg:overflow-visible lg:pb-0"
      >
        {projects.map((p, i) => {
          const selected = i === active;
          return (
            <button
              key={p.title}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${i}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={`min-h-11 shrink-0 cursor-pointer rounded-xl border px-4 py-3 text-left transition duration-150 active:scale-[0.985] lg:w-full lg:px-5 lg:py-4 ${
                selected
                  ? "border-accent-mid/40 bg-white/5 text-fg"
                  : "border-line text-muted hover:border-line-strong hover:text-fg"
              }`}
            >
              <span className="flex items-center gap-3">
                <span className={`font-mono text-xs ${selected ? "text-accent-mid" : "text-faint"}`}>
                  {p.index}
                </span>
                <span className="text-sm font-medium whitespace-nowrap lg:whitespace-normal">
                  {p.title}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Preview panel */}
      <div role="tabpanel" id={`${baseId}-panel`} aria-labelledby={`${baseId}-tab-${active}`}>
        <div
          key={project.title}
          className="showcase-enter overflow-hidden rounded-2xl border border-line bg-white/3"
        >
          <div className="relative aspect-[16/10] border-b border-line">
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              fill
              sizes="(min-width: 1024px) 56vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="p-6 sm:p-8">
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[13px] text-faint">
              <span>{project.index}</span>
              {project.role && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{project.role}</span>
                </>
              )}
            </p>
            <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-fg">
              {project.title}
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">{project.description}</p>
            <p className="mt-4 font-mono text-[13px] text-accent-mid">{project.metric}</p>

            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted"
                >
                  {tech}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-medium text-fg transition duration-150 hover:border-accent-mid hover:text-accent active:scale-[0.98]"
              >
                <GitHub size={16} />
                View on GitHub
              </a>
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent-strong px-5 py-2.5 text-sm font-semibold text-white transition duration-150 hover:bg-accent-mid active:scale-[0.98]"
                >
                  <ExternalLink size={16} />
                  Live demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
