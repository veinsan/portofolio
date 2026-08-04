import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { projects, type Project } from "@/lib/data";

export default function Work() {
  return (
    <section
      id="works"
      className="scroll-mt-16 bg-[#f7f6f2] px-5 py-20 text-[#171717] md:px-[2.4vw] md:py-[9vw]"
    >
      <SectionHeading title="Works" caption="Selected projects" />
      <p className="hidden text-sm uppercase tracking-[0.16em] text-[#6b665d] md:block">
        Hover for details
      </p>

      <div className="mt-12 columns-1 gap-5 sm:columns-2 xl:columns-3">
        {projects.map((project, index) => (
          <Reveal
            variant="wipe"
            className="mb-5 break-inside-avoid"
            delay={Math.min(index * 60, 300)}
            key={project.id}
          >
            <WorkCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function WorkCard({ project }: { project: Project }) {
  const proof = [project.metrics, project.badge].filter(Boolean).join(" · ");

  return (
    <a
      className="group relative block overflow-hidden bg-[#e7e3da] text-[#171717] outline-none transition duration-500 hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:ring-2 focus-visible:ring-[#174fff]"
      href={project.repoUrl}
      target="_blank"
      rel="noreferrer"
    >
      <div className="relative overflow-hidden">
        <div className="project-placeholder grid aspect-[16/9] place-items-center bg-[#111] text-[#f4f1ea] transition duration-700 md:group-hover:scale-[1.04] md:group-focus-visible:scale-[1.04]">
          <span className="text-[18vw] font-semibold uppercase leading-none tracking-[-0.08em] md:text-[8vw]">
            {project.title.slice(0, 2)}
          </span>
          <small className="absolute bottom-4 left-5 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/55">
            Project image placeholder
          </small>
        </div>

        <div className="relative flex flex-col justify-end bg-[#f7f6f2] p-5 transition duration-500 md:absolute md:inset-0 md:translate-y-4 md:bg-[#f7f6f2]/88 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-visible:translate-y-0 md:group-focus-visible:opacity-100">
          <span className="text-sm uppercase tracking-[0.16em] text-[#6b665d]">
            {project.role}
          </span>
          <h3 className="mt-2 text-[clamp(2rem,9vw,2.5rem)] font-semibold leading-none tracking-[-0.04em] md:text-4xl md:tracking-[-0.05em]">
            {project.title}
          </h3>
          <p className="mt-4 max-w-[34rem] text-sm leading-[1.65] text-[#38352f]">
            {project.description}
          </p>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
            {project.techStack.slice(0, 4).map((tech) => (
              <li
                className="rounded-full border border-[#171717]/15 bg-white/55 px-2.5 py-1 text-xs text-[#25231f]"
                key={tech}
              >
                {tech}
              </li>
            ))}
          </ul>
          {proof && <strong className="mt-5 text-sm font-semibold text-[#174fff]">{proof}</strong>}
        </div>
      </div>
    </a>
  );
}
