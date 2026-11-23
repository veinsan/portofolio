import type { Metadata } from "next";
import { Copy } from "@/components/Icons";
import Rings from "@/components/Rings";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Email, LinkedIn and GitHub for Riantama Putra, open to internships and collaborations in machine learning, data science and software engineering.",
};

const bare = (url: string) => url.replace(/^https:\/\/(www\.)?/, "").replace(/\/$/, "");

const rows = [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "LinkedIn", value: bare(site.linkedin), href: site.linkedin },
  { label: "GitHub", value: bare(site.github), href: site.github },
];

export default function Contact() {
  return (
    <div data-no-close>
      <header className="page-top">
        <Rings className="page-top__rings" />
        <div className="wide">
          <h1 className="page-title" data-split="lines" data-intro>Let’s talk.</h1>
          <p className="lead page-intro" data-split="lines" data-intro data-delay="0.12">
            Write to me by email, or find me on LinkedIn and GitHub. I’m in Bandung, open to internships, research and collaborations.
          </p>
        </div>
      </header>

      <ul className="contact wide">
        {rows.map((r) => (
          <li className="contact__row" key={r.label}>
            <span className="label label--muted">{r.label}</span>
            <a
              className="contact__value"
              href={r.href}
              {...(!r.href.startsWith("mailto:") && { target: "_blank", rel: "noopener noreferrer" })}
            >
              {r.value}
            </a>
            <button type="button" className="pill pill--line" data-copy={r.href.replace("mailto:", "")} data-copied={`${r.label} copied`}>
              <Copy />
              <span>
                Copy<span className="sr-only"> {r.label}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
