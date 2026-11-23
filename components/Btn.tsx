// Pill link. Internal pages go through next/link so the page transition runs.
import Link from "next/link";
import { Arrow, Download } from "./Icons";

type Tone = "ink" | "line" | "soft";
type Icon = "arrow" | "download" | "none";

export default function Btn({
  href,
  children,
  tone = "ink",
  icon = "arrow",
  external = false,
  title,
  className = "",
}: {
  href: string;
  children: string;
  tone?: Tone;
  icon?: Icon;
  external?: boolean;
  title?: string;
  className?: string;
}) {
  const cls = `pill${tone === "ink" ? "" : ` pill--${tone}`} ${className}`.trim();
  const inner = (
    <>
      <span>{children}</span>
      {icon === "arrow" && <Arrow />}
      {icon === "download" && <Download />}
    </>
  );
  if (external || icon === "download" || href.startsWith("mailto:"))
    return (
      <a
        className={cls}
        href={href}
        data-magnetic
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        {...(icon === "download" && { download: "Riantama-Putra-CV.pdf" })}
      >
        {inner}
      </a>
    );
  return (
    <Link prefetch={false} className={cls} href={href} data-title={title ?? children} data-magnetic>
      {inner}
    </Link>
  );
}
