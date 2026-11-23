import type { Metadata, Viewport } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Motion from "@/components/Motion";
import Opening from "@/components/Opening";
import { PalettePopover } from "@/components/Tools";
import { accents, site } from "@/lib/data";
import { display, mono, sans } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | ${site.role}`, template: `%s | ${site.name}` },
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} | ${site.role}`,
    description: site.description,
    locale: "en_US",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: `${site.name}, ${site.role}` }],
  },
  twitter: { card: "summary_large_image", title: `${site.name} | ${site.role}`, description: site.description, images: ["/og.jpg"] },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#fbfaf6" };

// Before first paint: motion flags, the saved theme and accent, and whether the opening shows
// (home, no hash, once per session, never under reduced motion).
const flags = `(function(){var d=document.documentElement,c=d.classList;c.add('js');var m=!matchMedia('(prefers-reduced-motion: reduce)').matches;if(m)c.add('motion');try{var t=localStorage.getItem('theme'),a=localStorage.getItem('accent');if(t==='dark')d.setAttribute('data-theme',t);if(${JSON.stringify(accents)}.indexOf(a)>-1)d.setAttribute('data-accent',a);if(m&&location.pathname==='/'&&!location.hash&&!sessionStorage.getItem('opened'))c.add('gated')}catch(e){}})()`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  url: site.url,
  email: `mailto:${site.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Bandung", addressCountry: "ID" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Institut Teknologi Bandung" },
  sameAs: [site.github, site.linkedin],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="light" data-accent="slate" className={`${display.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: flags }} />
      </head>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <div className="progress" aria-hidden="true" />
        <Header />
        <main id="main" tabIndex={-1}>{children}</main>
        <Footer />
        <Opening />
        <div id="curtain" aria-hidden="true">
          <div className="curtain__band" />
          <div className="curtain__panel">
            <span className="curtain__label" />
            <span className="curtain__note label">{site.name}</span>
          </div>
        </div>
        <PalettePopover />
        <p id="toast" className="toast" role="status" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
        <Motion />
      </body>
    </html>
  );
}
