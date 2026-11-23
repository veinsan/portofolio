import type { Metadata } from "next";
import Rings from "@/components/Rings";
import WorkIndex from "@/components/WorkIndex";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Work",
  description: `${projects.length} projects by Riantama Putra across machine learning competitions, computer vision, LLM apps, backend engineering and coursework.`,
};

export default function Work() {
  return (
    <>
      <header className="page-top">
        <Rings className="page-top__rings" />
        <div className="wide">
          <h1 className="page-title" data-split="lines" data-intro>
            Work
            <sup>{projects.length}</sup>
          </h1>
          <p className="lead page-intro" data-split="lines" data-intro data-delay="0.12">
            Competition solutions, shipped products and coursework. Each one opens with the problem, the approach and what it scored.
          </p>
        </div>
      </header>
      <WorkIndex />
    </>
  );
}
