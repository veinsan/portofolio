// Vantra button: the label rolls up to a copy of itself, the arrow leaves top-right as a second
// one arrives from bottom-left. Works as a link; `light` or `dark` fill.
import Link from "next/link";

const Arrow = () => (
  <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M5 13 13 5M6.5 5H13v6.5" />
  </svg>
);

export default function Btn({
  href,
  children,
  tone = "light",
  external = false,
  title,
}: {
  href: string;
  children: string;
  tone?: "light" | "dark";
  external?: boolean;
  title?: string;
}) {
  const inner = (
    <>
      <span className="btn__label">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
      <span className="btn__chip" aria-hidden="true">
        <Arrow />
        <Arrow />
      </span>
    </>
  );
  const cls = `btn btn--${tone}`;
  if (external || href.startsWith("mailto:"))
    return (
      <a className={cls} href={href} {...(external && { target: "_blank", rel: "noopener noreferrer" })}>
        {inner}
      </a>
    );
  return (
    <Link prefetch={false} className={cls} href={href} data-title={title}>
      {inner}
    </Link>
  );
}
