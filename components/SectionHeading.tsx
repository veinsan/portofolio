import Reveal from "@/components/Reveal";

export default function SectionHeading({
  title,
  caption,
}: {
  title: string;
  caption: string;
}) {
  return (
    <header className="mb-12 md:mb-[5vw]">
      <Reveal variant="wipe">
        <p className="mb-3 flex items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-current/65 before:h-px before:w-6 before:bg-current/35 sm:text-xs sm:tracking-[0.18em] sm:before:w-8">
          {caption}
        </p>
      </Reveal>
      <Reveal variant="wipe" delay={60}>
        <h2 className="max-w-full text-[clamp(2.15rem,11vw,4.35rem)] font-semibold uppercase leading-[.9] tracking-[-0.035em] text-balance md:text-[10.5vw] md:leading-[.86] md:tracking-[-0.08em]">
          {title}
        </h2>
      </Reveal>
    </header>
  );
}
