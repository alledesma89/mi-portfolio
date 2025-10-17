'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const interviewData = [
  // Experience & Role
  {
    question: '¿Puedes describir tu rol como Jefe Técnico en JUBILAME?',
    answer: 'Claro. En JUBILAME, mi rol principal era liderar un equipo de 5 desarrolladores. Más allá de programar con Angular, me encargaba de la arquitectura del sistema, la gestión de tareas y sprints con Jira, y la configuración de la infraestructura en Google Cloud. También implementé los entornos de desarrollo con Docker y supervisé los procesos de testing para asegurar la calidad del producto.'
  },
  {
    question: '¿Qué aportaste en el proyecto de Erescambio Marketing?',
    answer: 'Como Responsable Técnico, lideré un equipo pequeño para crear una solución innovadora. Desarrollamos una aplicación en React que se conectaba a WordPress como un Headless CMS. Esto permitía a los clientes finales, que no tenían conocimientos técnicos, gestionar el contenido de sus propias plataformas de forma muy intuitiva, dándoles una autonomía que antes no tenían.'
  },
  {
    question: '¿Cuál fue tu contribución principal en AMOVENS?',
    answer: 'En AMOVENS, mi foco estuvo en el frontend con React. Me dediqué a crear componentes reutilizables y a optimizar la interfaz de usuario. También tuve un rol importante en el debugging, identificando y solucionando errores para mejorar la estabilidad y la experiencia general del usuario en la aplicación principal.'
  },
  // Technical Skills
  {
    question: '¿Por qué elegirías Next.js sobre React para un nuevo proyecto?',
    answer: 'Depende del proyecto, pero a menudo elijo Next.js por las optimizaciones que ofrece de serie, como el renderizado en servidor (SSR) y la generación de sitios estáticos (SSG), que son cruciales para el SEO y el rendimiento inicial. Además, su sistema de enrutamiento basado en ficheros y las API routes integradas agilizan mucho el desarrollo Full-Stack.'
  },
  {
    question: '¿Qué estrategias de optimización de rendimiento aplicas en el frontend?',
    answer: 'Sigo varias estrategias. Aplico \'lazy loading\' para imágenes y componentes, uso `React.memo` y `useCallback` para evitar re-renders innecesarios, optimizo el tamaño de los bundles de JavaScript y me aseguro de que las imágenes estén comprimidas y en formatos modernos. También presto mucha atención a las Core Web Vitals de Google.'
  },
  {
    question: '¿Cómo aseguras la calidad y mantenibilidad del código?',
    answer: 'La clave es la consistencia y las buenas prácticas. Utilizo linters como ESLint, sigo guías de estilo, escribo código modular y bien comentado, y creo componentes reutilizables. En mis roles de liderazgo, he fomentado las revisiones de código (code reviews) en el equipo como una herramienta fundamental para compartir conocimiento y mantener una alta calidad.'
  },
  // Cloud & DevOps
  {
    question: 'Describe tu experiencia con CI/CD.',
    answer: 'Tengo experiencia creando pipelines de Integración Continua y Despliegue Continuo. He utilizado herramientas como Google Cloud Build y GitHub Actions para automatizar los procesos de testing, build y despliegue en entornos de staging y producción. Esto reduce errores manuales y acelera la entrega de nuevas funcionalidades.'
  },
  {
    question: '¿Qué servicios de AWS o Google Cloud has utilizado más?',
    answer: 'En Google Cloud, he trabajado extensamente con Cloud Run y Compute Engine para el despliegue de aplicaciones, y con Cloud SQL y Firestore para bases de datos. En AWS, mis herramientas más habituales son EC2 para servidores virtuales, S3 para almacenamiento de archivos estáticos y Lambda para funciones serverless.'
  },
  // Behavioral & Future
  {
    question: '¿Por qué te estás formando en Análisis de Datos?',
    answer: 'Porque veo el análisis de datos como una evolución natural de mi perfil Full-Stack. Entender el comportamiento del usuario a través de los datos me permite construir mejores productos y tomar decisiones de desarrollo más estratégicas. Mi objetivo es poder cerrar el ciclo completo: construir la aplicación, medir su impacto y usar los datos para mejorarla continuamente.'
  },
  {
    question: '¿Cómo te mantienes actualizado con las nuevas tecnologías?',
    answer: 'Soy muy proactivo. Sigo blogs de referencia, estoy suscrito a newsletters de tecnología, realizo cursos online en plataformas como Coursera o Udemy y, sobre todo, aplico lo que aprendo en proyectos personales. Creo que la mejor forma de aprender es construyendo.'
  },
  {
    question: '¿Cuál es tu rol ideal en un equipo de desarrollo?',
    answer: 'Disfruto tanto de los roles de contribuidor individual en desarrollos complejos como de los roles de liderazgo técnico. Mi rol ideal es aquel en el que puedo no solo aportar técnicamente, sino también guiar a otros miembros del equipo, participar en las decisiones de arquitectura y servir de puente entre las necesidades del producto y la implementación técnica.'
  }
];

const Interview = ({ onClose }) => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-gray-100 rounded-lg shadow-2xl max-w-4xl w-full mx-auto p-6 relative flex flex-col lg:flex-row gap-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors z-10">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        {/* Columna de Preguntas */}
        <div className="w-full lg:w-2/5 bg-white p-6 rounded-lg shadow-inner">
          <h3 className="font-bold text-xl mb-4 text-gray-700">Preguntas:</h3>
          <div className="flex flex-col gap-3 max-h-[450px] overflow-y-auto pr-2">
            {interviewData.map((item, index) => (
              <button 
                key={index}
                onClick={() => setSelectedQuestion(item)}
                className={`text-left w-full p-3 rounded-md transition-colors text-sm font-semibold ${selectedQuestion?.question === item.question ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                {item.question}
              </button>
            ))}
          </div>
        </div>

        {/* Columna de Respuesta (Chat) */}
        <div className="w-full lg:w-3/5 flex flex-col gap-4 mt-8 lg:mt-0">
            <h2 className="text-2xl font-bold text-center text-gray-800">Simulador de Entrevista</h2>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedQuestion ? selectedQuestion.question : 'initial'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="flex items-start gap-4 h-full"
              >
                <Image 
                  src="/media/avatarong.png" 
                  alt="Avatar" 
                  width={60} 
                  height={60} 
                  className="rounded-full border-2 border-blue-500 mt-1 shadow-md flex-shrink-0"
                />
                <div className="bg-blue-500 text-white p-4 rounded-xl rounded-tl-none shadow-lg w-full h-full flex items-center">
                  <p>{selectedQuestion ? selectedQuestion.answer : '¡Hola! Soy el asistente virtual de Alberto. Selecciona una pregunta para empezar la entrevista.'}</p>
                </div>
              </motion.div>
            </AnimatePresence>
        </div>

      </motion.div>
    </motion.div>
  );
};

export default Interview;