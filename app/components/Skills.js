'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const skillsByCat = {
  frontend: [
    {
      name: 'React',
      logo: '/media/react.svg',
      experience: '8+ Años',
      versions: '16.8+ (Hooks), Legacy',
      examples: [
        { title: 'Gestión de Estado Avanzada', description: 'Uso de Redux Toolkit y Zustand para manejar estados globales complejos y asíncronos de forma eficiente.' },
        { title: 'Hooks Personalizados', description: 'Creación de hooks reutilizables para abstraer lógica de componentes, como fetching de datos o manejo de formularios.' },
        { title: 'Optimización de Rendimiento', description: 'Aplicación de técnicas como `memo`, `useCallback` y `lazy loading` para optimizar el rendimiento.' },
      ]
    },
    {
      name: 'Next.js',
      logo: '/media/next-js.png',
      experience: '5+ Años',
      versions: '12, 13 & 14 (App Router)',
      examples: [
        { title: 'Server & Static Rendering', description: 'Desarrollo con estrategias de renderizado optimizadas para SEO y velocidad (SSR y SSG).' },
        { title: 'API Routes', description: 'Creación de endpoints de API robustos y escalables directamente dentro de la aplicación Next.js.' },
        { title: 'Autenticación', description: 'Implementación de flujos de autenticación seguros utilizando NextAuth.js con diversos proveedores.' }
      ]
    },
    {
      name: 'Angular',
      logo: '/media/angular.png',
      experience: '6+ Años',
      versions: 'Angular 2+ a 15',
      examples: [
          { title: 'Arquitectura Escalable', description: 'Diseño de aplicaciones robustas y mantenibles utilizando módulos, componentes y servicios de Angular.' },
          { title: 'Gestión de Estado con RxJS', description: 'Manejo de flujos de datos asíncronos y estado de la aplicación de forma reactiva con Observables de RxJS.' },
          { title: 'Formularios Reactivos', description: 'Creación de formularios complejos y dinámicos con validación personalizada utilizando Reactive Forms.' },
      ]
    },
    {
      name: 'Vue.js',
      logo: '/media/Vue.svg',
      experience: '5+ Años',
      versions: '2, 3 (Composition API)',
      examples: [
          { title: 'Reactivity System', description: 'Desarrollo de interfaces dinámicas y reactivas con el sistema de reactividad de Vue.' },
          { title: 'Single File Components', description: 'Organización del código en componentes autocontenidos y reutilizables.' },
          { title: 'Vuex & Pinia', description: 'Gestión de estado centralizado para aplicaciones a gran escala.' },
      ]
    },
    {
      name: 'JavaScript',
      logo: '/media/javascript.svg',
      experience: '10+ Años',
      versions: 'ES6/ES2015+',
      examples: [
        { title: 'ES6+ Moderno', description: 'Dominio de características modernas como `async/await`, desestructuración, módulos y promesas.' },
        { title: 'Manipulación del DOM', description: 'Creación de interactividad y dinamismo en páginas web sin necesidad de frameworks.' },
        { title: 'Programación Funcional', description: 'Aplicación de conceptos de programación funcional para un código más limpio y predecible.' }
      ]
    },
    {
      name: 'Tailwind CSS',
      logo: '/media/tailwind.svg',
      experience: '5+ Años',
      versions: '2.x, 3.x',
      examples: [
        { title: 'Utility-First Design', description: 'Desarrollo rápido de interfaces complejas y personalizadas sin salir del HTML.' },
        { title: 'JIT (Just-In-Time) Compiler', description: 'Optimización del rendimiento generando solo el CSS necesario, manteniendo los builds ligeros.' },
        { title: 'Configuración y Theming', description: 'Personalización avanzada del `tailwind.config.js` para adaptar la paleta de colores, tipografía y espaciado.' },
      ]
    },
  ],
  backend: [
    {
      name: 'Node.js',
      logo: '/media/nodejs.svg',
      experience: '7+ Años',
      versions: '16.x, 18.x, 20.x',
      examples: [
        { title: 'APIs RESTful', description: 'Construcción de APIs eficientes y escalables utilizando Express.js y middlewares.' },
        { title: 'Comunicación en Tiempo Real', description: 'Implementación de WebSockets con librerías como Socket.IO para aplicaciones interactivas.' },
        { title: 'Autenticación y Autorización', description: 'Desarrollo de sistemas de autenticación seguros con JWT (JSON Web Tokens).' }
      ]
    },
    {
      name: 'Google Cloud',
      logo: '/media/google-cloud.jpg',
      experience: '5+ Años',
      versions: 'Compute Engine, Cloud Run',
      examples: [
        { title: 'Despliegue de Aplicaciones', description: 'Despliegue y gestión de aplicaciones en contenedores utilizando Google Cloud Run y Compute Engine.' },
        { title: 'Gestión de Bases de Datos', description: 'Configuración y mantenimiento de bases de datos SQL y NoSQL con Cloud SQL y Firestore.' },
        { title: 'CI/CD Pipelines', description: 'Creación de pipelines de integración y despliegue continuo con Cloud Build para automatizar las entregas.' },
      ]
    },
    {
      name: 'Amazon Web Services',
      logo: '/media/aws.png',
      experience: '6+ Años',
      versions: 'EC2, S3, Lambda',
      examples: [
        { title: 'Computación en la Nube', description: 'Despliegue y escalado de servidores virtuales con EC2.' },
        { title: 'Almacenamiento de Objetos', description: 'Gestión de almacenamiento escalable y seguro para activos estáticos con S3.' },
        { title: 'Serverless', description: 'Ejecución de código sin servidor con AWS Lambda para tareas y microservicios.' },
      ]
    }
  ],
  data: [
    {
      name: 'Análisis de Datos',
      logo: '/media/heygen.svg',
      experience: '1 Año',
      versions: 'Cursando Máster',
      specialStyle: true,
      examples: [
        {
            title: 'Fundamentos de Python para Data Science',
            description: 'Actualmente profundizando en el ecosistema de Python, utilizando librerías como Pandas para la manipulación y limpieza de datos, NumPy para el cálculo numérico y Matplotlib/Seaborn para la visualización.'
        },
        {
            title: 'Bases de Datos y SQL',
            description: 'Aprendiendo a realizar consultas complejas en SQL para extraer y filtrar datos de bases de datos relacionales, un pilar fundamental para cualquier análisis.'
        },
        {
            title: 'Estadística y Machine Learning',
            description: 'Iniciando en la aplicación de modelos estadísticos y algoritmos de Machine Learning para realizar análisis predictivos y encontrar patrones ocultos en los datos.'
        },
        {
            title: 'Herramientas de Visualización',
            description: 'Explorando herramientas como Tableau y Power BI para crear dashboards interactivos y comunicar los resultados de los análisis de forma clara y efectiva.'
        }
      ]
    }
  ]
};

