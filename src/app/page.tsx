import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import NowBuilding from "@/components/sections/NowBuilding";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Experimental from "@/components/sections/Experimental";
import Contact from "@/components/sections/Contact";

export default function Page() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <NowBuilding />
      <Skills />
      <Experience />
      <Experimental />
      <Contact />
    </>
  );
}
