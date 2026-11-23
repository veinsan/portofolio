import type { CSSProperties } from "react";
import { skills, tools } from "@/lib/data";

export default function Skills({ id = "skills" }: { id?: string }) {
  return (
    <section id={id} className="section" aria-labelledby={`${id}-title`}>
      <div className="wide">
        <div className="head">
          <h2 id={`${id}-title`} className="h2">Technical skills</h2>
        </div>
        <div className="skills">
          {skills.map((s) => (
            <div className="skills__group" key={s.group}>
              <h3 className="h3 skills__name">{s.group}</h3>
              <ul className="tags">{s.items.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** A slanted band of tools that follows the scroll (motion/page.ts). Two copies make the loop. */
export function Marquee() {
  return (
    <div className="marquee" aria-hidden="true" data-marquee>
      <div className="marquee__band">
        <div className="marquee__track" data-marquee-track>
          {[0, 1].map((k) => (
            <div className="marquee__set" key={k}>
              {tools.map((t) => (
                <span className="marquee__item" key={t.name}>
                  {t.icon && <i className="marquee__icon" style={{ "--icon": `url(/icons/${t.icon}.svg)` } as CSSProperties} />}
                  {t.name}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
