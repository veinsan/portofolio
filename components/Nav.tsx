import { navItems, site } from "@/lib/data";

export default function Nav() {
  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 grid grid-cols-12 items-start gap-x-3 bg-[#f4f1ea] px-5 py-2 sm:py-5 md:px-[2.4vw] md:py-[2vw]"
      aria-label="Primary navigation"
    >
      <a
        href="#home"
        className="col-span-2 inline-flex min-h-11 min-w-11 items-center font-mono text-sm font-semibold tracking-[-0.03em] text-[#171717] sm:-my-3 md:text-lg md:tracking-[-0.04em]"
        aria-label={`${site.name}, back to top`}
      >
        {site.initials}
      </a>
      <div className="col-span-10 grid grid-cols-3 justify-items-end gap-x-3 gap-y-1.5 font-mono text-[0.72rem] leading-none text-[#555] min-[360px]:flex min-[360px]:flex-wrap min-[360px]:justify-end min-[360px]:gap-x-1.5 sm:gap-x-5 sm:text-xs md:gap-x-8 md:text-sm hover:[&_a]:text-[#171717]">
        {navItems.map((item) => (
          <a
            className="inline-flex min-h-11 min-w-11 items-center justify-center transition-colors sm:-my-3"
            href={item.href}
            key={item.href}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
