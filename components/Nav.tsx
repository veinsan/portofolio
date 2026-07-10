"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/data";
import { Close, Menu } from "@/components/icons";

const links = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: lock body scroll, move focus in on open, Escape closes,
  // focus returns to the toggle on close (WCAG disclosure pattern)
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      toggleRef.current?.focus();
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-line bg-base/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <a
          href="#top"
          className="flex min-h-11 items-center gap-2.5 font-display text-[15px] font-semibold tracking-tight text-fg"
          onClick={() => setOpen(false)}
        >
          <span className="inline-block h-2 w-2 rounded-full bg-accent-mid shadow-[0_0_12px_rgba(129,140,248,0.8)]" />
          <span>
            {site.name}
            <span className="text-accent-mid">.</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="flex min-h-11 items-center text-sm text-muted transition-colors hover:text-fg"
            >
              <span className="link-underline">{l.label}</span>
            </a>
          ))}
          <a
            href={`mailto:${site.email}`}
            className="inline-flex min-h-11 items-center rounded-full border border-line-strong px-4 text-sm font-medium text-fg transition duration-150 hover:border-accent-mid hover:text-accent active:scale-[0.98]"
          >
            Get in touch
          </a>
        </div>

        {/* Mobile toggle, 44px touch target */}
        <button
          ref={toggleRef}
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="-mr-2 flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg text-fg md:hidden"
        >
          {open ? <Close size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          ref={menuRef}
          id="mobile-menu"
          className="menu-in border-t border-line bg-base/95 backdrop-blur-xl md:hidden"
        >
          <div className="mx-auto flex max-w-6xl flex-col px-5 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-4 text-base text-fg last:border-0"
              >
                {l.label}
              </a>
            ))}
            <a
              href={`mailto:${site.email}`}
              onClick={() => setOpen(false)}
              className="mt-4 rounded-full bg-accent-strong px-5 py-3.5 text-center text-sm font-semibold text-white"
            >
              Get in touch
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
