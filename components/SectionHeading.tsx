import Reveal from "@/components/Reveal";

type Props = {
  index: string;
  label: string;
  title: string;
  description?: string;
};

export default function SectionHeading({ index, label, title, description }: Props) {
  return (
    <Reveal className="mb-12 sm:mb-16">
      <p className="mb-3 font-mono text-[13px] tracking-widest text-accent-mid uppercase">
        <span className="text-faint">{index} /</span> {label}
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
