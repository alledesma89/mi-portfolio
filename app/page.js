import Head from 'next/head';
import Navbar from './components/navbar'; 
import Hero from './components/hero';
import SobreMi from './components/sobremi';
import ContactForm from './components/ContactForm';

export default function Home() {
  return (
    <>
      <Head>
        <title>CT Digital Solutions | Soluciones digitales para tu negocio</title>
        <meta
          name="description"
          content="CT Digital Solutions ofrece servicios profesionales de desarrollo web, marketing digital y más para ayudar a tu negocio a crecer."
        />
        <meta
          name="keywords"
          content="CT Digital Solutions, desarrollo web, marketing digital, soluciones digitales, diseño gráfico"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barrio&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Navbar */}
      <Navbar />

      {/* Sección Hero con ID */}
      <div id="hero">
        <Hero />
      </div>

      {/* Sección Sobre Mí con ID */}
      <div id="sobremi">
        <SobreMi />
      </div>

      {/* Sección Contacto con ID */}
      <div id="contacto">
        <ContactForm />
      </div>
    </>
  );
}
