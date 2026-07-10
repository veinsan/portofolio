"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "@/components/icons";

/**
 * Clipboard fallback for the mailto CTA: on machines without a configured
 * mail client (most recruiters'), mailto silently no-ops. This keeps the
 * conversion path alive with visible confirmation.
 */
export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    let ok = true;
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Clipboard API needs a secure context; fall back for http previews
      try {
        const field = document.createElement("textarea");
        field.value = email;
        field.setAttribute("readonly", "");
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.appendChild(field);
        field.select();
        ok = document.execCommand("copy");
        field.remove();
      } catch {
        ok = false;
      }
    }
    // Never confirm a copy that didn't happen; the address stays readable
    // on the mailto pill next to this button
    if (!ok) return;
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-sm font-medium text-fg transition duration-150 hover:border-accent-mid hover:text-accent active:scale-[0.98]"
    >
      {copied ? <Check size={16} className="text-ok" /> : <Copy size={16} />}
      {copied ? "Copied" : "Copy email"}
      <span aria-live="polite" className="sr-only">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </button>
  );
}
