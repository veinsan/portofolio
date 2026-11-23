import AboutBand from "@/components/AboutBand";
import Awards from "@/components/Awards";
import Btn from "@/components/Btn";
import Hero from "@/components/Hero";
import Journey from "@/components/Journey";
import Manifesto from "@/components/Manifesto";
import Showcase from "@/components/Showcase";
import Skills, { Marquee } from "@/components/Skills";
import { Education, Roles } from "@/components/Timeline";
import { site } from "@/lib/data";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutBand />
      <Manifesto />
      <Awards />
      <Showcase />

      <section id="experience" className="section" aria-labelledby="experience-title">
        <div className="column">
          <h2 id="experience-title" className="h3 tl-title">Experience</h2>
          <Roles />
          <h2 className="h3 tl-title">Education &amp; certification</h2>
          <Education />
          <div className="tl-more">
            <p className="tl-more__q">Want the whole story?</p>
            <div className="tl-more__links">
              <Btn href="/about/" tone="line" title="About">Committees and the full story</Btn>
              <Btn href={site.linkedin} tone="line" external>View on LinkedIn</Btn>
            </div>
          </div>
        </div>
      </section>

      <Journey />
      <Skills />
      <Marquee />
    </>
  );
}
