import { site } from "@/lib/data";

export default function Hero() {
  return (
    <>
      <div className="opening-loader" aria-hidden="true">
        <div className="text-center text-white">
          <p className="text-4xl italic leading-none tracking-[-0.1em]">{site.initials}</p>
          <p className="mt-2 text-[9px] uppercase tracking-[0.35em]">portfolio</p>
        </div>
      </div>

      <section
        id="home"
        className="relative min-h-[100svh] overflow-hidden px-5 pb-16 pt-28 md:min-h-screen md:px-[2.4vw] md:pb-[4.5vw] md:pt-[9vw]"
      >
      <div className="grid grid-cols-12 gap-x-3 gap-y-8">
        <div className="load-wipe col-span-12 max-w-[34rem] py-2 md:col-span-10 md:col-start-1">
          <p className="text-lg leading-[1.7] tracking-[-0.03em] text-[#2f2d28] md:text-[1.35vw]">
            {site.name}, Information Systems &amp; Technology @ ITB
          </p>
        </div>
        <div
          className="load-wipe col-span-12 max-w-[34rem] py-2 md:col-span-5 md:col-start-6"
          style={{ "--enter-delay": "90ms" } as React.CSSProperties}
        >
          <p className="text-lg leading-[1.7] tracking-[-0.03em] text-[#2f2d28] md:text-[1.35vw]">
            Data science and AI engineer in Bandung. I build intelligent systems from model
            design and validation to production-ready software.
          </p>
        </div>
      </div>

      <h1
        className="hero-title absolute left-5 right-5 top-[60svh] -translate-y-1/2 text-left text-[clamp(2.25rem,11.5vw,3rem)] font-semibold uppercase leading-[.88] tracking-[-0.045em] text-[#111] md:bottom-[3vw] md:left-[2.4vw] md:right-[2.4vw] md:top-auto md:translate-y-0 md:text-[10vw] md:leading-[.82] md:tracking-[-0.075em]"
        aria-label="Engineering Intelligence"
      >
        <span className="load-wipe block">
          <b className="block font-semibold">Engineering</b>
        </span>
        <span
          className="load-wipe block text-right"
          style={{ "--enter-delay": "120ms" } as React.CSSProperties}
        >
          <b className="block font-semibold">Intelligence</b>
        </span>
      </h1>
      </section>
    </>
  );
}
