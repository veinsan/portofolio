import { site } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-paper-4 px-5 pb-10 md:px-[2.4vw] md:pb-[3vw]">
      <div className="flex flex-col gap-2 border-t border-ink pt-5 font-mono text-[0.7rem] tracking-[0.1em] text-ink-2 uppercase sm:flex-row sm:items-baseline sm:justify-between sm:text-xs">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p>Designed and built by {site.name}. Fast by default.</p>
      </div>
    </footer>
  );
}
