import Hero from "@/components/sections/Hero";
import TechMarquee from "@/components/sections/TechMarquee";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import NowBuilding from "@/components/sections/NowBuilding";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Testimonials from "@/components/sections/Testimonials";
import Experimental from "@/components/sections/Experimental";
import Contact from "@/components/sections/Contact";
import Sponsor from "@/components/sections/Sponsor";
import Footer from "@/components/sections/Footer";

export default function Page() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <About />
      <Services />
      <Projects />
      <NowBuilding />
      <Skills />
      <Experience />
      <Testimonials />
      <Experimental />
      <Sponsor />
      <Contact />
      <Footer />
    </>
  );
}
