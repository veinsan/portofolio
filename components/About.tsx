import Image from "next/image";

import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { about, principles } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="scroll-mt-16 px-5 py-20 md:px-[2.4vw] md:py-[9vw]">
      <SectionHeading title="About" caption="Profile" />

      <div className="grid grid-cols-12 gap-x-3 gap-y-10">
        <Reveal variant="wipe" className="col-span-12 max-w-5xl md:col-span-7" delay={40}>
          <h3 className="text-[clamp(3rem,12vw,5.25rem)] font-medium leading-[.93] tracking-[-0.045em] text-balance md:text-[5.6vw] md:leading-[.9] md:tracking-[-0.07em]">
            {about.heading}
          </h3>
        </Reveal>
        <Reveal variant="wipe" className="col-span-12 max-w-2xl md:col-span-4 md:col-start-9" delay={90}>
          <p className="text-lg leading-[1.6] tracking-[-0.02em] text-[#34312c] md:text-3xl md:leading-[1.55] md:tracking-[-0.025em]">
            {about.intro}
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-3 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
        {principles.map((principle, index) => (
          <Reveal variant="wipe" delay={index * 90} key={principle.title}>
            <article className="group relative min-h-[22rem] overflow-hidden bg-[#171717] text-[#f4f1ea] sm:min-h-[28rem]">
              <div className="principle-media absolute inset-0">
                <Image
                  className={principle.media.fit === "cover" ? "object-cover" : "object-contain"}
                  src={principle.media.src}
                  alt={principle.media.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  style={{ objectPosition: principle.media.position }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/18 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <span className="font-mono text-xs text-white/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h4 className="mt-8 text-3xl font-medium leading-[1] tracking-[-0.04em] md:leading-[.98] md:tracking-[-0.055em]">
                  {principle.title}
                </h4>
                <p className="mt-4 text-sm leading-[1.6] text-white/78">{principle.text}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
