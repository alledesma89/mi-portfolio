'use client';

import { useState } from 'react';
import Head from 'next/head';
import Navbar from './components/navbar';
import Hero from './components/hero';
import Interview from './components/Interview';
import SobreMi from './components/sobremi';
import ExperienceTimeline from './components/ExperienceTimeline';
import Skills from './components/Skills';
import ContactForm from './components/ContactForm';

export default function Home() {
  const [isInterviewOpen, setIsInterviewOpen] = useState(false);

  const openInterview = () => setIsInterviewOpen(true);
  const closeInterview = () => setIsInterviewOpen(false);

  return (
    <>
      <Head>
        <title>Alberto Ledesma Ollega - FULL STACK DEVELOPER</title>
        <meta name="description" content="Alberto Ledesma Ollega - FULL STACK DEVELOPER" />
      </Head>
      <Navbar />

      <div id="hero">
        <Hero onOpenInterview={openInterview} />
      </div>

      {isInterviewOpen && <Interview onClose={closeInterview} />}

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