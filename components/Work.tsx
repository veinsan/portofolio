import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { ArrowUpRight } from "@/components/icons";
import { projects, type Project } from "@/lib/data";

const featuredProjectIds = new Set([
  "autopilot",
  "bengawan-solo",
  "face-anti-spoofing",
  "waste-classification",
  "belajarduludek",
]);

export default function Work() {
  const featuredProjects = projects.filter((project) => featuredProjectIds.has(project.id));
  const secondaryProjects = projects.filter((project) => !featuredProjectIds.has(project.id));
  const [leadProject, ...supportingProjects] = featuredProjects;

  return (
    <section
      id="works"
      className="scroll-mt-16 bg-[#f7f6f2] px-5 py-20 text-[#171717] md:px-[2.4vw] md:py-[9vw]"
    >
      <SectionHeading title="Works" caption="Selected projects" />

      <div className="grid grid-cols-12 items-end gap-x-3 border-y border-[#171717] py-5">
        <h3 className="col-span-9 text-3xl font-medium leading-none tracking-[-0.04em] md:text-4xl">
          Featured work
        </h3>
        <p className="col-span-3 text-right text-xs uppercase tracking-[0.16em] text-[#6b665d] md:text-sm">
          {String(featuredProjects.length).padStart(2, "0")} projects
        </p>
      </div>

      {leadProject && (
        <Reveal variant="wipe" className="mt-8" delay={40}>
          <WorkCard project={leadProject} lead />
        </Reveal>
      )}

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {supportingProjects.map((project, index) => (
          <Reveal
            variant="wipe"
            delay={Math.min(index * 70 + 80, 290)}
            key={project.id}
          >
            <WorkCard project={project} />
          </Reveal>
        ))}
      </div>

      <div className="mt-20 md:mt-[7vw]">
        <div className="grid grid-cols-12 items-end gap-x-3 pb-5">
          <h3 className="col-span-9 text-3xl font-medium leading-none tracking-[-0.04em] md:text-4xl">
            More work
          </h3>
          <p className="col-span-3 text-right text-xs uppercase tracking-[0.16em] text-[#6b665d] md:text-sm">
            {String(secondaryProjects.length).padStart(2, "0")} projects
          </p>
        </div>

        <div className="border-t border-[#171717]">
          {secondaryProjects.map((project, index) => (
            <Reveal variant="wipe" delay={Math.min(index * 50, 250)} key={project.id}>
              <SecondaryWorkRow project={project} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkCard({ project, lead = false }: { project: Project; lead?: boolean }) {
  const proof = [project.metrics, project.badge].filter(Boolean).join(" · ");

  return (
    <a
      className="group relative block h-full overflow-hidden bg-[#e7e3da] text-[#171717] outline-none transition duration-500 hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:ring-2 focus-visible:ring-[#174fff]"
      href={project.repoUrl}
      target="_blank"
      rel="noreferrer"
    >
      <div className={lead ? "grid grid-cols-1 lg:grid-cols-12" : "relative overflow-hidden"}>
        <div
          className={lead ? "relative overflow-hidden lg:col-span-7" : "relative overflow-hidden"}
        >
          <div className="project-placeholder grid aspect-[16/9] place-items-center bg-[#111] text-[#f4f1ea] transition duration-700 md:group-hover:scale-[1.04] md:group-focus-visible:scale-[1.04]">
            <span
              className={
                lead
                  ? "text-[22vw] font-semibold uppercase leading-none tracking-[-0.08em] md:text-[12vw] lg:text-[8vw]"
                  : "text-[18vw] font-semibold uppercase leading-none tracking-[-0.08em] md:text-[8vw]"
              }
            >
              {project.title.slice(0, 2)}
            </span>
            <small className="absolute bottom-4 left-5 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/55">
              Project image placeholder
            </small>
          </div>
        </div>

        <div
          className={
            lead
              ? "relative flex flex-col justify-end bg-[#f7f6f2] p-5 md:p-7 lg:col-span-5 lg:p-[3vw]"
              : "relative flex flex-col justify-end bg-[#f7f6f2] p-5"
          }
        >
          <span className="text-sm uppercase tracking-[0.16em] text-[#6b665d]">
            {project.role}
          </span>
          <h3
            className={
              lead
                ? "mt-2 text-[clamp(2.5rem,7vw,4.5rem)] font-semibold leading-[.94] tracking-[-0.05em]"
                : "mt-2 text-[clamp(2rem,9vw,2.5rem)] font-semibold leading-none tracking-[-0.04em] md:text-4xl md:tracking-[-0.05em]"
            }
          >
            {project.title}
          </h3>
          <p
            className={
              lead
                ? "mt-5 max-w-[34rem] text-base leading-[1.7] text-[#38352f] md:text-lg"
                : "mt-4 max-w-[34rem] text-sm leading-[1.65] text-[#38352f]"
            }
          >
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
          {proof && (
            <strong
              className={
                lead
                  ? "mt-6 text-base font-semibold text-[#174fff]"
                  : "mt-5 text-sm font-semibold text-[#174fff]"
              }
            >
              {proof}
            </strong>
          )}
        </div>
      </div>
    </a>
  );
}

function SecondaryWorkRow({ project, index }: { project: Project; index: number }) {
  const proof = [project.metrics, project.badge].filter(Boolean).join(" · ");

  return (
    <a
      className="group grid grid-cols-12 gap-x-3 gap-y-4 border-b border-[#171717]/20 py-6 outline-none transition-colors duration-300 hover:bg-[#ebe6dc]/60 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#174fff] md:gap-y-0 md:py-7"
      href={project.repoUrl}
      target="_blank"
      rel="noreferrer"
    >
      <span className="col-span-2 font-mono text-sm text-[#174fff] md:col-span-1">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="col-span-9 md:col-span-4">
        <span className="text-xs uppercase tracking-[0.16em] text-[#6b665d]">
          {project.role}
        </span>
        <h4 className="mt-2 text-3xl font-semibold leading-[.98] tracking-[-0.04em] md:text-4xl">
          {project.title}
        </h4>
      </div>

      <ArrowUpRight
        className="col-span-1 justify-self-end transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 md:col-start-12 md:row-start-1"
        size={22}
      />

      <p className="col-span-10 col-start-3 text-sm leading-[1.65] text-[#38352f] md:col-span-4 md:col-start-6 md:row-start-1">
        {project.description}
      </p>

      <div className="col-span-10 col-start-3 md:col-span-2 md:col-start-10 md:row-start-1">
        {proof && (
          <strong className="block text-sm font-semibold text-[#174fff]">{proof}</strong>
        )}
        <ul
          className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-[#4d4a43]"
          aria-label="Technologies"
        >
          {project.techStack.slice(0, 4).map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </div>
    </a>
  );
}
