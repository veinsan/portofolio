import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { domains, skills } from "@/lib/data";

export default function Domain() {
  const loopSkills = [...skills, ...skills];

  return (
    <section id="domain" className="scroll-mt-16 px-5 py-20 md:px-[2.4vw] md:py-[9vw]">
      <SectionHeading title="Domain" caption="Engineering range" />

      <div className="border-t border-[#171717]">
        {domains.map((domain, index) => (
          <Reveal variant="wipe" delay={index * 100} key={domain.title}>
            <article className="grid grid-cols-12 gap-x-3 gap-y-5 border-b border-[#171717] py-6 md:py-8">
              <span className="col-span-2 font-mono text-sm text-[#174fff]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="col-span-10 md:col-span-5">
                <h3 className="text-[clamp(2.15rem,9.5vw,3.25rem)] font-semibold leading-[.96] tracking-[-0.045em] text-balance md:text-[4.2vw] md:leading-none md:tracking-[-0.06em]">
                  {domain.title}
                </h3>
                <p className="mt-4 max-w-[38rem] text-base leading-[1.7] text-[#4d4a43] md:text-lg">
                  {domain.text}
                </p>
              </div>
              <strong className="col-span-10 col-start-3 self-end text-base font-medium leading-snug tracking-[-0.02em] md:col-span-4 md:col-start-9 md:text-right md:text-lg md:tracking-[-0.03em]">
                {domain.proof}
              </strong>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mt-12 border-y border-[#171717]/10 bg-[#f7f6f2]" aria-label="Technical skills">
        <div className="relative overflow-hidden py-5">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#f7f6f2] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#f7f6f2] to-transparent" />
          <ul className="tech-marquee flex w-max items-center gap-12">
            {loopSkills.map((skill, index) => (
              <li
                className="flex shrink-0 items-center gap-3 text-base font-medium text-[#565149]"
                key={`${skill}-${index}`}
              >
                <span className="h-2 w-2 bg-[#174fff]" aria-hidden="true" />
                <span>{skill}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
