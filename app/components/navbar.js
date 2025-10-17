'use client';

import { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';

const sections = [
  { id: 'hero', title: 'Inicio' },
  { id: 'sobremi', title: 'Sobre mí' },
  { id: 'experiencia', title: 'Experiencia' },
  { id: 'skills', title: 'Habilidades' },
  { id: 'contacto', title: 'Contacto' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className={`w-full fixed top-0 left-0 z-50 flex items-center justify-end px-6 py-4 transition-colors duration-300 ${scrolled ? 'bg-gray-800/50 backdrop-blur-sm' : 'bg-transparent'}`}>
        {/* Hamburger Menu Button */}
        <button onClick={toggleMenu} className="z-50 text-white focus:outline-none">
          <div className="w-6 h-6 flex flex-col justify-between items-center">
            <span className={`block w-full h-0.5 bg-white transform transition duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
            <span className={`block w-full h-0.5 bg-white transition duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-full h-0.5 bg-white transform transition duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
          </div>
        </button>
      </nav>

      {/* Sidebar Menu */}
      <div className={`fixed top-0 right-0 h-full bg-gray-900 bg-opacity-95 backdrop-blur-lg w-64 transform transition-transform duration-300 ease-in-out z-40 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col items-center justify-center h-full pt-20">
          {sections.map((section, index) => (
            <ScrollLink
              key={section.id}
              to={section.id}
              smooth={true}
              duration={500}
              onClick={handleLinkClick}
              className="cursor-pointer font-bold text-xl text-white my-3 py-2 px-4 text-center rounded-md transition-all duration-300 hover:bg-gray-700 hover:text-blue-400 transform hover:scale-105"
              style={{ transitionDelay: `${isMenuOpen ? index * 100 : 0}ms` }}
            >
              {section.title}
            </ScrollLink>
          ))}
        </div>
      </div>

      {/* Overlay for closing menu */}
      {isMenuOpen && (
        <div onClick={toggleMenu} className="fixed inset-0 bg-black bg-opacity-50 z-30"></div>
      )}
    </>
  );
};

export default Navbar;