"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger offset in ms */
  delay?: number;
  className?: string;
  as?: ElementType;
  /**
   * "wipe" masks the block and slides its content up from below, the way
   * the display type enters. It clips, so keep it off anything that lifts,
   * scales or shows a focus ring on hover.
   */
  variant?: "rise" | "wipe";
};

/**
 * Reveals content the first time it scrolls into view. Both animations
 * live in globals.css only when scripting is enabled, so reduced-motion and
 * no-JS visitors are handled purely in CSS.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
  variant = "rise",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style = delay
    ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties)
    : undefined;

  if (variant === "wipe") {
    return (
      <Tag ref={ref} className={`wipe ${className}`} style={style}>
        <div className="wipe-i">{children}</div>
      </Tag>
    );
  }

  return (
    <Tag ref={ref} className={`reveal ${className}`} style={style}>
      {children}
    </Tag>
  );
}
