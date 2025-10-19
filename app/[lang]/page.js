import Navbar from './components/navbar';
import Hero from './components/hero';
import SobreMi from './components/sobremi';
import ExperienceTimeline from './components/ExperienceTimeline';
import Skills from './components/Skills';
import ContactForm from './components/ContactForm';

export default function Home() {
  return (
    <>
      <Navbar />
      <div id="hero">
        <Hero />
      </div>
      <div id="experiencia">
        <ExperienceTimeline />
      </div>
      <div id="skills">
        <Skills />
      </div>
      <div id="sobremi">
        <SobreMi />
      </div>
      <div id="contacto">
        <ContactForm />
      </div>
    </>
  );
}