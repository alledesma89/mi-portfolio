'use client';

import { Chrono } from 'react-chrono';
import { useDictionary } from './DictionaryProvider';
import { FaExternalLinkAlt, FaBriefcase } from 'react-icons/fa';

const ExperienceTimeline = () => {
  const dictionary = useDictionary();
  const { data: experienceData, title, visit_project } = dictionary.experience;

  const items = experienceData.map(job => ({
    title: job.dates,
    cardTitle: job.title,
    cardSubtitle: job.company,
  }));

  return (
    <section id="experiencia" className="bg-gray-50 text-gray-800 py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16">{title}</h2>
        <div style={{ width: '100%' }}>
          <Chrono
            items={items}
            mode="VERTICAL_ALTERNATING"
            theme={{
              primary: '#2563EB',
              secondary: '#F9FAFB',
              cardBgColor: 'white',
              titleColor: '#1F2937',
              titleColorActive: 'white',
            }}
            allowDynamicUpdate
            buttonTexts={{
              first: 'Primero',
              last: 'Último',
              next: 'Siguiente',
              previous: 'Anterior',
              slideshow: 'Presentación',
            }}
            localization={{
              cardReadMore: "Leer más",
            }}
          >
            <div className="chrono-icons">
              {experienceData.map((job, index) => (
                <div key={index} className="bg-blue-500 rounded-full h-8 w-8 flex items-center justify-center shadow-lg">
                    <FaBriefcase className="text-white" />
                </div>
              ))}
            </div>
            {experienceData.map((job, index) => (
              <div key={index} className="p-4">
                <p className="text-gray-700 text-base mb-4">{job.description}</p>
                <div className="flex flex-wrap gap-2">
                  {job.tech && Array.isArray(job.tech) && job.tech.map((tech, i) => (
                    <span key={i} className="bg-gray-200 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full transition-all duration-300 ease-in-out hover:bg-blue-500 hover:text-white">
                      {tech}
                    </span>
                  ))}
                </div>
                {job.link && (
                  <a
                    href={job.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors mt-4"
                  >
                    {visit_project} <FaExternalLinkAlt />
                  </a>
                )}
              </div>
            ))}
          </Chrono>
        </div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;