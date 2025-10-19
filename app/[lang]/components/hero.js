'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Logo from './Logo';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useDictionary } from './DictionaryProvider';
import Interview from './Interview';

// technologies will be built dynamically inside the Hero component from the dictionary

const TechBubble = ({ tech, index = 0 }) => {
    const [hovered, setHovered] = useState(false);

    // deterministic motion params based on index (no randomness in render)
    const baseDuration = 10 + (index % 5) * 2; // 10-18s
    const phase = (index % 7) * 0.15;
    // orbit parameters provided by the tech object
    const orbitRadius = tech.orbitRadius || (30 + (index % 4) * 8); // px
    const baseAngle = typeof tech.angle === 'number' ? tech.angle : 0; // radians

    const slug = tech.name ? tech.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '') : '';

    return (
        <motion.div
            style={{
                    position: 'absolute',
                    top: tech.position.top,
                    left: tech.position.left,
                    pointerEvents: 'auto',
                    zIndex: 15,
                }}
                animate={{
                    // build circular keyframes around baseAngle
                    x: (() => {
                        const steps = 8;
                        const arr = [];
                        for (let k = 0; k < steps; k++) {
                            const t = baseAngle + (k * (2 * Math.PI) / steps);
                            arr.push(Math.cos(t) * orbitRadius);
                        }
                        // close loop
                        arr.push(Math.cos(baseAngle) * orbitRadius);
                        return arr;
                    })(),
                    y: (() => {
                        const steps = 8;
                        const arr = [];
                        for (let k = 0; k < steps; k++) {
                            const t = baseAngle + (k * (2 * Math.PI) / steps);
                            arr.push(Math.sin(t) * orbitRadius);
                        }
                        arr.push(Math.sin(baseAngle) * orbitRadius);
                        return arr;
                    })(),
                    rotate: [0, 2, -2, 0],
                }}
                transition={{
                    duration: baseDuration,
                    ease: 'linear',
                    repeat: Infinity,
                    repeatType: 'loop',
                    delay: phase,
                }}
        >
            <motion.div
                role="button"
                tabIndex={0}
                onClick={() => {
                    const el = document.getElementById('skill-' + slug);
                    if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        el.focus && el.focus();
                        try { window.dispatchEvent(new CustomEvent('highlight-skill', { detail: slug })); } catch (e) {}
                    } else {
                        const sec = document.getElementById('skills');
                        if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="flex items-center justify-center cursor-pointer"
                whileHover={{ scale: 1.08 }}
            >
                <div style={{ borderRadius: 9999, padding: 6 }}>
                    <div style={{ width: tech.size / 3, height: tech.size / 3, borderRadius: 9999, background: tech.color, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 180ms ease' }}>
                        {/* show logo only on hover */}
                            <div style={{ opacity: hovered ? 1 : 0, transition: 'opacity 160ms ease', background: '#fff', borderRadius: 9999, padding: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Logo src={tech.logo} alt={tech.name} size={tech.logoDisplaySize || Math.floor(tech.size / 3)} frame={false} />
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const AnimatedText = ({ text, as: Component = 'div', className, stagger = 0.05 }) => {
    const variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: stagger,
            },
        },
    };

    const letterVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <Component className={className}>
            <motion.span variants={variants} initial="hidden" animate="visible">
                {text.split('').map((char, index) => (
                    <motion.span
                        key={index}
                        className="inline-block"
                        variants={letterVariants}
                        whileHover={{ scale: 1.1, color: '#93c5fd' }}
                        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                ))}
            </motion.span>
        </Component>
    );
};

const AnimatedWords = ({ text, as: Component = 'p', className }) => {
    const words = text.split(' ');

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.5 * i },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", damping: 12, stiffness: 100 },
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: { type: "spring", damping: 12, stiffness: 100 },
        },
    };

    return (
        <Component className={className}>
            <motion.span variants={container} initial="hidden" animate="visible">
                {words.map((word, index) => (
                    <motion.span
                        key={index}
                        style={{ display: "inline-block", marginRight: "0.5em" }}
                        variants={child}
                    >
                        {word}
                    </motion.span>
                ))}
            </motion.span>
        </Component>
    );
};


