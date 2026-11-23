// How I got here: a path winding inward across the rings, drawn by scroll (motion/page.ts).
import { journey } from "@/lib/data";

const C = 300;
const OUTER = 268;
const INNER = 70;
const TURNS = 1.4;
const SAMPLES = 220;

const pts = Array.from({ length: SAMPLES + 1 }, (_, i) => {
  const t = i / SAMPLES;
  const a = Math.PI * 0.8 + t * TURNS * Math.PI * 2;
  const r = OUTER + (INNER - OUTER) * t;
  return { x: +(C + r * Math.cos(a)).toFixed(2), y: +(C + r * Math.sin(a)).toFixed(2), a };
});
const d = pts.map((p, i) => `${i ? "L" : "M"}${p.x} ${p.y}`).join("");

// Milestones sit at equal lengths along the path, which is what the drawing follows.
const lengths = [0];
for (let i = 1; i < pts.length; i++) lengths.push(lengths[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y));
const nodes = journey.map((_, i) => {
  const want = (i / (journey.length - 1)) * lengths[lengths.length - 1];
  const at = lengths.findIndex((l) => l >= want - 0.01);
  const p = pts[at < 0 ? pts.length - 1 : at];
  // Labels sit on the inner side of the path and grow away from their dot.
  const [inX, inY] = [-Math.cos(p.a), -Math.sin(p.a)];
  const anchor: "start" | "middle" | "end" = inX > 0.35 ? "start" : inX < -0.35 ? "end" : "middle";
  return { ...p, anchor, lx: +(p.x + 16 * inX).toFixed(2), ly: +(p.y + 18 * inY + 4.5).toFixed(2) };
});

export default function Journey() {
  return (
    <section id="journey" className="journey" data-journey aria-labelledby="journey-title">
      <div className="journey__sticky">
        <div className="wide journey__grid">
          <div>
            <h2 id="journey-title" className="h2">The path so far</h2>
            <ol className="steps">
              {journey.map((s) => (
                <li className="step" key={s.tick} data-step>
                  <span className="step__at" aria-hidden="true">
                    {s.tick.split(" ")[0]}
                    {s.tick.includes(" ") && <span className="step__year">{s.tick.split(" ")[1]}</span>}
                  </span>
                  <div>
                    <h3 className="step__title"><span className="sr-only">{s.tick}: </span>{s.title}</h3>
                    <p className="step__text">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="journey__map" aria-hidden="true">
            <svg viewBox="0 0 600 600">
              {[92, 172, 252].map((r) => <circle key={r} className="journey__ring" cx={C} cy={C} r={r} />)}
              <path className="journey__rail" d={d} />
              <path className="journey__done" d={d} pathLength={1} strokeDasharray="1 2" strokeDashoffset={0} data-journey-path />
              {nodes.map((n, i) => (
                <g key={journey[i].tick}>
                  <circle className="journey__node is-done" cx={n.x} cy={n.y} r="5.5" data-node />
                  <text className="journey__tick" x={n.lx} y={n.ly} textAnchor={n.anchor}>{journey[i].tick}</text>
                </g>
              ))}
              <circle className="journey__head" cx={nodes[nodes.length - 1].x} cy={nodes[nodes.length - 1].y} r="8.5" data-journey-dot />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
