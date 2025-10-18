'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const technologies = [
    { name: 'React', logo: '/media/react.svg', size: 110, position: { top: '15%', left: '10%' } },
    { name: 'Next.js', logo: '/media/Next-JS.png', size: 90, position: { top: '20%', left: '80%' } },
    { name: 'Angular', logo: '/media/angular.png', size: 100, position: { top: '70%', left: '15%' } },
    { name: 'Node.js', logo: '/media/nodejs.svg', size: 120, position: { top: '65%', left: '85%' } },
    { name: 'JavaScript', logo: '/media/javascript.svg', size: 80, position: { top: '50%', left: '50%' } },
    { name: 'Tailwind CSS', logo: '/media/tailwind.svg', size: 110, position: { top: '85%', left: '45%' } },
    { name: 'Google Cloud', logo: '/media/google-cloud.jpg', size: 100, position: { top: '5%', left: '40%' } },
    { name: 'AWS', logo: '/media/aws.png', size: 120, position: { top: '40%', left: '20%' } },
    { name: 'Vue.js', logo: '/media/Vue.svg', size: 90, position: { top: '50%', left: '70%' } },
];

const TechBubble = ({ tech }) => {
    const duration = Math.random() * 10 + 15;
    const delay = Math.random() * 5;

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
                <Image src={tech.logo} alt={tech.name} width={Math.floor(tech.size / 3)} height={Math.floor(tech.size / 3)} className="object-contain" />
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
        <div className="relative h-screen flex flex-col items-center justify-center text-center px-5 overflow-hidden" id="hero">
            <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover z-0">
                <source src="/media/cubo.mp4" type="video/mp4" />
                Tu navegador no soporta la etiqueta de video.
            </video>

            <div className="absolute inset-0 z-0 w-full h-full overflow-hidden hidden md:block">
                {technologies.map((tech) => (
                    <TechBubble key={tech.name} tech={tech} />
                ))}
            </div>

            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 z-10"></div>

            <div className="relative z-20 flex flex-col items-center">
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white leading-tight mb-4">
                    Alberto Ledesma
                </h1>
                <p className="text-xl sm:text-2xl md:text-3xl font-light text-gray-300 mb-8">
                    Full-Stack Developer
                </p>



                <AnimatePresence>
                    {showAvatar && (
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            transition={{ duration: 0.5 }}
                            className="fixed bottom-5 left-1/2 -translate-x-1/2 md:bottom-10 md:right-10 md:left-auto md:transform-none z-30 flex items-end gap-4"
                        >
                            <button
                                onClick={onOpenInterview}
                                className="cursor-pointer bg-blue-600 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                            >
                                Haz tu Entrevista Conmigo
                            </button>
                            <Image
                                src="/media/avatarong.png"
                                alt="Avatar Assistant"
                                width={80}
                                height={80}
                                className="rounded-full border-4 border-blue-500 shadow-2xl sm:w-[120px] sm:h-[120px]"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Hero;