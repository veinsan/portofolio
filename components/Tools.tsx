// Music, accent and theme. Clicks and labels are handled in motion/prefs.ts and motion/sound.ts,
// because the same three tools live in both the header and the phone menu.
import { accents } from "@/lib/data";
import { Moon, Palette, Sun } from "./Icons";

export const Eq = () => (
  <span className="eq" aria-hidden="true"><i /><i /><i /><i /></span>
);

export default function Tools() {
  return (
    <>
      <button type="button" className="tool" data-tool="sound" aria-label="Background music" aria-pressed="false" title="Background music">
        <Eq />
      </button>
      <button type="button" className="tool" popoverTarget="palette" aria-label="Accent color" title="Accent color">
        <Palette />
      </button>
      <button type="button" className="tool" data-tool="theme" aria-label="Dark theme" aria-pressed="false" title="Dark theme">
        <Moon />
        <Sun />
      </button>
    </>
  );
}

export function PalettePopover() {
  return (
    <div id="palette" popover="auto" className="palette">
      <fieldset>
        <legend className="label">Accent</legend>
        {accents.map((a) => (
          <label key={a}>
            <input type="radio" name="accent" value={a} defaultChecked={a === "slate"} />
            <span className="palette__dot" style={{ background: `var(--swatch-${a})` }} />
            {a}
          </label>
        ))}
      </fieldset>
    </div>
  );
}
