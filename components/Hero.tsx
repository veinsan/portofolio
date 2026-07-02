import { site } from "@/lib/data";
import NeuralCanvas from "@/components/NeuralCanvas";
import { ArrowDown, ArrowUpRight } from "@/components/icons";

/** Inline style helper for the load-choreography stagger */
function enterDelay(ms: number) {
  return { "--enter-delay": `${ms}ms` } as React.CSSProperties;
}

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-dvh items-center overflow-hidden">
      {/* Layered backdrop: grid → ambient glows → particle network.
          All fade in together behind the copy on load. */}
      <div className="hero-grid hero-atmo absolute inset-0" aria-hidden="true" />
      <div
        className="glow-blob animate-drift hero-atmo h-105 w-105 bg-accent-strong/25 -top-32 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      />
      <div
        className="glow-blob animate-drift-slow hero-atmo h-80 w-80 bg-glow/10 top-1/3 -right-20"
        aria-hidden="true"
      />
      <NeuralCanvas className="hero-atmo absolute inset-0 opacity-70" />
      {/* Fade the scene into the page below */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-base"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 pt-24 pb-20 sm:px-8">
        <p
          className="hero-enter mb-6 inline-flex items-center gap-2.5 rounded-full border border-line bg-elevated/60 px-4 py-2 font-mono text-[13px] text-muted backdrop-blur-sm"
          style={enterDelay(0)}
        >
          <span className="animate-pulse-dot h-2 w-2 rounded-full bg-ok" />
          {site.availability}
        </p>

        <h1
          className="hero-enter max-w-4xl font-display text-[clamp(2.6rem,7.5vw,5.5rem)] leading-[1.04] font-semibold tracking-tight text-fg"
          style={enterDelay(120)}
        >
          Building <span className="text-accent">intelligent systems</span> that actually ship.
        </h1>

        <p
          className="hero-enter mt-7 max-w-xl text-lg leading-relaxed text-muted"
          style={enterDelay(240)}
        >
          I&apos;m <span className="font-medium text-fg">{site.name}</span>, {site.roleInline},{" "}
          based in {site.location.split(" (")[0]}. {site.tagline}
        </p>

        <div className="hero-enter mt-10 flex flex-wrap items-center gap-4" style={enterDelay(360)}>
          <a
            href="#work"
            className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-accent-strong px-7 py-3 text-sm font-semibold text-white shadow-[0_0_32px_rgba(79,70,229,0.35)] transition duration-150 ease-out-expo hover:bg-accent-mid hover:shadow-[0_0_44px_rgba(129,140,248,0.45)] active:scale-[0.98]"
          >
            View selected work
            <ArrowUpRight size={17} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#contact"
            className="inline-flex min-h-12 items-center rounded-full border border-line-strong px-7 py-3 text-sm font-medium text-fg transition duration-150 hover:border-accent-mid hover:text-accent active:scale-[0.98]"
          >
            Contact me
          </a>
        </div>

        <div className="hero-enter mt-16 max-w-lg" style={enterDelay(480)}>
          <span className="hero-hairline block h-px w-full bg-line" aria-hidden="true" />
          <dl className="grid grid-cols-3 gap-6 pt-8">
            {site.stats.map(({ value, label }) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd className="font-display text-2xl font-semibold text-fg sm:text-3xl">{value}</dd>
                <dd className="mt-1 text-[13px] leading-snug text-faint">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <a
        href="#work"
        aria-label="Scroll to selected work"
        className="hero-enter absolute bottom-6 left-1/2 hidden -translate-x-1/2 rounded-full p-3 text-faint transition-colors hover:text-accent sm:block"
        style={enterDelay(700)}
      >
        <span className="animate-nudge block">
          <ArrowDown size={18} />
        </span>
      </a>
    </section>
  );
}
