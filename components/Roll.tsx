// Letters roll up to a copy of themselves on hover. The copy is a text-shadow, so nothing is said twice.
import type { CSSProperties } from "react";

export default function Roll({ children }: { children: string }) {
  return (
    <>
      <span className="sr-only">{children}</span>
      <span className="roll" aria-hidden="true">
        {[...children].map((ch, i) => (
          <span key={i} className="roll__ch" style={{ "--i": i } as CSSProperties}>{ch}</span>
        ))}
      </span>
    </>
  );
}
