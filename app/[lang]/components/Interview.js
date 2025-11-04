'use client';

import { useState, useEffect } from 'react';
import Logo from './Logo';
import { motion, AnimatePresence } from 'framer-motion';
import { useDictionary } from './DictionaryProvider';

const interviewData = {
  "Experiencia y Rol": [
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
    {
        question: 'Háblame de un reto técnico complicado que hayas resuelto.',
        answer: 'En un proyecto, nos enfrentamos a un problema de rendimiento crítico en una aplicación de alto tráfico. Tras un análisis exhaustivo, descubrimos un cuello de botella en la base de datos causado por consultas ineficientes. Lideré la refactorización de las consultas, introduje un sistema de caché con Redis y optimicé los índices de la base de datos, logrando una reducción del 90% en los tiempos de respuesta.'
    },
    {
        question: '¿Cómo gestionas los desacuerdos técnicos dentro de tu equipo?',
        answer: 'Fomento un ambiente de debate abierto y respetuoso. Escucho todas las perspectivas, pido datos y pruebas de concepto para respaldar los argumentos y, si no hay un consenso claro, tomamos una decisión basada en los objetivos del proyecto y la mantenibilidad a largo plazo. Creo que los desacuerdos, bien gestionados, llevan a mejores soluciones.'
    }
  ],
  "Frontend": [
    {
      question: '¿Por qué elegirías Next.js sobre React para un nuevo proyecto?',
      answer: 'Depende del proyecto, pero a menudo elijo Next.js por las optimizaciones que ofrece de serie, como el renderizado en servidor (SSR) y la generación de sitios estáticos (SSG), que son cruciales para el SEO y el rendimiento inicial. Además, su sistema de enrutamiento basado en ficheros y las API routes integradas agilizan mucho el desarrollo Full-Stack.'
    },
    {
      question: '¿Qué estrategias de optimización de rendimiento aplicas en el frontend?',
      answer: 'Sigo varias estrategias. Aplico \'lazy loading\' para imágenes y componentes, uso `React.memo` y `useCallback` para evitar re-renders innecesarios, optimizo el tamaño de los bundles de JavaScript y me aseguro de que las imágenes estén comprimidas y en formatos modernos. También presto mucha atención a las Core Web Vitals de Google.'
    },
    {
        question: '¿Cuál es tu experiencia con state management en React?',
        answer: 'He trabajado con varias librerías. Empecé con Redux para aplicaciones grandes, pero más recientemente prefiero Zustand o incluso los hooks nativos de React (useContext, useReducer) para casos más sencillos. Zustand me gusta por su simplicidad y su mínima configuración, sin sacrificar la potencia para manejar estados complejos.'
    },
    {
        question: '¿Cómo manejas la accesibilidad (a11y) en tus proyectos?',
        answer: 'La accesibilidad es fundamental. Me aseguro de usar HTML semántico, gestionar el foco correctamente en las interacciones, proporcionar atributos ARIA cuando es necesario y garantizar un buen contraste de colores. También utilizo herramientas como Axe para auditar y corregir problemas de accesibilidad durante el desarrollo.'
    }
  ],
  "Backend": [
    {
        question: 'Describe tu experiencia construyendo APIs RESTful con Node.js.',
        answer: 'He diseñado y construido numerosas APIs RESTful con Node.js y Express. Sigo las mejores prácticas, como el uso de verbos HTTP correctos, códigos de estado apropiados y una estructura de rutas clara. También implemento validación de datos de entrada con librerías como Joi o Zod para asegurar la integridad de los datos.'
    },
    {
        question: '¿Cómo has manejado la autenticación y autorización?',
        answer: 'He implementado sistemas de autenticación basados en tokens JWT (JSON Web Tokens). El flujo típico es: el usuario se loguea, recibe un token firmado que se almacena de forma segura en el cliente, y lo envía en las cabeceras de las peticiones posteriores. Para la autorización, implemento middlewares que verifican los roles y permisos del usuario antes de dar acceso a una ruta protegida.'
    },
    {
        question: '¿Qué tipo de bases de datos has utilizado?',
        answer: 'Tengo experiencia tanto con bases de datos SQL como NoSQL. He trabajado con PostgreSQL y MySQL para datos relacionales, donde la consistencia es clave. Para datos más flexibles y escalables, he usado MongoDB y Firestore. La elección siempre depende de los requisitos específicos del proyecto.'
    }
  ],
  "Cloud & DevOps": [
    {
      question: 'Describe tu experiencia con CI/CD.',
      answer: 'Tengo experiencia creando pipelines de Integración Continua y Despliegue Continuo. He utilizado herramientas como Google Cloud Build y GitHub Actions para automatizar los procesos de testing, build y despliegue en entornos de staging y producción. Esto reduce errores manuales y acelera la entrega de nuevas funcionalidades.'
    },
    {
      question: '¿Qué servicios de AWS o Google Cloud has utilizado más?',
      answer: 'En Google Cloud, he trabajado extensamente con Cloud Run y Compute Engine para el despliegue de aplicaciones, y con Cloud SQL y Firestore para bases de datos. En AWS, mis herramientas más habituales son EC2 para servidores virtuales, S3 para almacenamiento de archivos estáticos y Lambda para funciones serverless.'
    },
    {
        question: 'Explica tu experiencia con Docker.',
        answer: 'Uso Docker a diario. Me permite crear entornos de desarrollo consistentes y reproducibles, eliminando el clásico \'en mi máquina funciona\'. Defino los servicios de la aplicación (backend, frontend, base de datos) en un fichero `docker-compose.yml`, lo que facilita enormemente la configuración inicial para cualquier miembro del equipo y el despliegue posterior.'
    }
  ],
  "Formación y Crecimiento": [
    {
      question: '¿Por qué te estás formando en Análisis de Datos?',
      answer: 'Porque veo el análisis de datos como una evolución natural de mi perfil Full-Stack. Entender el comportamiento del usuario a través de los datos me permite construir mejores productos y tomar decisiones de desarrollo más estratégicas. Mi objetivo es poder cerrar el ciclo completo: construir la aplicación, medir su impacto y usar los datos para mejorarla continuamente.'
    },
    {
      question: '¿Cómo te mantienes actualizado con las nuevas tecnologías?',
      answer: 'Soy muy proactivo. Sigo blogs de referencia, estoy suscrito a newsletters de tecnología, realizo cursos online en plataformas como Coursera o Udemy y, sobre todo, aplico lo que aprendo en proyectos personales. Creo que la mejor forma de aprender es construyendo.'
    },
    {
        question: '¿Qué es lo próximo que te gustaría aprender?',
        answer: 'Ahora mismo estoy muy interesado en profundizar en Arquitecturas de Microservicios y en herramientas de orquestación como Kubernetes. Creo que es el siguiente paso lógico para construir aplicaciones más escalables y resilientes, y complementa muy bien mi experiencia en DevOps.'
    }
  ],
  "Personal": [
    {
        question: '¿Qué te motiva a trabajar en el sector tecnológico?',
        answer: 'Me apasiona resolver problemas y crear cosas que aporten valor real a las personas. La tecnología es una herramienta increíblemente poderosa para lograrlo, y el hecho de que esté en constante evolución hace que nunca deje de aprender y de enfrentarme a nuevos retos.'
    },
    {
        question: '¿Cuál es un proyecto personal del que te sientas orgulloso?',
        answer: 'Estoy desarrollando una pequeña aplicación para ayudar a gestionar las tareas y gastos del hogar. Aunque es un proyecto sencillo, me ha permitido experimentar con nuevas tecnologías que no siempre puedo usar en el trabajo, como SvelteKit y bases de datos en el borde (edge). Me sirve como mi propio laboratorio de pruebas.'
    },
    {
        question: '¿Cómo te organizas para gestionar múltiples tareas?',
        answer: 'Utilizo una mezcla de metodologías. Me gusta planificar mi semana con antelación, dividiendo las grandes tareas en subtareas más pequeñas y manejables. Priorizo usando la matriz de Eisenhower (urgente/importante) y me apoyo en herramientas como Trello o Notion para tener una visión clara de lo que tengo que hacer.'
    }
  ]
};

