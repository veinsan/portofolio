import Btn from "@/components/Btn";
import Glow from "@/components/Glow";
import Portrait from "@/components/Portrait";
import { education, experience, faq, numbers, practices, projects, site } from "@/lib/data";

const placed = projects.filter((p) => !p.archive);
const featured = placed.filter((p) => p.featured);
const archive = projects.filter((p) => p.archive);
const events = [...new Set(placed.map((p) => p.event!))];
const wins = placed.filter((p) => /^(1st|2nd|3rd) Place/.test(p.place ?? ""));
const active = experience.filter((e) => e.now).length;

// Degree progress, computed at build time. shortcut: freezes at the last deploy, rebuild each semester.
const start = Date.parse(education.start), end = Date.parse(education.end);
const progress = Math.min(1, Math.max(0, (Date.now() - start) / (end - start)));
const year = Math.min(4, Math.floor(progress * 4) + 1);

// Pixel marks for the practice cards, 5x5, read row by row.
const marks = ["0010001010100010101000100", "0010001110111110111000100", "1010101010101010101010101", "1000101010001000101010001"];

const Arrow = () => (
  <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M5 13 13 5M6.5 5H13v6.5" />
  </svg>
);

export default function Home() {
  return (
    <>
      {/* Hero: full-bleed card, display headline bottom-left, status card bottom-right. */}
      <section id="top" className="hero" aria-labelledby="hero-h">
        <div className="hero__card">
          <Glow seed="riantama" live band={0.3} parallax={0.1} className="hero__bg" />
          <div className="hero__copy">
            <p className="hero__kicker">{site.headline}</p>
            <h1 id="hero-h" className="hero__title">
              <span className="sr-only">{site.name}, </span>
              <span className="hero__line" data-split="lines" data-intro>AI &amp; ML</span>
              <span className="hero__line" data-split="lines" data-intro data-delay="0.08">Engineer</span>
            </h1>
          </div>
          <a className="status" href="#now">
            <span className="status__body">
              <span className="status__label">Right now</span>
              <span className="status__value">AI Lab Assistant at STEI ITB. Open to internships.</span>
            </span>
            <Portrait src={site.photo.portrait} className="status__photo" sizes="10rem" priority />
          </a>
        </div>
      </section>

      {/* Statement + event strip */}
      <section className="statement" aria-label="Introduction">
        <p className="statement__text" data-ink>
          I’m Riantama, an AI and ML engineer studying Information Systems and Technology at ITB. I
          build vision models, tabular ML and the systems that keep them reliable. In 2026 that work
          won four data science competitions, two of them in first place.
        </p>
        <div className="strip" aria-label="2026 competitions">
          <ul className="strip__track" data-marquee>
            {[...events, ...events].map((e, i) => (
              <li key={i} aria-hidden={i >= events.length || undefined}>{e}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Work: 2x2 cards with a glass panel that opens on hover */}
      <section id="work" className="sec" aria-labelledby="work-h">
        <div className="head">
          <h2 id="work-h" className="h2" data-split="lines">Work<br />that won.</h2>
          <p className="label-meta"><span className="paren">( Winners )</span><br />Vision, tabular, ranking</p>
        </div>
        <ul className="work">
          {featured.map((p) => (
            <li key={p.slug}>
              <a className="wcard" href={`/work/${p.slug}/`} data-title={p.title}>
                <Glow seed={p.slug} parallax={0.06} className="wcard__img" />
                <span className="wcard__panel">
                  <span className="wcard__row">
                    <span className="wcard__title">{p.title}</span>
                    <span className="wcard__meta">{p.month ?? "2026"}<br />{p.place}, {p.event}</span>
                  </span>
                  <span className="wcard__cta">View case <Arrow /></span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Right now: Vantra's live table */}
      <section id="now" className="sec" aria-labelledby="now-h">
        <div className="head">
          <h2 id="now-h" className="h2" data-split="lines">Where I am<br />right now.</h2>
          <p className="label-meta"><span className="paren">( {active} active )</span><br />Updated Nov 2026</p>
        </div>
        <ol className="live">
          {experience.map((e) => (
            <li className="live__row" key={e.role + e.org}>
              <div className="live__name">
                <h3>{e.role}</h3>
                <p>{e.org}</p>
              </div>
              <p className="live__cat">{e.type}</p>
              <div className="live__progress">
                <p className="live__pmeta"><span>{e.now ? "Ongoing" : "Completed"}</span></p>
                <span className={`live__bar${e.now ? " is-live" : ""}`}><i /></span>
              </div>
              <p className="live__end">{e.when}</p>
              <p className="live__note">{e.note}</p>
            </li>
          ))}
          <li className="live__row">
            <div className="live__name">
              <h3>{education.degree}</h3>
              <p>{education.school}, GPA {education.gpa}</p>
            </div>
            <p className="live__cat">Degree</p>
            <div className="live__progress">
              <p className="live__pmeta"><span>Year {year} of 4</span><span>{Math.round(progress * 100)}%</span></p>
              <span className="live__bar" role="img" aria-label={`Degree ${Math.round(progress * 100)}% complete`}><i style={{ width: `${progress * 100}%` }} /></span>
            </div>
            <p className="live__end">Graduates Aug 2028</p>
          </li>
        </ol>
      </section>

      {/* Practices: horizontal card track */}
      <section className="sec" aria-labelledby="do-h">
        <div className="head">
          <h2 id="do-h" className="h2" data-split="lines">What I<br />actually do.</h2>
          <p className="label-meta"><span className="paren">( Four practices )</span><br />One engineer</p>
        </div>
        <div className="track-wrap">
          <ul className="track" data-track tabIndex={0} aria-label="Practices, scroll sideways">
            {practices.map((p, i) => (
              <li className="pcard" key={p.title}>
                <span className="paren pcard__num">( {String(i + 1).padStart(3, "0")} )</span>
                <span className="pixel" aria-hidden="true">
                  {[...marks[i % marks.length]].map((b, j) => <i key={j} className={b === "1" ? "on" : undefined} />)}
                </span>
                <span className="pcard__body">
                  <h3 className="pcard__title">{p.title}</h3>
                  <p className="pcard__text">{p.text}</p>
                  <p className="pcard__proof">{p.proof}</p>
                </span>
              </li>
            ))}
          </ul>
          <button type="button" className="track__next" data-track-next aria-label="Next practices">
            <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M4 9h10M10 5l4 4-4 4" /></svg>
          </button>
        </div>
      </section>

      {/* The record: centered head + wide photo frame */}
      <section className="sec reel" aria-labelledby="reel-h">
        <p className="label-meta reel__kicker">The record</p>
        <h2 id="reel-h" className="h1 reel__title" data-split="lines">Ten competitions<br />in one year.</h2>
        <div className="reel__frame">
          <Portrait src={site.photo.wide} className="reel__photo" sizes="92vw" parallax={0.07} />
          <span className="reel__pill">
            <span className="reel__dot" aria-hidden="true" />
            {site.name}
            <span className="reel__sep" aria-hidden="true" />
            <span className="reel__muted">Bandung</span>
          </span>
        </div>
      </section>

      {/* Achievements: Vantra's testimonial row, filled with results */}
      <section id="achievements" className="sec" aria-labelledby="ach-h">
        <div className="head">
          <h2 id="ach-h" className="h2" data-split="lines">What the<br />leaderboards say.</h2>
          <p className="label-meta"><span className="paren">( {wins.length} wins / {placed.length} )</span><br />National and international</p>
        </div>
        <div className="track-wrap">
          <ul className="track track--ach" data-track tabIndex={0} aria-label="Achievements, scroll sideways">
            <li className="acard acard--score">
              <span className="acard__score"><b>{wins.length}</b><small>/{placed.length}</small></span>
              <span className="acard__lead">{wins.length} wins across {placed.length} data science competitions in 2026, two of them first places.</span>
              <span className="acard__foot">
                <span className="medals" aria-hidden="true">
                  {wins.map((w) => <i key={w.slug}>{w.place!.slice(0, 3)}</i>)}
                </span>
                <span className="acard__footlabel">{numbers[0].label}</span>
              </span>
            </li>
            {placed.map((p) => (
              <li key={p.slug}>
                <a className="acard" href={`/work/${p.slug}/`} data-title={p.title} data-preview={p.media?.src}>
                  <span className="acard__top">
                    <span className="acard__place">{p.place}</span>
                    <span className="acard__event">{p.event}{p.level && <>, {p.level}</>}</span>
                  </span>
                  <span className="acard__quote">{p.summary}</span>
                  <span className="acard__by">
                    <b>{p.title}</b>
                    <small>{[p.month, p.rank].filter(Boolean).join(". ") || "2026"}</small>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <button type="button" className="track__next" data-track-next aria-label="Next achievements">
            <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M4 9h10M10 5l4 4-4 4" /></svg>
          </button>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="sec faq" aria-labelledby="faq-h">
        <h2 id="faq-h" className="h2" data-split="lines">Before you<br />reach out.</h2>
        <div className="faq__list">
          {faq.map((f, i) => (
            <details className="faq__item" key={f.q} open={i === 0}>
              <summary className="faq__q">{f.q}<span className="faq__icon" aria-hidden="true" /></summary>
              <p className="faq__a">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Earlier projects: Vantra's journal (two image cards, then the index) */}
      <section className="sec" aria-labelledby="more-h">
        <div className="head">
          <h2 id="more-h" className="h2" data-split="lines">Earlier<br />projects.</h2>
        </div>
        <ul className="jcards">
          {archive.slice(0, 2).map((p) => (
            <li key={p.slug}>
              <a className="jcard" href={`/work/${p.slug}/`} data-title={p.title}>
                <Glow seed={p.slug} parallax={0.06} className="jcard__img" />
                <span className="jcard__text">
                  <span className="jcard__meta">{p.category}<span>{p.event}</span></span>
                  <span className="jcard__title">{p.summary}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
        <ul className="index">
          {archive.map((p) => (
            <li key={p.slug}>
              <a className="index__row" href={`/work/${p.slug}/`} data-title={p.title} data-preview={p.media?.src}>
                <span className="index__cat">{p.category}</span>
                <span className="index__title">{p.title}</span>
                <span className="index__meta">{p.metric ? `${p.metric.value} ${p.metric.label}` : p.event}</span>
                <Arrow />
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA: full-bleed dark section */}
      <section id="contact" className="cta" aria-labelledby="cta-h">
        <Glow seed="contact" live band={0.78} parallax={0.08} className="cta__bg" />
        <div className="cta__inner">
          <h2 id="cta-h" className="cta__title" data-split="lines">Build what’s next<br />together</h2>
          <p className="cta__text">Internships, research, or a teammate for the next competition.</p>
          <div className="cta__actions">
            <Btn href={`mailto:${site.email}`}>Email me</Btn>
            <Btn href={site.linkedin} tone="dark" external>LinkedIn</Btn>
          </div>
          <p className="cta__mail">{site.email}</p>
        </div>
      </section>
    </>
  );
}
