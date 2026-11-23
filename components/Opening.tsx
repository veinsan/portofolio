// Markup for the loader, the entry gate and the opening. Shown only when the inline script in the
// layout adds .gated, and driven by motion/opening.ts. Images load when the gate appears.
import { podiums, site } from "@/lib/data";
import { Mute } from "./Icons";
import Img from "./Img";
import Rings from "./Rings";
import { Eq } from "./Tools";

const FOLDS = [1, 2, 3, 4, 5];

export default function Opening() {
  return (
    <div className="opening" data-opening data-phase="load" role="dialog" aria-modal="true" aria-label="Introduction" tabIndex={-1} suppressHydrationWarning>
      <div className="op-load">
        <span className="op-mark" aria-hidden="true">{site.initials}</span>
        <span className="op-folds" aria-hidden="true">{FOLDS.map((i) => <i key={i} />)}</span>
        <p className="label" aria-hidden="true" data-op-verdict>Checking fold 1 of 5</p>
      </div>

      <button type="button" className="op-gate" data-op-start>
        <span className="op-gate__title">
          <span className="op-gate__mouse">Click to begin</span>
          <span className="op-gate__touch">Tap to begin</span>
        </span>
        <span className="op-gate__note"><Eq />Comes with original music, so mind the volume.</span>
      </button>
      <button type="button" className="op-silent label" data-op-silent>
        <Mute />
        Enter quietly
      </button>

      <div className="op-show" aria-hidden="true">
        <div className="op-scene" data-scene="folds">
          <span className="op-cols">{FOLDS.map((i) => <i key={i} />)}</span>
          <p className="op-word">Five folds.</p>
        </div>
        <div className="op-scene" data-scene="clean">
          <p className="op-word">No <em>leaks.</em></p>
        </div>
        {podiums.map((p) => (
          <div className="op-scene op-win" data-scene="win" key={p.event}>
            <span className="op-win__photo"><Img data-src={p.image} alt="" style={p.image.startsWith("/projects/") ? { objectPosition: "0 50%" } : undefined} /></span>
            <span className="op-win__text">
              <span className="op-win__mark">{p.mark}</span>
              <span className="op-win__event">{p.event}</span>
            </span>
          </div>
        ))}
        <div className="op-scene op-name" data-scene="name">
          <Rings />
          <p className="op-name__big">{site.name}</p>
          <p className="op-name__role label">{site.role}</p>
        </div>
      </div>
      <button type="button" className="op-skip label" data-op-skip>Skip intro</button>
    </div>
  );
}
