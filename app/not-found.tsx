import type { Metadata } from "next";
import Btn from "@/components/Btn";
import Rings from "@/components/Rings";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This address is not part of the portfolio. Head back home or browse the work.",
};

export default function NotFound() {
  return (
    <section className="lost" data-no-close aria-labelledby="lost-title">
      <Rings />
      <span className="outlier" aria-hidden="true" />
      <div className="lost__in">
        <p className="lost__code">404</p>
        <h1 id="lost-title" className="h2 lost__title" data-split="lines" data-intro>Out of distribution.</h1>
        <p className="lead lost__text">This address was never in the training set. The page may have moved, or it never existed.</p>
        <div className="lost__row">
          <Btn href="/" title="Home">Go home</Btn>
          <Btn href="/work/" tone="line" title="Work">Browse the work</Btn>
        </div>
      </div>
    </section>
  );
}
