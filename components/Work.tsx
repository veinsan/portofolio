import { projects } from "@/lib/data";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { ArrowUpRight } from "@/components/icons";

export default function Work() {
  return (
    <section id="work" className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="01"
          label="Selected Work"
          title="Systems I'm proud of"
          description="A few projects that show the range — retrieval pipelines, edge inference, event-driven backends and the tooling that keeps them honest."
        />

        <div className="grid gap-5 sm:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={(i % 2) * 90}>
              <a
                href={project.href}
                className={`card group flex h-full flex-col p-7 sm:p-8 ${
                  project.featured ? "sm:min-h-72" : ""
                }`}
              >
                {/* Gradient hairline along the top edge */}
                <span
                  className="mb-7 block h-px w-full bg-gradient-to-r from-accent-strong/70 via-accent-mid/30 to-transparent"
                  aria-hidden="true"
                />
                <div className="flex items-start justify-between gap-4">
                  <p className="font-mono text-[13px] text-faint">{project.index}</p>
                  <ArrowUpRight
                    size={19}
                    className="shrink-0 text-faint transition-all duration-200 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                  />
                </div>
                <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-fg transition-colors group-hover:text-accent">
                  {project.title}
                </h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">
                  {project.description}
                </p>
                <p className="mt-5 font-mono text-[13px] text-accent-mid">{project.metric}</p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tech stack">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
