import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Btn from "@/components/Btn";
import { ArrowRight } from "@/components/Icons";
import Img, { Cover } from "@/components/Img";
import Rings from "@/components/Rings";
import { bySlug, projects } from "@/lib/data";

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = bySlug((await params).slug);
  if (!p) return {};
  return { title: p.title, description: [p.badge && `${p.badge}.`, p.summary].filter(Boolean).join(" ") };
}

export default async function Case({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = bySlug(slug);
  if (!p) notFound();
  const next = projects[(projects.indexOf(p) + 1) % projects.length];

  const sections = [
    { label: "Problem", text: p.problem },
    { label: "Approach", text: p.approach },
    ...(p.result ? [{ label: "Result", text: p.result }] : []),
  ];

  return (
    <article>
      <header className="page-top case__top">
        <Rings className="page-top__rings" />
        <div className="column">
          <Link prefetch={false} className="case__back" href="/work/" data-title="Work">
            <ArrowRight />
            All work
          </Link>
          <h1 className="display" data-split="lines" data-intro>{p.title}</h1>
          <p className="subtitle case__kind" data-split="lines" data-intro data-delay="0.1">{p.kind}</p>
          <p className="case__summary" data-split="lines" data-intro data-delay="0.18">{p.summary}</p>
          {(p.live || p.repo || p.video) && (
            <div className="case__links">
              {p.live && <Btn href={p.live} external>Open it live</Btn>}
              {p.repo && <Btn href={p.repo} tone={p.live ? "line" : "ink"} external>Read the code</Btn>}
              {p.video && <Btn href={p.video} tone="line" external>Watch the video</Btn>}
            </div>
          )}
          <dl className="case__meta">
            <div>
              <dt className="label label--muted">When</dt>
              <dd>{p.when ?? p.year}</dd>
            </div>
            {p.badge && (
              <div>
                <dt className="label label--muted">Outcome</dt>
                <dd>{p.badge}</dd>
              </div>
            )}
            <div>
              <dt className="label label--muted">Field</dt>
              <dd>{p.categories.join(", ")}</dd>
            </div>
          </dl>
        </div>
      </header>

      {p.cover && (
        <div className="wide case__cover" data-reveal="fade" data-intro data-delay="0.25">
          <Cover project={p} sizes="(min-width: 1300px) 78rem, 94vw" lazy={false} alt={`${p.title}, ${p.kind}`} />
        </div>
      )}

      <div className="column">
        {p.facts && (
          <dl className="figures">
            {p.facts.map((f) => (
              <div key={f.k}>
                <dt className="label">{f.k}</dt>
                <dd>{f.v}</dd>
              </div>
            ))}
          </dl>
        )}

        <ol className="tl">
          {sections.map((s) => (
            <li className="tl__item" key={s.label}>
              <h2 className="h3">{s.label}</h2>
              <p className="case__text">{s.text}</p>
            </li>
          ))}
          <li className="tl__item">
            <h2 className="h3">Built with</h2>
            <ul className="tags">{p.stack.map((s) => <li key={s}>{s}</li>)}</ul>
            {p.team && <p className="case__text">{p.team}</p>}
            {p.note && <p className="case__text">{p.note}.</p>}
          </li>
        </ol>
      </div>

      {p.shots && (
        <ul className="wide case__shots">
          {p.shots.map((s, i) => (
            <li key={s.alt}>
              <Img src={`/projects/${p.slug}-shot${i + 1}.webp`} width={s.size[0]} height={s.size[1]} alt={s.alt} loading="lazy" />
            </li>
          ))}
        </ul>
      )}
      {!p.shots && <div className="section" />}

      <Link prefetch={false} className="next" href={`/work/${next.slug}/`} data-title={next.title}>
        <span className="label label--muted">Next project</span>
        <span className="display next__title">
          {next.title}
          <ArrowRight />
        </span>
      </Link>
    </article>
  );
}
