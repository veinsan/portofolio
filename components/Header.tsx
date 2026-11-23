'use client';
// Floating pill on wide screens. Under 1024px, one round button at the bottom opens a full menu
// (Escape, a link or the button closes it, and focus returns to the button).
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { nav, site } from '@/lib/data';
import { startScroll, stopScroll } from '@/engine';
import { Arrow, GitHub, LinkedIn, Mail } from './Icons';
import Roll from './Roll';
import Tools from './Tools';

const menuLinks = [{ label: 'Home', href: '/' }, ...nav, { label: 'Contact', href: '/contact/' }];

export default function Header() {
  const path = usePathname();
  // The path the menu was opened on, so going back or forward closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === path;
  const [section, setSection] = useState('');
  const button = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const behind = document.querySelectorAll<HTMLElement>('main, .footer');
    root.classList.add('is-menu');
    behind.forEach((el) => { el.inert = true; });
    stopScroll();
    menu.current?.querySelector<HTMLElement>('a')?.focus();
    const key = (e: KeyboardEvent) => {
      // The accent popover takes the first Escape.
      if (e.key !== 'Escape' || document.querySelector('#palette:popover-open')) return;
      setOpenOn(null);
      requestAnimationFrame(() => button.current?.focus());
    };
    const wide = matchMedia('(min-width: 1024px)');
    const close = () => { if (wide.matches) setOpenOn(null); };
    document.addEventListener('keydown', key);
    wide.addEventListener('change', close);
    return () => {
      document.removeEventListener('keydown', key);
      wide.removeEventListener('change', close);
      root.classList.remove('is-menu');
      behind.forEach((el) => { el.inert = false; });
      startScroll();
    };
  }, [open]);

  // Scroll spy on the home page: which nav item owns the middle of the screen.
  useEffect(() => {
    if (path !== '/') return;
    const owner: Record<string, string> = { top: '', about: 'About', awards: '', work: 'Work', experience: 'Experience', journey: 'Experience' };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setSection(owner[e.target.id] ?? ''); });
    }, { rootMargin: '-45% 0px -54% 0px' });
    Object.keys(owner).forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [path]);

  const current = (label: string, href: string) => {
    if (path === '/') return section === label ? 'true' : undefined;
    return !href.includes('#') && path.startsWith(href.replace(/\/$/, '')) ? 'page' : undefined;
  };

  return (
    <>
      <header className="header">
        <div className="header__pill">
          <Link prefetch={false} className="brand" href="/" data-title="Home">{site.name}</Link>
          <nav className="nav" aria-label="Main">
            {nav.map((n) => (
              <Link prefetch={false} key={n.href} href={n.href} data-title={n.label} aria-current={current(n.label, n.href)}>
                <Roll>{n.label}</Roll>
              </Link>
            ))}
          </nav>
          <div className="header__end">
            <Tools />
            <Link prefetch={false} className="pill pill--line header__cta" href="/contact/" data-title="Contact">
              <span>Let’s talk</span>
              <Arrow />
            </Link>
          </div>
        </div>
      </header>

      <button
        ref={button}
        type="button"
        className="menu-btn"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="menu"
        onClick={() => setOpenOn(open ? null : path)}
      >
        <i />
        <i />
      </button>

      <nav ref={menu} id="menu" className="menu" aria-label="Menu" inert={!open} data-lenis-prevent>
        <ul className="menu__links">
          {menuLinks.map((n) => (
            <li key={n.href}>
              <Link prefetch={false} href={n.href} data-title={n.label} onClick={() => setOpenOn(null)}>{n.label}</Link>
            </li>
          ))}
        </ul>
        <div className="menu__foot">
          <div className="menu__tools"><Tools /></div>
          <div className="menu__social">
            <a className="round" href={`mailto:${site.email}`} aria-label="Email"><Mail /></a>
            <a className="round" href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GitHub /></a>
            <a className="round" href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedIn /></a>
          </div>
        </div>
      </nav>
    </>
  );
}
