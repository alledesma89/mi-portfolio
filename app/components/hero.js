'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Expanded list of technologies
const technologies = [
  { name: 'React', logo: '/media/react.svg', size: 110, position: { top: '15%', left: '10%' } },
  { name: 'Next.js', logo: '/media/next-js.png', size: 90, position: { top: '20%', left: '80%' } },
  { name: 'Angular', logo: '/media/angular.png', size: 100, position: { top: '70%', left: '15%' } },
  { name: 'Node.js', logo: '/media/nodejs.svg', size: 120, position: { top: '65%', left: '85%' } },
  { name: 'JavaScript', logo: '/media/javascript.svg', size: 80, position: { top: '50%', left: '50%' } },
  { name: 'Tailwind CSS', logo: '/media/tailwind.svg', size: 110, position: { top: '85%', left: '45%' } },
  { name: 'Google Cloud', logo: '/media/google-cloud.jpg', size: 100, position: { top: '5%', left: '40%' } },
  { name: 'AWS', logo: '/media/aws.png', size: 120, position: { top: '40%', left: '20%' } },
  { name: 'Vue.js', logo: '/media/Vue.svg', size: 90, position: { top: '50%', left: '70%' } },
];

const TechBubble = ({ tech }) => {
  const duration = Math.random() * 10 + 15; // Random duration between 15 and 25 seconds
  const delay = Math.random() * 5; // Random delay

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: tech.position.top,
        left: tech.position.left,
      }}
      animate={{
        y: ['0rem', '1.5rem', '0rem'],
        x: ['0rem', '-1rem', '0rem'],
      }}
      transition={{
        duration: duration,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror",
        delay: delay,
      }}
    >
        <div className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm p-3 rounded-full shadow-lg">
            <Image src={tech.logo} alt={tech.name} width={tech.size / 3} height={tech.size / 3} className="object-contain" />
            <span className="text-white font-semibold text-sm pr-2">{tech.name}</span>
        </div>
    </motion.div>
  );
};

const Hero = ({ onOpenInterview }) => {
  const [showAvatar, setShowAvatar] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowAvatar(window.scrollY < window.innerHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center px-5 overflow-hidden" id="hero">
      {/* Video Background */}
      <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover z-0">
        <source src="/media/cubo.mp4" type="video/mp4" />
        Tu navegador no soporta la etiqueta de video.
      </video>

      {/* Floating Tech Bubbles - Behind Overlay */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        {technologies.map((tech) => (
          <TechBubble key={tech.name} tech={tech} />
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-4">
          Alberto Ledesma
        </h1>
        <p className="text-2xl md:text-3xl font-light text-gray-300 mb-8">
          Full-Stack Developer
        </p>
      </div>

      {/* Avatar Assistant CTA */}
      <AnimatePresence>
        {showAvatar && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-10 right-10 z-30 flex items-end gap-4"
          >
            <button 
              onClick={onOpenInterview}
              className="cursor-pointer bg-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              Haz tu Entrevista Conmigo
            </button>
            <Image 
              src="/media/avatarong.png" 
              alt="Avatar Assistant" 
              width={120} 
              height={120} 
              className="rounded-full border-4 border-blue-500 shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hero;
