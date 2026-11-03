import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Glow from "@/components/Glow";
import { projects } from "@/lib/data";

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  const where = p.place ? ` ${p.place}, ${p.event}.` : "";
  return { title: p.title, description: `${p.summary}${where}`.slice(0, 160) };
}

const sections = [
  { id: "problem", label: "Problem" },
  { id: "approach", label: "Approach" },
  { id: "result", label: "Result" },
] as const;

export default async function Case({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];

  return (
    <article className="case">
      <header className="case__head">
        <p className="case__back"><Link prefetch={false} className="link" href="/#work">( Work )</Link></p>
        <h1 className="case__title" data-split="lines" data-intro>{p.title}</h1>
        <p className="case__summary" data-split="lines" data-intro data-delay="0.1">{p.summary}</p>
      </header>

      <figure className="case__cover" data-reveal="clip" data-intro data-delay="0.15">
        {p.media ? (
          <Image src={p.media.src} alt={p.media.alt} width={p.media.width} height={p.media.height} sizes="100vw" loading="eager" />
        ) : (
          <Glow seed={p.slug} live />
        )}
        {p.media && <figcaption>{p.media.caption}</figcaption>}
      </figure>

      <dl className="case__meta">
        {p.place && <div><dt>Placement</dt><dd>{p.place}</dd></div>}
        {p.event && <div><dt>{p.place ? "Event" : "Context"}</dt><dd>{p.event}</dd></div>}
        {p.metric && <div><dt>Score</dt><dd>{p.metric.value} {p.metric.label}</dd></div>}
        <div><dt>Stack</dt><dd>{p.stack.join(", ")}</dd></div>
        {p.repoUrl && (
          <div>
            <dt>Code</dt>
            <dd><a className="link" href={p.repoUrl} target="_blank" rel="noopener noreferrer">Repository on GitHub</a></dd>
          </div>
        )}
      </dl>

      <div className="case__body">
        {sections.map((s) => (
          <section className="case__section" key={s.id} aria-labelledby={`${s.id}-h`}>
            <h2 id={`${s.id}-h`} className="case__h">( {s.label} )</h2>
            <div>
              <p className="case__text" data-split="lines">{p[s.id]}</p>
              {s.id === "result" && p.team && <p className="case__team">{p.team}</p>}
            </div>
          </section>
        ))}
      </div>

      <Link prefetch={false} className="next" href={`/work/${next.slug}/`} data-title={next.title}>
        <span className="next__label">( Next project )</span>
        <span className="next__title">{next.title}</span>
        <span className="next__chip" aria-hidden="true"><svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 13 13 5M6.5 5H13v6.5" /></svg></span>
      </Link>
    </article>
  );
}
