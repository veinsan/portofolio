// Thin rail with dots, serif roles, pill tags. Used on the home page and /about.
import { certifications, education, experience } from "@/lib/data";

export function Roles() {
  return (
    <ol className="tl">
      {experience.map((x) => (
        <li className="tl__item" key={`${x.role}-${x.org}`}>
          <div className="tl__head">
            <h3 className="h3">{x.role}</h3>
            <p className="meta">{x.when}</p>
          </div>
          <p className="tl__org">{x.org}</p>
          {x.place && <p className="tl__place">{x.place}</p>}
          <ul className="tl__points">{x.points.map((p) => <li key={p}>{p}</li>)}</ul>
          <ul className="tags">{x.tags.map((t) => <li key={t}>{t}</li>)}</ul>
        </li>
      ))}
    </ol>
  );
}

export function Education() {
  return (
    <ol className="tl">
      <li className="tl__item">
        <div className="tl__head">
          <h3 className="h3">{education.degree}</h3>
          <p className="meta">{education.when}</p>
        </div>
        <p className="tl__org">{education.school}</p>
        <p className="tl__place">GPA {education.gpa}</p>
      </li>
      {certifications.map((c) => (
        <li className="tl__item" key={c.title}>
          <div className="tl__head">
            <h3 className="h3">{c.title}</h3>
            <p className="meta">{c.when}</p>
          </div>
          <p className="tl__org">{c.issuer}</p>
          <p className="tl__place">Certification</p>
        </li>
      ))}
    </ol>
  );
}
