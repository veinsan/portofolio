import { site } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 font-mono text-[13px] text-faint sm:flex-row sm:px-8">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p>
          Designed &amp; built with Next.js — <span className="text-muted">fast by default</span>
        </p>
      </div>
    </footer>
  );
}
