import { site } from "@/lib/data";
import NeuralCanvas from "@/components/NeuralCanvas";
import Reveal from "@/components/Reveal";
import { ArrowDown, ArrowUpRight } from "@/components/icons";

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-dvh items-center overflow-hidden">
      {/* Layered backdrop: grid → ambient glows → particle network */}
      <div className="hero-grid absolute inset-0" aria-hidden="true" />
      <div
        className="glow-blob animate-drift h-105 w-105 bg-accent-strong/25 -top-32 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      />
      <div
        className="glow-blob animate-drift-slow h-80 w-80 bg-glow/10 top-1/3 -right-20"
        aria-hidden="true"
      />
      <NeuralCanvas className="absolute inset-0 opacity-70" />
      {/* Fade the scene into the page below */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-base"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 pt-24 pb-20 sm:px-8">
        <Reveal>
          <p className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-line bg-elevated/60 px-4 py-2 font-mono text-[13px] text-muted backdrop-blur-sm">
            <span className="animate-pulse-dot h-2 w-2 rounded-full bg-ok" />
            {site.availability}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="max-w-4xl font-display text-[clamp(2.6rem,7.5vw,5.5rem)] leading-[1.04] font-semibold tracking-tight text-fg">
            Building <span className="text-gradient">intelligent systems</span> that actually ship.
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
            I&apos;m <span className="font-medium text-fg">{site.name}</span>, a {site.roleInline}{" "}
            based in {site.location.split(" (")[0]}. {site.tagline}
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-accent-strong px-7 py-3 text-sm font-semibold text-white shadow-[0_0_32px_rgba(79,70,229,0.35)] transition-all duration-200 ease-out-expo hover:bg-accent-mid hover:shadow-[0_0_44px_rgba(129,140,248,0.45)]"
            >
              View selected work
              <ArrowUpRight size={17} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex min-h-12 items-center rounded-full border border-line-strong px-7 py-3 text-sm font-medium text-fg transition-colors duration-200 hover:border-accent-mid hover:text-accent"
            >
              Contact me
            </a>
          </div>
        </Reveal>

        <Reveal delay={340}>
          <dl className="mt-16 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-8">
            {[
              ["5+", "years shipping"],
              ["20+", "systems in prod"],
              ["3M+", "daily AI requests served"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd className="font-display text-2xl font-semibold text-fg sm:text-3xl">{value}</dd>
                <dd className="mt-1 text-[13px] leading-snug text-faint">{label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <a
        href="#work"
        aria-label="Scroll to selected work"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 rounded-full p-3 text-faint transition-colors hover:text-accent sm:block"
      >
        <ArrowDown size={18} />
      </a>
    </section>
  );
}
