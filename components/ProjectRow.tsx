// One project as a ruled row. Shared by the home list view and /work.
import Link from "next/link";
import type { Project } from "@/lib/data";

export default function ProjectRow({ project: p, n, onPoint }: { project: Project; n: number; onPoint?: () => void }) {
  return (
    <li>
      <Link prefetch={false} className="prow" href={`/work/${p.slug}/`} data-title={p.title} onPointerEnter={onPoint} onFocus={onPoint}>
        <span className="prow__num">{String(n).padStart(2, "0")}</span>
        <span className="prow__title">{p.title}</span>
        <span className="prow__year meta">{p.year}</span>
        <span className="prow__kind">{p.kind}</span>
        <span className="prow__text">{p.summary}</span>
        {p.badge && <span className="prow__badge meta">{p.badge}</span>}
      </Link>
    </li>
  );
}
