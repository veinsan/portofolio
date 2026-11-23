// The close (rings, one line, three pills) and the oversized kinetic name. On every page.
// Pages with [data-no-close] keep only the name bar.
import Link from "next/link";
import { nav, site } from "@/lib/data";
import Btn from "./Btn";
import { ArrowUp, Copy } from "./Icons";
import Rings from "./Rings";
import Roll from "./Roll";

const links = [{ label: "Home", href: "/" }, ...nav.slice(0, 2), { label: "Contact", href: "/contact/" }];

export default function Footer() {
  return (
    <footer className="footer">
      <section className="close" id="contact" aria-labelledby="close-title">
        <Rings />
        <div className="close__in">
          <h2 id="close-title" className="display close__title">Bring me the messy data.</h2>
          <p className="close__text">Open to internships, research and collaborations. The dataset nobody trusts and the model still stuck in a notebook are both welcome.</p>
          <div className="close__row">
            <Btn href={`mailto:${site.email}`} tone="soft">Send an email</Btn>
            <button type="button" className="pill pill--soft" data-copy={site.email} data-copied="Email copied" data-magnetic>
              <span>Copy email</span>
              <Copy />
            </button>
            <Btn href={site.linkedin} tone="soft" external>LinkedIn</Btn>
          </div>
          {site.cvUrl && (
            <div className="close__row">
              <Btn href={site.cvUrl} icon="download">Download CV</Btn>
            </div>
          )}
        </div>
      </section>

      <div className="foot">
        <p className="foot__name" aria-hidden="true" data-kinetic>
          {[...site.first].map((ch, i) => <span key={i} className="foot__ch">{ch}</span>)}
        </p>
        <div className="foot__bar">
          <p>© 2026 {site.name}</p>
          <nav className="foot__nav" aria-label="Footer">
            {links.map((n) => (
              <Link prefetch={false} key={n.href} href={n.href} data-title={n.label}><Roll>{n.label}</Roll></Link>
            ))}
          </nav>
          <button type="button" className="foot__top" data-top>
            Back to top
            <ArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
}
