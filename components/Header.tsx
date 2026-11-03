'use client';
// Vantra-style nav: a small centered bar (mark, page title, four-dot button) that expands into a
// panel of link rows. Escape, an outside click or choosing a link closes it.
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { nav, site } from '@/lib/data';

export default function Header() {
  const path = usePathname();
  const home = path === '/';
  const [open, setOpen] = useState(false);
  const shell = useRef<HTMLElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    shell.current?.querySelector<HTMLElement>('.menu__row')?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); button.current?.focus(); }
    };
    const away = (e: PointerEvent) => { if (!shell.current?.contains(e.target as Node)) setOpen(false); };
    const out = (e: FocusEvent) => { if (e.relatedTarget && !shell.current?.contains(e.relatedTarget as Node)) setOpen(false); };
    const el = shell.current;
    document.addEventListener('keydown', key);
    document.addEventListener('pointerdown', away);
    el?.addEventListener('focusout', out);
    return () => {
      document.removeEventListener('keydown', key);
      document.removeEventListener('pointerdown', away);
      el?.removeEventListener('focusout', out);
    };
  }, [open]);

  const href = (h: string) => (home ? h : `/${h}`);

  return (
    <header ref={shell} className={`pill${open ? ' is-open' : ''}`}>
      <div className="pill__bar">
        <a className="pill__mark" href={home ? '#top' : '/'}>
          {site.initials}
          <span className="sr-only">, {site.name}, home</span>
        </a>
        <p className="pill__title">{site.name}</p>
        <button
          ref={button}
          type="button"
          className="pill__menu"
          aria-expanded={open}
          aria-controls="menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="dots" aria-hidden="true"><i /><i /><i /><i /></span>
        </button>
      </div>
      <nav id="menu" className="menu" aria-label="Primary" inert={!open}>
        <ul>
          {nav.map((n, i) => (
            <li key={n.href} style={{ '--i': i } as React.CSSProperties}>
              <a
                className="menu__row"
                href={href(n.href)}
                aria-current={!home && n.href === '#work' && path.startsWith('/work/') ? 'page' : undefined}
                onClick={() => setOpen(false)}
              >
                <span className="menu__label">{n.label}</span>
                <span className="menu__meta">{n.meta}</span>
                <svg className="menu__icon" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M5 13 13 5M6.5 5H13v6.5" />
                </svg>
              </a>
            </li>
          ))}
        </ul>
        <a className="menu__cta" href={`mailto:${site.email}`} onClick={() => setOpen(false)} style={{ '--i': nav.length } as React.CSSProperties}>
          Email me
        </a>
      </nav>
    </header>
  );
}