const CategorySection = ({ title, skills, onCardClick }) => (
  <div className="mb-12 sm:mb-16">
    <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-blue-400">{title}</h3>
    <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
      {skills.map((skill) => {
        const isSpecial = skill.specialStyle;
        const cardClasses = isSpecial
          ? 'group bg-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-gray-200 flex flex-col w-full sm:w-[48%] lg:w-[30%]'
          : 'group bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-gray-700 hover:border-blue-500 flex flex-col w-full sm:w-[48%] lg:w-[30%]';
        const titleClasses = isSpecial ? 'text-lg sm:text-xl font-semibold text-gray-800' : 'text-lg sm:text-xl font-semibold text-gray-200';
        const experienceClasses = isSpecial ? 'text-sm sm:text-md font-bold text-blue-600' : 'text-sm sm:text-md font-bold text-blue-400';
        const versionsClasses = isSpecial ? 'text-xs sm:text-sm text-gray-500 mt-1' : 'text-xs sm:text-sm text-gray-400 mt-1';
        const borderClasses = isSpecial ? 'border-t border-gray-200' : 'border-t border-gray-700';

        return (
          <div
            key={skill.name}
            className={cardClasses}
            onClick={() => onCardClick(skill)}
          >
            <div className="flex-grow flex flex-col items-center text-center">
              <Image src={skill.logo} alt={`${skill.name} logo`} width={56} height={56} className={`h-14 w-14 mb-4 object-contain ${!isSpecial && 'filter grayscale group-hover:grayscale-0'} transition-all duration-300`} />
              <h3 className={titleClasses}>{skill.name}</h3>
            </div>
            <div className={`mt-4 pt-4 ${borderClasses} text-center`}>
                <p className={experienceClasses}>{skill.experience}</p>
                <p className={versionsClasses}>{skill.versions}</p>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

const Skills = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (skill) => {
    setSelectedSkill(skill);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedSkill(null);
    }, 300);
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) closeModal();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <section className="py-16 sm:py-20 bg-gray-900" id="skills">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 text-white">Habilidades y Tecnologías</h2>
        
        <CategorySection title="Frontend" skills={skillsByCat.frontend} onCardClick={openModal} />
        <CategorySection title="Backend" skills={skillsByCat.backend} onCardClick={openModal} />
        <CategorySection title="Data Analytics" skills={skillsByCat.data} onCardClick={openModal} />

      </div>

      {selectedSkill && (
        <div 
          className={`fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${isModalOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={closeModal}
        >
          <div 
            className={`bg-gray-800 rounded-lg shadow-2xl max-w-lg w-full mx-auto p-6 sm:p-8 relative transition-transform duration-300 ${isModalOpen ? 'scale-100' : 'scale-95'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors z-10">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <div className="flex items-center mb-6">
              <Image src={selectedSkill.logo} alt={`${selectedSkill.name} logo`} width={40} height={40} className="h-10 w-10 mr-4 object-contain" />
              <h3 className="text-2xl sm:text-3xl font-bold text-white">{selectedSkill.name}</h3>
            </div>
            <div className="space-y-4 sm:space-y-5">
              {selectedSkill.examples.map((example, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-bold text-base sm:text-lg text-gray-200">{example.title}</h4>
                  <p className="text-sm sm:text-base text-gray-400">{example.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Skills;
