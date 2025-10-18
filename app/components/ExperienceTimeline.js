'use client';

import { useState } from 'react';
import { FaBriefcase, FaExternalLinkAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const experienceData = [
  {
    title: 'Desarrollador Front-end & Technical Lead',
    company: 'GFT (Proyecto Avatar IA con HeyGen)',
    dates: 'jul. 2025 - actualidad',
    location: 'España · En remoto',
    description: 'Creación del proyecto desde cero. Desarrollo de componentes en React y Next.js a partir de diseños en Figma. Control técnico del proyecto y equipo.',
    tech: ['React', 'Next.js', 'TypeScript', 'HeyGen API', 'Figma', 'TailwindCSS'],
  },
  {
    title: 'Desarrollador React',
    company: 'AMOVENS',
    dates: 'ene. 2023 - jul. 2025',
    location: 'España · En remoto',
    description: 'Creación de nuevos componentes para la aplicación principal y debugging de funcionalidades existentes para mejorar la experiencia de usuario.',
    tech: ['React', 'JavaScript', 'Redux', 'Jest'],
    link: 'https://amovens.com',
  },
  {
    title: 'Responsable Técnico Full Stack',
    company: 'Erescambio Marketing',
    dates: 'oct. 2021 - jul. 2025',
    location: 'España · En remoto',
    description: 'Gestioné un equipo de 2 personas en el desarrollo de una aplicación en React vinculada a un backend de WordPress (Headless CMS), permitiendo a los clientes autogestionar sus plataformas.',
    tech: ['React', 'WordPress', 'Headless CMS', 'JavaScript', 'PHP'],
    link: 'https://erescambio.com',
  },
  {
    title: 'Jefe Técnico & Desarrollador Angular',
    company: 'JUBILAME',
    dates: 'may. 2020 - ene. 2024',
    location: 'España · En remoto',
    description: 'Lideré un equipo de 5 personas, gestionando tareas y sprints a través de Jira. Fui responsable de la configuración de entornos con Docker, la ejecución de testings y la gestión de la aplicación en Google Cloud (GCloud).',
    tech: ['Angular', 'TypeScript', 'Jira', 'Docker', 'GCloud', 'Testing'],
    link: 'https://jubilame.com',
  },
  {
    title: 'Desarrollador Full-Stack Freelance',
    company: 'Autónomo',
    dates: 'ene. 2016 - actualidad',
    location: 'España · En remoto',
    description: 'Desarrollo de soluciones web a medida para una variedad de clientes. Mis proyectos incluyen desde sitios de e-commerce con pasarelas de pago, hasta aplicaciones web interactivas y desarrollo de plugins personalizados para CMS como WordPress.',
    tech: ['React', 'Node.js', 'PHP', 'WordPress', 'WooCommerce', 'Stripe'],
  }
];

const ExperienceItem = ({ job, index }) => (
    <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex justify-between items-center w-full md:odd:flex-row-reverse"
    >
        <div className="w-full md:w-5/12">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
                <div className="flex-grow">
                    <p className="text-xs sm:text-sm font-semibold text-blue-600">{job.dates}</p>
                    <h3 className="text-lg sm:text-xl font-bold mt-1 text-gray-900">{job.title}</h3>
                    <p className="text-sm sm:text-md italic text-gray-500 mt-1">{job.company}</p>
                    <p className="mt-3 sm:mt-4 text-gray-600 text-xs sm:text-sm">{job.description}</p>
                    <div className="mt-3 sm:mt-4 flex flex-wrap gap-1 sm:gap-2">
                        {job.tech.map((tech, i) => (
                            <span key={i} className="bg-blue-100 text-blue-800 text-[10px] sm:text-xs font-semibold px-2 py-1 rounded-full">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
                {job.link && (
                    <div className="mt-4 sm:mt-6">
                        <a
                            href={job.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-3 py-1.5 sm:px-4 sm:py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105 text-xs sm:text-sm"
                        >
                            Visitar Proyecto <FaExternalLinkAlt />
                        </a>
                    </div>
                )}
            </div>
        </div>
        <div className="hidden md:flex w-2/12 justify-center order-2 z-10">
            <div className="bg-blue-500 rounded-full h-8 w-8 flex items-center justify-center shadow-lg">
                <FaBriefcase className="text-white" />
            </div>
        </div>
        <div className="hidden md:block w-5/12 order-1 md:odd:order-3"></div>
    </motion.div>
);

const ExperienceTimeline = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleExperiences = showAll ? experienceData : experienceData.slice(0, 3);

  return (
    <section id="experiencia" className="bg-gray-50 text-gray-800 py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16">Trayectoria Profesional</h2>
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 -translate-x-1/2 h-full w-0.5 bg-gray-300" aria-hidden="true"></div>
          <AnimatePresence>
            {visibleExperiences.map((job, index) => (
                <div key={job.company + job.title} className="pl-10 md:pl-0 relative">
                     <div className="md:hidden absolute top-1/2 -translate-y-1/2 left-4 -translate-x-1/2 z-10">
                        <div className="bg-blue-500 rounded-full h-6 w-6 flex items-center justify-center shadow-lg">
                            <FaBriefcase className="text-white text-xs" />
                        </div>
                    </div>
                    <ExperienceItem job={job} index={index} />
                </div>
            ))}
          </AnimatePresence>
        </div>
        {!showAll && experienceData.length > 3 && (
            <div className="text-center mt-8">
                <button 
                    onClick={() => setShowAll(true)}
                    className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                    Mostrar toda la trayectoria
                </button>
            </div>
        )}
      </div>
    </section>
  );
};

export default ExperienceTimeline;
