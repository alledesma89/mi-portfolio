'use client';

import { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import jsPDF from 'jspdf';
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone } from 'react-icons/fa';
import { useDictionary } from './DictionaryProvider';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sections = [
  { id: 'hero', title: 'home' },
  { id: 'sobremi', title: 'about' },
  { id: 'experiencia', title: 'experience' },
  { id: 'skills', title: 'skills' },
  { id: 'contacto', title: 'contact' },
];

const Navbar = () => {
  const dictionary = useDictionary();
  const pathname = usePathname();
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

  const handleDownloadCV = () => {
    const doc = new jsPDF();

    // Colors
    const primaryColor = '#2c3e50';
    const secondaryColor = '#3498db';
    const textColor = '#34495e';

    // Fonts
    doc.setFont('helvetica');

    const img = new Image();
    img.src = '/media/FOTOCV.jpg';
    img.onload = () => {
      // Header
      doc.setFillColor(primaryColor);
      doc.rect(0, 0, 210, 50, 'F');
      doc.setTextColor('#ffffff');
      doc.setFontSize(28);
      doc.setFont('helvetica', 'bold');
      doc.text('Alberto Ledesma Ollega', 20, 25);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'normal');
      doc.text('FULL STACK DEVELOPER', 20, 35);

      doc.addImage(img, 'JPEG', 150, 5, 40, 40);

      // Contact Info
      doc.setTextColor('#ffffff');
      doc.setFontSize(8);
      doc.text('ledesma89alberto@gmail.com', 20, 45);
      doc.text('622 281 415', 80, 45);
      doc.text('Sevilla', 100, 45);

      // Main Content
      let y = 60;

      // Summary
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(primaryColor);
      doc.text(dictionary.about.title, 20, y);
      y += 8;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(textColor);
      const summaryLines = doc.splitTextToSize(
        dictionary.about.description.replace(/<[^>]*>?/gm, ''),
        170
      );
      doc.text(summaryLines, 20, y);
      y += summaryLines.length * 5 + 10;

      // Skills
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(primaryColor);
      doc.text(dictionary.skills.title, 20, y);
      y += 8;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(textColor);
      doc.text(`Frontend: ${dictionary.skills.skillsByCat.frontend.map(skill => skill.name).join(', ')}`, 20, y);
      y += 5;
      doc.text(`Backend: ${dictionary.skills.skillsByCat.backend.map(skill => skill.name).join(', ')}`, 20, y);
      y += 5;
      doc.text(`Data: ${dictionary.skills.skillsByCat.data.map(skill => skill.name).join(', ')}`, 20, y);
      y += 10;

      // Experience
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(primaryColor);
      doc.text(dictionary.experience.title, 20, y);
      y += 8;

      const experience = dictionary.experience.data;

      experience.forEach(exp => {
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(secondaryColor);
        doc.text(exp.title, 20, y);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(textColor);
        doc.text(`${exp.company} | ${exp.dates}`, 20, y + 5);
        const descLines = doc.splitTextToSize(exp.description, 170);
        doc.text(descLines, 20, y + 10);
        y += descLines.length * 5 + 15;
      });

      // Education
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(primaryColor);
      doc.text(dictionary.about.education_history, 20, y);
      y += 8;

      const education = dictionary.about.education;

      education.forEach(edu => {
        if (y > 280) {
          doc.addPage();
          y = 20;
        }
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(secondaryColor);
        doc.text(edu.title, 20, y);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(textColor);
        doc.text(`${edu.place} | ${edu.year}`, 20, y + 5);
        y += 12;
      });

      doc.save('CV_ALBERTO_LEDESMA.pdf');
    };
  };

  return (
    <>
      <nav className={`w-full fixed top-0 left-0 z-50 flex items-center justify-between px-6 py-4 transition-colors duration-300 ${scrolled ? 'bg-gray-800/50 backdrop-blur-sm' : 'bg-transparent'}`}>
        <div className="hidden md:flex items-center gap-6">
          {sections.map((section) => (
            <ScrollLink
              key={section.id}
              to={section.id}
              smooth={true}
              duration={500}
              className="cursor-pointer font-semibold text-white text-lg hover:text-blue-400 transition-colors"
            >
              {dictionary.navbar[section.title]}
            </ScrollLink>
          ))}
          <button
            onClick={handleDownloadCV}
            className="bg-yellow-400 text-black font-bold py-2 px-4 rounded hover:bg-yellow-500 transition-colors"
          >
            {dictionary.navbar.download_cv}
          </button>
          <div className="flex gap-2">
            <Link href={pathname.replace('/en', '/es')} locale="es" className={`font-semibold ${pathname.startsWith('/es') ? 'text-blue-400' : 'text-white'}`}>ES</Link>
            <Link href={pathname.replace('/es', '/en')} locale="en" className={`font-semibold ${pathname.startsWith('/en') ? 'text-blue-400' : 'text-white'}`}>EN</Link>
          </div>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="z-50 text-white focus:outline-none">
            <div className="w-6 h-6 flex flex-col justify-between items-center">
              <span className={`block w-full h-0.5 bg-white transform transition duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
              <span className={`block w-full h-0.5 bg-white transition duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-full h-0.5 bg-white transform transition duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Sidebar Menu */}
      <div className={`fixed top-0 right-0 h-full bg-gray-900 bg-opacity-95 backdrop-blur-lg w-64 transform transition-transform duration-300 ease-in-out z-40 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
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
              {dictionary.navbar[section.title]}
            </ScrollLink>
          ))}
          <button
            onClick={handleDownloadCV}
            className="bg-yellow-400 text-black font-bold py-2 px-4 rounded hover:bg-yellow-500 transition-colors mt-4"
          >
            {dictionary.navbar.download_cv}
          </button>
          <div className="flex gap-2 mt-4">
            <Link href={pathname.replace('/en', '/es')} locale="es" className={`font-semibold ${pathname.startsWith('/es') ? 'text-blue-400' : 'text-white'}`}>ES</Link>
            <Link href={pathname.replace('/es', '/en')} locale="en" className={`font-semibold ${pathname.startsWith('/en') ? 'text-blue-400' : 'text-white'}`}>EN</Link>
          </div>
        </div>
      </div>

      {/* Overlay for closing menu */}
      {isMenuOpen && (
        <div onClick={toggleMenu} className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"></div>
      )}
    </>
  );
};

export default Navbar;