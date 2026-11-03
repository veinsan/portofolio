import type { Metadata } from "next";
import Btn from "@/components/Btn";
import Glow from "@/components/Glow";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This address is not part of the portfolio. Head back to the work index.",
};

export default function NotFound() {
  return (
    <section className="hero lost" aria-labelledby="lost-h">
      <div className="hero__card">
        <Glow seed="404" live band={0.3} className="hero__bg" />
        <p className="lost__code">( 404 )</p>
        <div className="hero__copy">
        <h1 id="lost-h" className="hero__title">
          <span className="hero__line" data-split="lines" data-intro>Not in the</span>
          <span className="hero__line" data-split="lines" data-intro data-delay="0.08">training data.</span>
        </h1>
        </div>
        <div className="status">
          <p className="status__value">This address is not part of the portfolio.</p>
          <Btn href="/" title="Index">Back to the work</Btn>
        </div>
      </div>
    </section>
  );
}