const Hero = () => {
    const dictionary = useDictionary();
    // Build technologies list dynamically from dictionary to include all skills
    const skillsObj = dictionary?.skills?.skillsByCat || { frontend: [], backend: [], data: [] };
    const allSkills = [
        ...(skillsObj.frontend || []).map(s => ({ ...s, category: 'frontend' })),
        ...(skillsObj.backend || []).map(s => ({ ...s, category: 'backend' })),
        ...(skillsObj.data || []).map(s => ({ ...s, category: 'data' })),
    ];

    // simple color map by category, can be extended per skill
    const categoryColor = { frontend: '#06b6d4', backend: '#111827', data: '#4285F4' };

    // explicit color map per skill name (lowercased)
    const skillColorMap = {
        'react': '#61DAFB',
        'next.js': '#111827',
        'nextjs': '#111827',
        'angular': '#dd1b16',
        'node.js': '#3C873A',
        'nodejs': '#3C873A',
        'javascript': '#F7DF1E',
        'tailwind css': '#06B6D4',
        'tailwind': '#06B6D4',
        'google cloud': '#4285F4',
        'aws': '#FF9900',
        'vue.js': '#3fb27f',
        'vue': '#3fb27f',
        'docker': '#2496ED',
        'postgresql': '#336791',
        'postgres': '#336791',
    };

        // deterministic dispersed positions using angle + radius (golden-like distribution)
        const technologies = allSkills.map((s, i) => {
            const goldenAngle = 137.508; // degrees
            const angleDeg = (i * goldenAngle) % 360;
            const angle = (angleDeg * Math.PI) / 180;
            // radius between 12% and 42% depending on index (deterministic via sin)
            const radius = 12 + Math.abs(Math.sin(i * 12.9898)) * 30; // percent
            // center near the title/subtitle area (slightly upper center)
            const cx = 50; // center x percent
            const cy = 36; // center y percent moved upwards to sit around title/subtitle
            let top = cy + radius * Math.sin(angle);
            let left = cx + radius * Math.cos(angle);
            // keep inside visible bounds
            top = Math.max(6, Math.min(94, top));
            left = Math.max(6, Math.min(94, left));

            const key = (s.name || '').toLowerCase();
            const color = skillColorMap[key] || s.color || categoryColor[s.category] || '#e5e7eb';
            const textColor = (['#111827', '#0f172a', '#3C873A', '#336791'].includes(color.toLowerCase()) ? '#ffffff' : '#0f172a');

            // compute an initial orbit angle in radians and orbit radius in pixels
            const angleRad = angle; // already in radians
            const orbitRadius = 32 + ((i % 5) * 6); // px, deterministic

            const baseSize = s.size || 110;
            const logoDisplaySize = s.logoSize || Math.floor(baseSize / 3);

            // bump HeyGen logo a un tamaño mayor para mejor visibilidad
            if ((s.name || '').toLowerCase().includes('heygen')) {
                // increase logo size for visibility
                s.logoSize = s.logoSize || 120;
            }

            return {
                name: s.name,
                logo: s.logo,
                size: baseSize,
                logoDisplaySize,
                position: { top: `${top}%`, left: `${left}%` },
                color,
                textColor,
                angle: angleRad,
                orbitRadius,
            };
        });
    const [isInterviewOpen, setIsInterviewOpen] = useState(false);
    const [showAvatar, setShowAvatar] = useState(true);

    const openInterview = () => setIsInterviewOpen(true);
    const closeInterview = () => setIsInterviewOpen(false);

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
        <>
            <div className="relative h-screen flex flex-col items-center justify-center text-center px-5 overflow-hidden" id="hero">
                {/* Background video removed per request */}

                <div className="absolute inset-0 z-0 w-full h-full overflow-hidden hidden md:block">
                    {technologies.map((tech, i) => (
                        <TechBubble key={tech.name + '-' + i} tech={tech} index={i} />
                    ))}
                </div>

                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 z-10 pointer-events-none"></div>

                <div className="relative z-20 flex flex-col items-center">
                    <AnimatedText 
                        as="h1" 
                        text={dictionary.hero.name} 
                        className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white leading-tight mb-4 font-geist-mono"
                    />
                    <div className="bg-white/10 border border-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
                        <AnimatedWords 
                            as="p" 
                            text={dictionary.hero.title} 
                            className="text-xl sm:text-2xl md:text-3xl font-light text-gray-200"
                        />
                    </div>



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
                                    onClick={openInterview}
                                    className="cursor-pointer bg-blue-600 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                                >
                                    {dictionary.hero.interview_button}
                                </button>
                                    <div className="flex items-center">
                                    <Logo
                                        src="/media/avatarong.png"
                                        alt="Avatar Assistant"
                                        size={96}
                                        className="shadow-2xl"
                                        frame={false}
                                        circle={true}
                                    />
                                    </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            {isInterviewOpen && <Interview onClose={closeInterview} />}
        </>
    );
};

export default Hero;