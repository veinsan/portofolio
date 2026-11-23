import type { Metadata } from "next";
import Btn from "@/components/Btn";
import Img from "@/components/Img";
import Rings from "@/components/Rings";
import Skills from "@/components/Skills";
import { Education, Roles } from "@/components/Timeline";
import { activity } from "@/lib/activity";
import { now, organizations, portrait, principles, site, story } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description: "Riantama Putra studies Information Systems and Technology at ITB, assists at the AI Laboratory of STEI ITB, and builds leak-free models behind tested APIs.",
};

export default function About() {
  return (
    <>
      <div className="page-top">
        <Rings className="page-top__rings" />
        <div className="wide me">
          <div>
            <h1 className="display" data-split="lines" data-intro>Hi, I’m {site.first}.</h1>
            <p className="subtitle hero__sub" data-split="lines" data-intro data-delay="0.1">ITB, class of 2028, in Bandung.</p>
            <div className="me__text">{story.map((t) => <p key={t}>{t}</p>)}</div>
            <div className="me__actions">
              {site.cvUrl && <Btn href={site.cvUrl} icon="download">Download CV</Btn>}
              <Btn href={site.github} tone="line" external>GitHub</Btn>
              <Btn href={site.linkedin} tone="line" external>LinkedIn</Btn>
            </div>
          </div>
          <figure className="me__photo">
            <div className="me__frame">
              <Img src={portrait.src} srcSet={`${portrait.small} 600w, ${portrait.src} 960w`} sizes="(min-width: 900px) 34vw, 90vw" width={960} height={1200} alt={portrait.alt} />
            </div>
            <figcaption className="label">Kuala Lumpur, after dark</figcaption>
          </figure>
        </div>
      </div>

      <section aria-labelledby="rules-title">
        <div className="wide rules__head">
          <h2 id="rules-title" className="h2">What I won’t compromise on</h2>
        </div>
        <div>
          {principles.map((r) => (
            <div className="rule" key={r.word}>
              <div className="wide rule__in">
                <h3 className="rule__word">{r.word}</h3>
                <div>
                  <p className="rule__text">{r.text}</p>
                  <p className="rule__avoid label">Rules out<b>{r.avoids}</b></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section wide" aria-labelledby="now-title">
        <div className="head">
          <h2 id="now-title" className="h2">These days</h2>
        </div>
        <ul className="now">
          {now.map((n) => (
            <li key={n.title}>
              <h3 className="h3">{n.title}</h3>
              <p>{n.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="experience" className="section column" aria-labelledby="roles-title">
        <h2 id="roles-title" className="h3 tl-title">Experience</h2>
        <Roles />
        <h2 className="h3 tl-title">Education &amp; certification</h2>
        <Education />
      </section>

      <section className="section column" aria-labelledby="orgs-title">
        <h2 id="orgs-title" className="h3 tl-title">Committees &amp; organizations</h2>
        <ul className="orgs">
          {organizations.map((o) => (
            <li key={`${o.role}-${o.org}`}>
              <div>
                <b>{o.role}</b>
                <span>{o.org}</span>
              </div>
              <p className="meta">{o.when}</p>
            </li>
          ))}
        </ul>
      </section>

      <Skills />

      <section className="section wide" aria-labelledby="activity-title">
        <div className="head">
          <h2 id="activity-title" className="h2">On GitHub</h2>
          <p className="lead head__aside">{activity.total} contributions in the year to {activity.taken}.</p>
        </div>
        <div className="activity__scroll">
          <div className="activity__grid" aria-hidden="true">
            {[...activity.levels].map((l, i) => <i key={i} data-l={l} />)}
          </div>
        </div>
        <p className="activity__foot">
          <span>One square per day. The stronger the colour, the busier the day.</span>
          <a className="ulink" href={site.github} target="_blank" rel="noopener noreferrer">github.com/{site.githubUser}</a>
        </p>
      </section>
    </>
  );
}
