// Words ink in as you read down, with photos set inside the line.
import Link from "next/link";
import { Fragment } from "react";
import { manifesto } from "@/lib/data";
import { ArrowRight } from "./Icons";
import Img from "./Img";

export default function Manifesto() {
  return (
    <section className="section manifesto wide" aria-label="How I work">
      <p className="manifesto__text" data-ink>
        {manifesto.map((part, i) => (
          <Fragment key={i}>
            {part.text.split(" ").map((word, j) => (
              <Fragment key={j}><span className="w">{word}</span>{" "}</Fragment>
            ))}
            {part.image && <><Img className="manifesto__img w" src={part.image} width={680} height={907} alt="" loading="lazy" />{" "}</>}
          </Fragment>
        ))}
      </p>
      <Link prefetch={false} className="arrow-link" href="/about/" data-title="About">
        The longer story
        <ArrowRight />
      </Link>
    </section>
  );
}
