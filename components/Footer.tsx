import Link from "next/link";
import { nav, site } from "@/lib/data";

// Vantra footer: big mark left, large nav rows right, about line, secondary links, bottom bar.
export default function Footer() {
  return (
    <footer className="foot">
      <div className="foot__top">
        <p className="foot__mark" aria-hidden="true">RP</p>
        <ul className="foot__nav">
          <li><Link prefetch={false} href="/">Home</Link></li>
          {nav.map((n) => (
            <li key={n.href}><a href={`/${n.href}`}>{n.label}</a></li>
          ))}
        </ul>
      </div>
      <div className="foot__mid">
        <p className="foot__about">
          {site.name} is an AI and software engineer, data analyst and scientist, studying Information Systems and Technology at ITB,
          working on computer vision, tabular ML and the backends that serve them.
        </p>
        <ul className="foot__links">
          <li><a className="utility" href={site.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
          <li><a className="utility" href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          <li><a className="utility" href={`mailto:${site.email}`}>Email</a></li>
        </ul>
      </div>
      <div className="foot__bar">
        <p>© 2026 {site.name}. Set in Boska, Albert Sans and JetBrains Mono.</p>
        <p>{site.location}</p>
      </div>
    </footer>
  );
}
