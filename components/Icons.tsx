// Inline icons in one light stroke style on a 24px grid. Decorative: the link or button carries the name.
type P = { className?: string };
const base = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

export const Arrow = ({ className = "icon-out" }: P) => (
  <svg {...base} className={className}><path d="M7 17 17 7M8.5 7H17v8.5" /></svg>
);
export const ArrowRight = ({ className }: P) => (
  <svg {...base} className={className}><path d="M4 12h16m-6-6 6 6-6 6" /></svg>
);
export const ArrowUp = ({ className }: P) => (
  <svg {...base} className={className}><path d="M12 20V4M6 10l6-6 6 6" /></svg>
);
export const Chevron = ({ className }: P) => (
  <svg {...base} className={className}><path d="m6 15 6-6 6 6" /></svg>
);
export const Download = ({ className = "icon-down" }: P) => (
  <svg {...base} className={className}><path d="M12 4v11m-5-5 5 5 5-5M4 20h16" /></svg>
);
export const Copy = ({ className }: P) => (
  <svg {...base} className={className}><rect x="8" y="8" width="12" height="12" rx="2.5" /><path d="M16 8V6.5A2.5 2.5 0 0 0 13.5 4h-7A2.5 2.5 0 0 0 4 6.5v7A2.5 2.5 0 0 0 6.5 16H8" /></svg>
);
export const External = ({ className }: P) => (
  <svg {...base} className={className}><path d="M14 4h6v6m0-6-9 9M18 14v4.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10" /></svg>
);
export const Play = ({ className }: P) => (
  <svg {...base} className={className}><circle cx="12" cy="12" r="9" /><path d="m10 8.5 5.5 3.5-5.5 3.5z" /></svg>
);
export const Palette = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M12 3a9 9 0 1 0 0 18c1.3 0 2-.8 2-1.8 0-.9-.6-1.3-.6-2.2 0-1 .8-1.7 2-1.7H17a4 4 0 0 0 4-4c0-4.6-4-8.3-9-8.3Z" />
    <path d="M7.5 12h.01M9 7.8h.01M14 7h.01M17.2 10.2h.01" strokeWidth="2.8" />
  </svg>
);
export const Moon = ({ className = "icon-moon" }: P) => (
  <svg {...base} className={className}><path d="M20 14.5A8.2 8.2 0 0 1 9.5 4a8.2 8.2 0 1 0 10.5 10.5Z" /></svg>
);
export const Sun = ({ className = "icon-sun" }: P) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4" />
  </svg>
);
export const Mute = ({ className }: P) => (
  <svg {...base} className={className}><path d="M5 9.5h3l4-3.5v12l-4-3.5H5zM16 9.5l5 5m0-5-5 5" /></svg>
);
export const LinkedIn = ({ className }: P) => (
  <svg {...base} className={className}><path d="M9 20v-11h3.6v1.6c.7-1.1 1.9-1.8 3.4-1.8 2.8 0 4.5 1.8 4.5 5.2v6h-3.7v-5.4c0-1.8-.7-2.7-2-2.7-1.4 0-2.1 1-2.1 2.8V20zM3.2 9.2h3.6V20H3.2z" /><circle cx="5" cy="5" r="1.8" /></svg>
);
// Simple Icons, CC0.
export const GitHub = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);
export const Mail = ({ className }: P) => (
  <svg {...base} className={className}><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m4 7.5 8 6 8-6" /></svg>
);
