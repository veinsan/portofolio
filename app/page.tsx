import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Domain from "@/components/Domain";

export default function Home() {
  return (
    <main
      id="main"
      className="min-h-screen bg-[#f4f1ea] text-[#171717] selection:bg-[#174fff] selection:text-white"
    >
      <Nav />
      <Hero />
      <About />
      <Domain />
      <Work />
      <Experience />
      <Contact />
    </main>
  );
}
