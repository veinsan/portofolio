import { projects } from "@/lib/data";
import ProjectShowcase from "@/components/ProjectShowcase";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export default function Work() {
  return (
    <section id="work" className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          label="Selected Work"
          title="Systems I'm proud of"
          description="Selected projects that show the range: competition-grade computer vision, full-stack platforms, desktop software and a multi-threaded game built on fundamentals."
        />

        <Reveal delay={80}>
          <ProjectShowcase projects={projects} />
        </Reveal>
      </div>
    </section>
  );
}
