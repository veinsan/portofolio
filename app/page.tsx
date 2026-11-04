import Image from "next/image";
import Btn from "@/components/Btn";
import Glow from "@/components/Glow";
import Portrait from "@/components/Portrait";
import { education, experience, faq, moments, numbers, organizations, practices, projects, site, skills } from "@/lib/data";

const placed = projects.filter((p) => !p.archive);
const featured = placed.filter((p) => p.featured);
const others = projects.filter((p) => p.archive);
const events = [...new Set(placed.map((p) => p.event!))];
const wins = placed.filter((p) => /^(1st|2nd|3rd) Place/.test(p.place ?? ""));
const active = experience.filter((e) => e.now).length;
const extraSkills = skills.filter((g) => g.group === "Languages" || g.group === "Frontend and tools");

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
      {/* Hero: Vantra's dark card, Jason's identity-first split */}
      <section id="top" className="hero" aria-labelledby="hero-h">
        <div className="hero__card">
          <Glow seed="riantama" live band={0.3} parallax={0.1} className="hero__bg" />
          <div className="hero__copy">
            <p className="hero__kicker mono">( {site.headline} )</p>
            <h1 id="hero-h" className="hero__title">
              <span className="sr-only">{site.name}, </span>
              <span className="hero__line" data-split="lines" data-intro>AI and Software Engineer</span>
              <span className="hero__line hero__line--alt" data-split="lines" data-intro data-delay="0.08">Data Analyst and Scientist</span>
            </h1>
            <p className="hero__tag" data-split="lines" data-intro data-delay="0.16">Building models that hold up on data they haven’t seen.</p>
            <p className="hero__bio">Information Systems and Technology at ITB, class of 2028. Computer vision, tabular ML and the backends that serve them.</p>
            <div className="hero__actions">
              <Btn href={`mailto:${site.email}`}>Email me</Btn>
              {site.cvUrl && <Btn href={site.cvUrl} tone="dark" external>Download CV</Btn>}
              <Btn href={site.github} tone="dark" external>GitHub</Btn>
              <Btn href={site.linkedin} tone="dark" external>LinkedIn</Btn>
            </div>
          </div>
          <div className="hero__side">
            <Portrait src={site.photo.portrait} className="hero__photo" sizes="(min-width: 900px) 32vw, 100vw" priority />
            <a className="status" href="#now">
              <span className="status__label mono">Right now</span>
              <span className="status__value">AI Lab Assistant at STEI ITB. Open to internships.</span>
            </a>
          </div>
        </div>
      </section>

      {/* About: Jason's named statement + facts, Vantra's strip */}
      <section id="about" className="sec about" aria-labelledby="about-h">
        <p className="label mono">( About )</p>
        <div className="about__grid">
          <h2 id="about-h" className="about__title" data-split="lines">{`${site.name}, building models that hold up.`}</h2>
          <div className="about__copy">
            <p data-ink>
              I’m an AI and software engineer and data scientist studying Information Systems and Technology at ITB. Most of my
              work starts on a leaderboard: vision models on DINOv3, gradient-boosted ensembles on messy
              tables, and the validation that keeps a private score honest.
            </p>
            <p>
              The other half is getting models out of the notebook. I lead a backend team on an internal
              ERP, assist in ITB’s AI Laboratory, and I am exploring agentic AI next.
            </p>
            <ul className="facts">
              {numbers.map((n) => (
                <li key={n.label}><b>{n.value}</b><span className="mono">{n.label}</span></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="strip" aria-label="2026 competitions">
          <ul className="strip__track" data-marquee>
            {[...events, ...events].map((e, i) => (
              <li key={i} aria-hidden={i >= events.length || undefined}>{e}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Moments: Jason's captioned photo strip, placeholders until photos arrive */}
      <section className="sec moments pan" aria-labelledby="mom-h" data-hpan>
        <div className="head">
          <h2 id="mom-h" className="h2" data-split="lines">Moments<br />from the road.</h2>
          <p className="label-meta mono"><span className="paren">( Photos )</span><br />Keep scrolling</p>
        </div>
        <ul className="moments__track" data-hpan-track aria-label="Competition moments">
          {moments.map((m, i) => (
            <li className="moment" key={m.caption}>
              <figure>
                {m.src ? (
                  <Image src={m.src} alt={m.caption} fill sizes="(min-width: 768px) 30vw, 80vw" style={{ objectFit: "cover" }} />
                ) : (
                  <div className="portrait__ph moment__ph" role="img" aria-label={`${m.caption} (photo placeholder)`}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <small>Photo placeholder</small>
                  </div>
                )}
                <figcaption className="moment__cap mono">{m.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      {/* Work that won: Vantra's 2x2 */}
      <section id="work" className="sec" aria-labelledby="work-h">
        <div className="head">
          <h2 id="work-h" className="h2" data-split="lines">Work<br />that won.</h2>
          <p className="label-meta mono"><span className="paren">( Winners )</span><br />Vision, tabular, ranking</p>
        </div>
        <ul className="work">
          {featured.map((p) => (
            <li key={p.slug}>
              <a className="wcard" href={`/work/${p.slug}/`} data-title={p.title}>
                <Glow seed={p.slug} parallax={0.06} className="wcard__img" />
                <span className="wcard__panel">
                  <span className="wcard__row">
                    <span className="wcard__title">{p.title}</span>
                    <span className="wcard__meta mono">{p.month ?? "2026"}<br />{p.place}, {p.event}</span>
                  </span>
                  <span className="wcard__cta">View case <Arrow /></span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Leaderboards: Vantra's testimonial row, filled with results */}
      <section id="achievements" className="sec pan" aria-labelledby="ach-h" data-hpan>
        <div className="head">
          <h2 id="ach-h" className="h2" data-split="lines">What the<br />leaderboards say.</h2>
          <p className="label-meta mono"><span className="paren">( {wins.length} wins / {placed.length} )</span><br />National and international</p>
        </div>
        <div className="track-wrap">
          <ul className="track track--ach" data-hpan-track aria-label="Achievements">
            <li className="acard acard--score">
              <span className="acard__score"><b>{wins.length}</b><small>/{placed.length}</small></span>
              <span className="acard__lead">{wins.length} wins across {placed.length} data science competitions in 2026, two of them first places.</span>
              <span className="acard__foot">
                <span className="medals" aria-hidden="true">
                  {wins.map((w) => <i key={w.slug}>{w.place!.slice(0, 3)}</i>)}
                </span>
                <span className="acard__footlabel mono">{numbers[0].label}</span>
              </span>
            </li>
            {placed.map((p) => (
              <li key={p.slug}>
                <a className="acard" href={`/work/${p.slug}/`} data-title={p.title}>
                  <span className="acard__top">
                    <span className="acard__place">{p.place}</span>
                    <span className="acard__event mono">{p.event}{p.level && <>, {p.level}</>}</span>
                  </span>
                  <span className="acard__quote">{p.summary}</span>
                  <span className="acard__by">
                    <b>{p.title}</b>
                    <small className="mono">{[p.month, p.rank].filter(Boolean).join(". ") || "2026"}</small>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Projects: Athilla's list with a sticky preview */}
      <section id="projects" className="sec" aria-labelledby="proj-h">
        <div className="head">
          <h2 id="proj-h" className="h2" data-split="lines">Projects beyond<br />the leaderboard.</h2>
          <p className="label-meta mono"><span className="paren">( {others.length} projects )</span><br />Course, full stack, ML</p>
        </div>
        <div className="proj" data-proj>
          <ol className="proj__list">
            {others.map((p, i) => (
              <li key={p.slug}>
                <a className="prow" href={`/work/${p.slug}/`} data-title={p.title} data-pv={i} aria-current={i === 0 ? "true" : undefined}>
                  <span className="prow__top">
                    <span className="prow__title">{p.title}<Arrow /></span>
                    <span className="prow__meta mono">{[p.category, p.course].filter(Boolean).join(", ")}</span>
                  </span>
                  <span className="prow__sum">{p.summary}</span>
                  <span className="prow__result mono">{p.metric ? `${p.metric.value} ${p.metric.label}` : p.event}</span>
                </a>
              </li>
            ))}
          </ol>
          <div className="proj__preview" aria-hidden="true">
            {others.map((p, i) => (
              <figure className="pv" data-on={i === 0 || undefined} key={p.slug}>
                {p.image ? (
                  <Image src={p.image} alt="" fill sizes="40vw" style={{ objectFit: "cover" }} />
                ) : (
                  <Glow seed={`pv-${p.slug}`} className="pv__glow" />
                )}
                <figcaption className="pv__cap mono">{p.image ? p.title : `${p.title}, preview placeholder`}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Right now: Vantra's live table, then organizations */}
      <section id="now" className="sec" aria-labelledby="now-h">
        <div className="head">
          <h2 id="now-h" className="h2" data-split="lines">Where I am<br />right now.</h2>
          <p className="label-meta mono"><span className="paren">( {active} active )</span><br />Updated Nov 2026</p>
        </div>
        <ol className="live">
          {experience.map((e) => (
            <li className="live__row" key={e.role + e.org}>
              <div className="live__name">
                <h3>{e.role}</h3>
                <p>{e.org}</p>
              </div>
              <p className="live__cat mono">{e.type}</p>
              <div className="live__progress">
                <p className="live__pmeta mono"><span>{e.now ? "Ongoing" : "Completed"}</span></p>
                <span className={`live__bar${e.now ? " is-live" : ""}`}><i /></span>
              </div>
              <p className="live__end mono">{e.when}</p>
              <p className="live__note">{e.note}</p>
            </li>
          ))}
          <li className="live__row">
            <div className="live__name">
              <h3>{education.degree}</h3>
              <p>{education.school}, GPA {education.gpa}</p>
            </div>
            <p className="live__cat mono">Degree</p>
            <div className="live__progress">
              <p className="live__pmeta mono"><span>Year {year} of 4</span><span>{Math.round(progress * 100)}%</span></p>
              <span className="live__bar" role="img" aria-label={`Degree ${Math.round(progress * 100)}% complete`}><i style={{ width: `${progress * 100}%` }} /></span>
            </div>
            <p className="live__end mono">Graduates Aug 2028</p>
          </li>
        </ol>
        <div className="orgs">
          <h3 className="orgs__title">Organizations and committees</h3>
          <ul className="orgs__list">
            {organizations.map((o) => (
              <li key={o.role + o.org}>
                <span className="orgs__role">{o.role}<span>, {o.org}</span></span>
                <span className="orgs__when mono">{o.when}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Practices with their tools */}
      <section id="skills" className="sec pan" aria-labelledby="do-h" data-hpan>
        <div className="head">
          <h2 id="do-h" className="h2" data-split="lines">What I<br />actually do.</h2>
          <p className="label-meta mono"><span className="paren">( Four practices )</span><br />And the tools behind them</p>
        </div>
        <div className="track-wrap">
          <ul className="track" data-hpan-track aria-label="Practices">
            {practices.map((p, i) => (
              <li className="pcard" key={p.title}>
                <span className="paren pcard__num mono">( {String(i + 1).padStart(3, "0")} )</span>
                <span className="pixel" aria-hidden="true">
                  {[...marks[i % marks.length]].map((b, j) => <i key={j} className={b === "1" ? "on" : undefined} />)}
                </span>
                <span className="pcard__body">
                  <h3 className="pcard__title mono">{p.title}</h3>
                  <p className="pcard__text">{p.text}</p>
                  <ul className="tags" aria-label={`${p.title} tools`}>{p.tools.map((t) => <li key={t}>{t}</li>)}</ul>
                  <p className="pcard__proof mono">{p.proof}</p>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="sec sec--tight">
        <dl className="also">
          {extraSkills.map((g) => (
            <div key={g.group}>
              <dt className="mono">{g.group}</dt>
              <dd>{g.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* FAQ */}
      <section id="faq" className="sec faq" aria-labelledby="faq-h">
        <h2 id="faq-h" className="h2" data-split="lines">Before you<br />reach out.</h2>
        <div className="faq__list">
          {faq.map((f, i) => (
            <details className="faq__item" key={f.q} open={i === 0}>
              <summary className="faq__q">{f.q}<span className="faq__icon" aria-hidden="true" /></summary>
              <div className="faq__body"><p className="faq__a">{f.a}</p></div>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="cta" aria-labelledby="cta-h">
        <Glow seed="contact" live band={0.78} parallax={0.08} className="cta__bg" />
        <div className="cta__inner">
          <h2 id="cta-h" className="cta__title" data-split="lines">Build what’s next<br />together</h2>
          <p className="cta__text">Internships, research, or a teammate for the next competition.</p>
          <div className="cta__actions">
            <Btn href={`mailto:${site.email}`}>Email me</Btn>
            {site.cvUrl && <Btn href={site.cvUrl} tone="dark" external>Download CV</Btn>}
            <Btn href={site.linkedin} tone="dark" external>LinkedIn</Btn>
          </div>
          <p className="cta__mail mono">{site.email}</p>
        </div>
      </section>
    </>
  );
}
