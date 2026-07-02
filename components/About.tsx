import { about, skills } from "@/lib/data";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading index="03" label="About" title="Engineer first, then the models" />

        <div className="grid gap-14 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3">
            <Reveal>
              <p className="text-lg leading-relaxed text-fg">{about.intro}</p>
              <p className="mt-5 text-base leading-relaxed text-muted">{about.body}</p>
            </Reveal>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {about.principles.map((p, i) => (
                <Reveal key={p.title} delay={i * 80}>
                  <div className="card h-full p-5">
                    <h3 className="font-display text-[15px] font-semibold text-fg">{p.title}</h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-muted">{p.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <Reveal delay={120}>
              <h3 className="font-mono text-[13px] tracking-widest text-accent-mid uppercase">
                Toolbox
              </h3>
              <div className="mt-6 space-y-7">
                {skills.map((group) => (
                  <div key={group.group}>
                    <h4 className="text-sm font-medium text-fg">{group.group}</h4>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-line bg-elevated/60 px-3.5 py-1.5 font-mono text-[13px] text-muted transition-colors hover:border-line-strong hover:text-fg"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
