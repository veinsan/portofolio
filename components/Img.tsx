// next/image cannot emit a srcset in a static export (images are unoptimized), so the pre-sized WebP
// files are wired up by hand here.
import type { ComponentProps } from "react";
import type { Project } from "@/lib/data";

export default function Img({ alt, ...rest }: ComponentProps<"img"> & { alt: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img alt={alt} decoding="async" {...rest} />;
}

/** A project's cover, in both of its sizes. */
export function Cover({
  project,
  sizes,
  alt = "",
  lazy = true,
  className,
  style,
}: {
  project: Project;
  sizes: string;
  alt?: string;
  lazy?: boolean;
  className?: string;
  style?: ComponentProps<"img">["style"];
}) {
  if (!project.cover) return null;
  const [w, h] = project.cover;
  const base = `/projects/${project.slug}`;
  return (
    <Img
      src={`${base}.webp`}
      srcSet={`${base}-720.webp 720w, ${base}.webp ${w}w`}
      sizes={sizes}
      width={w}
      height={h}
      alt={alt}
      loading={lazy ? "lazy" : undefined}
      className={className}
      style={style}
    />
  );
}
