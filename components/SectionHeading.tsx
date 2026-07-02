import Reveal from "@/components/Reveal";

type Props = {
  label: string;
  title: string;
  description?: string;
};

export default function SectionHeading({ label, title, description }: Props) {
  return (
    <Reveal className="mb-12 sm:mb-16">
      <p className="mb-3 font-mono text-[13px] tracking-widest text-accent-mid uppercase">
        {label}
      </p>
      <h2 className="font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">{description}</p>
      )}
    </Reveal>
  );
}
