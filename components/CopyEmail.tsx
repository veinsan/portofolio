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
      className="inline-flex min-h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-full border border-rule-strong bg-paper px-7 text-[0.9rem] font-semibold text-ink shadow-[inset_0_1px_0_#fff,0_16px_36px_rgba(0,0,0,0.07)] transition duration-300 ease-out-quint hover:-translate-y-1 hover:border-ink active:translate-y-0 sm:w-auto sm:text-base"
    >
      {copied ? <Check size={18} className="text-accent" /> : <Copy size={18} />}
      {copied ? "Copied" : "Copy email"}
      <span aria-live="polite" className="sr-only">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </button>
  );
}
