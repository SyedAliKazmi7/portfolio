import Hero from "../components/Hero";
import TechMarquee from "../components/TechMarquee";
import About from "../components/About";
import Projects from "../components/Projects";
import Services, { Process } from "../components/Services";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <TechMarquee />
      <About />
      <Projects />
      <Services />
      <Process />
      <Contact />
    </main>
  );
}