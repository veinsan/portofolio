// The sticky band over a grid: who, two figures, photos, what now. Vertical scroll pans it.
import { intro, moments, site } from "@/lib/data";
import Btn from "./Btn";
import Img from "./Img";

export default function AboutBand() {
  return (
    <section id="about" className="pan about" data-pan aria-labelledby="about-title">
      <div className="pan__sticky" data-pan-sticky>
        <span className="grid-bg" aria-hidden="true" data-pan-grid />
        <div className="pan__top" aria-hidden="true">
          <span className="label">About</span>
          <span className="pan__hint label">Scroll to explore<span className="pan__bar"><i data-pan-bar /></span></span>
        </div>
        <div className="pan__view">
          <div className="pan__track" data-pan-track>
            <div className="panel panel--intro">
              <p className="label label--muted">01 / Who</p>
              <h2 id="about-title" className="display panel__title">{intro.headline}</h2>
              <p className="lead panel__text">{intro.text}</p>
            </div>

            <div className="panel panel--stats">
              <dl className="stats">
                {intro.stats.map((s) => (
                  <div key={s.label}>
                    <dt className="label">{s.label}</dt>
                    <dd>{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {moments.map((m) => (
              <figure className="shot" key={m.src}>
                <Img src={m.src} width={680} height={907} alt={m.alt} loading="lazy" />
                <figcaption>{m.label}</figcaption>
              </figure>
            ))}

            <div className="panel panel--intro">
              <p className="label label--muted">02 / Next</p>
              <h3 className="display panel__title">{intro.currently.headline}</h3>
              <p className="lead panel__text">
                {intro.currently.text} Reach me through{" "}
                <a className="ulink" href={`mailto:${site.email}`}>email</a>,{" "}
                <a className="ulink" href={site.github} target="_blank" rel="noopener noreferrer">GitHub</a> or{" "}
                <a className="ulink" href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>.
              </p>
              <div className="panel__actions">
                {site.cvUrl && <Btn href={site.cvUrl} tone="line" icon="download">Download CV</Btn>}
                <Btn href="/about/" tone="line" title="About">The longer story</Btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
