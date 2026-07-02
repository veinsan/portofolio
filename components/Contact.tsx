import { site } from "@/lib/data";
import Reveal from "@/components/Reveal";
import { GitHub, LinkedIn, Mail, MapPin, XSocial } from "@/components/icons";

const socialIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  GitHub: GitHub,
  LinkedIn: LinkedIn,
  "X / Twitter": XSocial,
};

export default function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden py-28 sm:py-36">
      <div
        className="glow-blob animate-drift h-96 w-96 bg-accent-strong/20 bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-5 text-center sm:px-8">
        <Reveal>
          <p className="mb-4 font-mono text-[13px] tracking-widest text-accent-mid uppercase">
            <span className="text-faint">04 /</span> Contact
          </p>
          <h2 className="mx-auto max-w-3xl font-display text-4xl font-semibold tracking-tight text-fg sm:text-6xl">
            Let&apos;s build something <span className="text-gradient">intelligent</span>.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted">
            I take on a small number of projects and roles where the problem is sharp and the bar is
            high. If that sounds like yours, my inbox is open.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex min-h-12 items-center gap-2.5 rounded-full bg-accent-strong px-8 py-3.5 text-sm font-semibold text-white shadow-[0_0_32px_rgba(79,70,229,0.35)] transition-all duration-200 ease-out-expo hover:bg-accent-mid hover:shadow-[0_0_44px_rgba(129,140,248,0.45)]"
            >
              <Mail size={17} />
              {site.email}
            </a>
            <p className="inline-flex items-center gap-2 text-sm text-faint">
              <MapPin size={15} />
              {site.location}
            </p>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <ul className="mt-12 flex items-center justify-center gap-3">
            {site.socials.map((social) => {
              const Icon = socialIcons[social.label];
              return (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-colors duration-200 hover:border-accent-mid hover:text-accent"
                  >
                    {Icon ? <Icon size={18} /> : null}
                  </a>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
