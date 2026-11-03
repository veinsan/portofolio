import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { site } from "@/lib/data";

// Shows the given photo from public/ when it exists; until then, a marked placeholder.
export default function Portrait({
  src,
  className = "",
  sizes = "33vw",
  priority = false,
  parallax,
}: {
  src: string;
  parallax?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const has = fs.existsSync(path.join(process.cwd(), "public", src));
  return (
    <div className={`portrait ${className}`} data-parallax={parallax}>
      {has ? (
        <Image src={src} alt={`Portrait of ${site.name}`} fill sizes={sizes} style={{ objectFit: "cover" }} {...(priority && { loading: "eager", fetchPriority: "high" })} />
      ) : (
        <div className="portrait__ph" role="img" aria-label={`Portrait of ${site.name} (placeholder)`}>
          <span>{site.initials}</span>
          <small>Photo placeholder</small>
        </div>
      )}
    </div>
  );
}
