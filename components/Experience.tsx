import { experience } from "@/lib/data";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="02"
          label="Experience"
          title="Where I've built"
        />

        <ol className="relative ml-1.5 border-l border-line">
          {experience.map((item, i) => (
            <li key={item.period} className="relative pb-12 pl-8 last:pb-0 sm:pl-12">
              {/* Timeline node */}
              <span
                className="absolute top-1.5 -left-[5px] h-[9px] w-[9px] rounded-full border border-accent-mid bg-base shadow-[0_0_10px_rgba(129,140,248,0.6)]"
                aria-hidden="true"
              />
              <Reveal delay={i * 60}>
                <p className="font-mono text-[13px] tracking-wide text-accent-mid">{item.period}</p>
                <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-fg">
                  {item.role}
                  <span className="text-muted"> · {item.company}</span>
                </h3>
                <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted">{item.summary}</p>
                {item.highlights.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {item.highlights.map((h) => (
                      <li key={h} className="flex max-w-2xl gap-3 text-[15px] leading-relaxed text-muted">
                        <span className="mt-2.25 h-1 w-1 shrink-0 rounded-full bg-accent-mid" aria-hidden="true" />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
