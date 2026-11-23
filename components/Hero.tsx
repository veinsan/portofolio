// Type over rings on the left, the photo fading into the paper on the right. Scrolling scans the
// photo to black and white, and the pointer brings the colour back under it (motion/page.ts).
import { portrait, site } from "@/lib/data";
import Btn from "./Btn";
import { GitHub, LinkedIn, Mail } from "./Icons";
import Img from "./Img";
import Rings from "./Rings";

// Spoken as one line by screen readers, so the break keeps its space.
const [line1, line2] = site.title;
const SIZES = "(min-width: 768px) 48vw, 100vw";
const SRCSET = `${portrait.small} 600w, ${portrait.src} 960w`;

export default function Hero() {
  return (
    <section id="top" className="hero" data-hero aria-labelledby="hero-title">
      <div className="hero__sticky">
        <Rings />
        <div className="hero__photo" data-hero-photo>
          <div className="hero__shift">
            <Img src={portrait.src} srcSet={SRCSET} sizes={SIZES} width={960} height={1200} alt={portrait.alt} fetchPriority="high" />
            <Img src={portrait.src} srcSet={SRCSET} sizes={SIZES} width={960} height={1200} alt="" className="hero__bw" />
          </div>
          <span className="hero__scan" aria-hidden="true">
            <span className="label">Scan <b data-scan>0</b>%</span>
          </span>
        </div>

        <div className="hero__copy">
          <h1 id="hero-title" className="display hero__title" data-split="lines" data-intro>
            {line1} <br />
            {line2}
          </h1>
          <p className="subtitle hero__sub" data-split="lines" data-intro data-delay="0.12">{site.subtitle}</p>
          <p className="hero__lead" data-split="lines" data-intro data-delay="0.2">{site.lead}</p>
          <div className="hero__actions" data-reveal="fade" data-intro data-delay="0.35">
            <Btn href="/contact/" title="Contact">Get in touch</Btn>
            {site.cvUrl && <Btn href={site.cvUrl} tone="line" icon="download">Download CV</Btn>}
            <div className="hero__social">
              <a className="round" href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedIn /></a>
              <a className="round" href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GitHub /></a>
              <a className="round" href={`mailto:${site.email}`} aria-label="Email"><Mail /></a>
            </div>
          </div>
        </div>

        <div className="badge" aria-hidden="true">
          <svg className="badge__ring" viewBox="0 0 100 100" data-badge>
            <defs>
              <path id="badge-path" d="M50 11a39 39 0 1 1 0 78a39 39 0 1 1 0-78" />
            </defs>
            <text textLength="243" lengthAdjust="spacing">
              <textPath href="#badge-path" textLength="243" lengthAdjust="spacing">Validate / Train / Test / Ship /</textPath>
            </text>
          </svg>
          <span className="badge__core">{site.initials}</span>
        </div>

        <p className="cue label" aria-hidden="true">Keep scrolling<i /></p>
      </div>
    </section>
  );
}
