'use client';

import { useState, useEffect } from 'react';
// Image handled via Logo for consistent path handling
import Logo from './Logo';
import { useDictionary } from './DictionaryProvider';

const CategorySection = ({ title, skills, onCardClick, isData = false }) => (
  <div className="mb-12 sm:mb-16">
    <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-blue-400">{title}</h3>
    <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
      {skills.map((skill) => {
        // treat Data Analytics category as special to apply white/translucent cards
        const isSpecial = skill.specialStyle || isData;
        const slug = skill.name ? skill.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '') : '';
        const cardBase = isSpecial
          ? 'group bg-white/70 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-white/20 flex flex-col w-full sm:w-[48%] lg:w-[30%]'
          : 'group bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-gray-700 hover:border-blue-500 flex flex-col w-full sm:w-[48%] lg:w-[30%]';
        const titleClasses = isSpecial ? 'text-lg sm:text-xl font-semibold text-gray-800' : 'text-lg sm:text-xl font-semibold text-gray-200';
        const experienceClasses = isSpecial ? 'text-sm sm:text-md font-bold text-blue-600' : 'text-sm sm:text-md font-bold text-blue-400';
        const versionsClasses = isSpecial ? 'text-xs sm:text-sm text-gray-600 mt-1' : 'text-xs sm:text-sm text-gray-400 mt-1';
        const borderClasses = isSpecial ? 'border-t border-white/30' : 'border-t border-gray-700';

        return (
          <SkillCard
            key={skill.name}
            skill={skill}
            slug={slug}
            baseClasses={cardBase}
            titleClasses={titleClasses}
            experienceClasses={experienceClasses}
            versionsClasses={versionsClasses}
            borderClasses={borderClasses}
            onCardClick={onCardClick}
          />
        );
      })}
    </div>
  </div>
);

const SkillCard = ({ skill, slug, baseClasses, titleClasses, experienceClasses, versionsClasses, borderClasses, onCardClick }) => {
  const [highlighted, setHighlighted] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      if (!e?.detail) return;
      if (e.detail === slug) {
        setHighlighted(true);
        setTimeout(() => setHighlighted(false), 2200);
      }
    };
    window.addEventListener('highlight-skill', handler);
    return () => window.removeEventListener('highlight-skill', handler);
  }, [slug]);

  return (
    <div
      id={`skill-${slug}`}
      tabIndex={-1}
      className={`${baseClasses} ${highlighted ? 'ring-4 ring-blue-400/40' : ''}`}
      onClick={() => onCardClick(skill)}
    >
      <div className="flex-grow flex flex-col items-center text-center">
        <Logo src={skill.logo} alt={`${skill.name} logo`} size={56} className={`h-14 w-14 mb-4 transition-all duration-300`} frame={false} />
        <h3 className={titleClasses}>{skill.name}</h3>
      </div>
      <div className={`mt-4 pt-4 ${borderClasses} text-center`}>
          <p className={experienceClasses}>{skill.experience}</p>
          <p className={versionsClasses}>{skill.versions}</p>
      </div>
    </div>
  );
};

const Skills = () => {
  const dictionary = useDictionary() || {};
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

  // Defensive defaults: ensure dictionary.skills and skillsByCat exist
  const skillsObj = dictionary.skills || {};
  const skillsByCat = skillsObj.skillsByCat || { frontend: [], backend: [], data: [] };

  return (
    <section className="py-16 sm:py-20 bg-gray-900" id="skills">
      <div className="container mx-auto px-4">
  <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 text-white">{skillsObj.title || ''}</h2>

  <CategorySection title={skillsObj.frontend || ''} skills={skillsByCat.frontend} onCardClick={openModal} />
  <CategorySection title={skillsObj.backend || ''} skills={skillsByCat.backend} onCardClick={openModal} />
  <CategorySection title={skillsObj.data_analytics || ''} skills={skillsByCat.data} onCardClick={openModal} isData={true} />

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
              <Logo src={selectedSkill.logo} alt={`${selectedSkill.name} logo`} size={40} className="h-10 w-10 mr-4 object-contain" frame={false} />
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