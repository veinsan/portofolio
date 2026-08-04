import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { GitHub, LinkedIn, Mail } from "@/components/icons";
import { site } from "@/lib/data";

export default function Contact() {
  return (
    <section
      id="contact"
      className="grid min-h-[100svh] scroll-mt-16 grid-cols-12 gap-x-3 gap-y-10 bg-[#d8d6d0] px-5 py-20 text-[#171717] md:min-h-screen md:px-[2.4vw] md:py-[9vw]"
    >
      <div className="col-span-12 md:col-span-7">
        <SectionHeading title="Contact" caption="Build something real" />
        <Reveal variant="wipe" className="max-w-5xl" delay={40}>
          <h3 className="text-[clamp(3rem,12vw,5.25rem)] font-medium leading-[.93] tracking-[-0.045em] text-balance md:text-[5.7vw] md:leading-[.9] md:tracking-[-0.07em]">
            For applied AI and fullstack systems.
          </h3>
        </Reveal>
        <Reveal variant="wipe" className="mt-8 max-w-2xl" delay={90}>
          <p className="text-lg leading-[1.6] tracking-[-0.02em] text-[#3b3832] md:text-3xl md:leading-[1.55] md:tracking-[-0.025em]">
            Reach me for internships, technical collaboration, or project conversations. My
            source, profile, and inbox are one step away.
          </p>
        </Reveal>
      </div>

      <Reveal
        variant="wipe"
        className="col-span-12 self-end md:col-span-4 md:col-start-9"
        delay={180}
      >
        <div className="flex flex-col gap-4">
          <ContactLink href={site.github} icon={GitHub}>
            GitHub
          </ContactLink>
          <ContactLink href={site.linkedin} icon={LinkedIn}>
            LinkedIn
          </ContactLink>
          <a
            className="group relative flex min-h-14 items-center justify-center gap-3 overflow-hidden rounded-full bg-[#171717] px-6 py-4 text-center text-base font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,.18),0_18px_40px_rgba(0,0,0,.16)] transition duration-300 hover:-translate-y-1 hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#171717] md:py-5 md:text-lg"
            href={`mailto:${site.email}`}
          >
            <span className="absolute inset-x-6 top-0 h-px bg-white/35" aria-hidden="true" />
            <Mail className="h-5 w-5" aria-hidden="true" />
            Email me
          </a>
        </div>
      </Reveal>
    </section>
  );
}

function ContactLink({
  href,
  icon: Icon,
  children,
}: {
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <a
      className="group relative flex min-h-14 items-center justify-center gap-3 overflow-hidden rounded-full border border-[#c7c2b8] bg-[#f4f1ea] px-6 py-4 text-center text-base font-semibold text-[#171717] shadow-[inset_0_1px_0_rgba(255,255,255,.8),0_18px_40px_rgba(0,0,0,.08)] transition duration-300 hover:-translate-y-1 hover:border-[#171717] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#171717] md:py-5 md:text-lg"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      <span className="absolute inset-x-6 top-0 h-px bg-white" aria-hidden="true" />
      <Icon size={20} />
      {children}
    </a>
  );
}
