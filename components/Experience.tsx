import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { experienceEntries } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-16 px-5 py-20 md:px-[2.4vw] md:py-[9vw]">
      <SectionHeading title="Experience" caption="Operating history" />

      <div className="space-y-3">
        {experienceEntries.map((entry, index) => (
          <Reveal
            variant="wipe"
            delay={index * 90}
            key={`${entry.company}-${entry.role}`}
          >
            <article className="grid grid-cols-12 gap-x-3 gap-y-6 bg-[#ebe6dc] p-5 md:p-7">
              <div className="col-span-12 md:col-span-4">
                <span className="font-mono text-xs text-[#174fff]">{entry.dateRange}</span>
                <h3 className="mt-4 text-[clamp(2rem,9vw,3rem)] font-semibold leading-[.98] tracking-[-0.04em] text-balance md:text-5xl md:leading-none md:tracking-[-0.06em]">
                  {entry.role}
                </h3>
                <p className="mt-3 text-base leading-snug text-[#4d4a43] md:text-lg">
                  {entry.company}
                </p>
              </div>
              <ul className="col-span-12 space-y-4 text-base leading-[1.68] text-[#3f3d38] md:col-span-7 md:col-start-6 md:text-lg md:leading-[1.7]">
                {entry.highlights.map((highlight) => (
                  <li className="border-t border-[#d4cdc0] pt-4" key={highlight}>
                    {highlight}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