const Interview = ({ onClose }) => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const dictionary = useDictionary() || {};
  const interviewContent = dictionary.interview || interviewData;

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
          <h3 className="font-bold text-xl mb-4 text-gray-700">{dictionary?.interview_title || 'Preguntas:'}</h3>
          <div className="flex flex-col gap-4 max-h-[450px] overflow-y-auto pr-2">
            {Object.entries(interviewContent).map(([category, questions]) => (
              <div key={category}>
                <h4 className="font-bold text-md mb-2 text-blue-600 border-b-2 border-blue-200 pb-1">{category}</h4>
                <div className="flex flex-col gap-3 mt-3">
                  {questions.map((item, index) => (
                    <button 
                      key={index}
                      onClick={() => setSelectedQuestion(item)}
                      className={`text-left w-full p-3 rounded-md transition-colors text-sm font-semibold ${selectedQuestion?.question === item.question ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                      {item.question}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Columna de Respuesta (Chat) */}
        <div className="w-full lg:w-3/5 flex flex-col gap-4 mt-8 lg:mt-0">
            <h2 className="text-2xl font-bold text-center text-gray-800">{dictionary?.interview_header || 'Simulador de Entrevista'}</h2>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedQuestion ? selectedQuestion.question : 'initial'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="flex items-start gap-4 h-full"
              >
                <Logo
                  src="/media/avatarong.png"
                  alt="Avatar"
                  size={60}
                  className="mt-1 shadow-md flex-shrink-0"
                  frame={false}
                  circle={true}
                />
                <div className="bg-blue-500 text-white p-4 rounded-xl rounded-tl-none shadow-lg w-full h-full flex items-center">
                  <p>{selectedQuestion ? selectedQuestion.answer : (dictionary?.interview_intro || '¡Hola! Soy el asistente virtual de Alberto. Selecciona una pregunta para empezar la entrevista.')}</p>
                </div>
              </motion.div>
            </AnimatePresence>
        </div>

      </motion.div>
    </motion.div>
  );
};

export default Interview;
