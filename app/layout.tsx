import type { Metadata, Viewport } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Motion from "@/components/Motion";
import { site } from "@/lib/data";
import { display, mono, text } from "./fonts";
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
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.name}, ${site.role}` }],
  },
  twitter: { card: "summary_large_image", title: `${site.name} | ${site.role}`, description: site.description, images: ["/og.png"] },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f5f4f0" };

// Before first paint: hidden-until-revealed styles only apply when JS runs and motion is allowed.
const flags = `document.documentElement.classList.add('js');if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')`;

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
    <html lang="en" className={`${display.variable} ${text.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: flags }} />
      </head>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <div id="curtain" aria-hidden="true">
          <div className="curtain__panel">
            <span className="curtain__label" />
          </div>
        </div>
        <div className="preview" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" width={416} height={260} />
        </div>
        <Header />
        <main id="main" tabIndex={-1}>{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
        <Motion />
      </body>
    </html>
  );
}
