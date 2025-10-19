'use client';

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCode,
  FaUniversity,
  FaLinkedin,
  FaGithub,
  FaFacebookSquare,
  FaGraduationCap,
} from "react-icons/fa";
import Image from "next/image";
import { useDictionary } from "./DictionaryProvider";

const fotos = [
  "/media/foto1.jpg",
  "/media/foto2.jpg",
  "/media/foto3.jpg",
  "/media/foto4.jpg",
];

const SobreMi = () => {
  const dictionary = useDictionary();
  const [fotoActual, setFotoActual] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFotoActual((prev) => (prev + 1) % fotos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const formacion = dictionary.about.education;

  return (
    <section className="py-16 sm:py-20 bg-white text-gray-800" id="sobremi">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Columna de Imagen */}
          <div className="w-full md:w-1/3">
            <div className="relative h-[350px] sm:h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={fotoActual}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={fotos[fotoActual]}
                    alt={`Foto ${fotoActual + 1}`}
                    layout="fill"
                    objectFit="cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="flex justify-center mt-4 space-x-2">
              {fotos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setFotoActual(i)}
                  className={`w-3 h-3 rounded-full transition-colors ${fotoActual === i ? "bg-blue-600" : "bg-gray-300 hover:bg-gray-400"}`}
                />
              ))}
            </div>
          </div>

          {/* Columna de Texto */}
          <div className="w-full md:w-2/3 text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-blue-800">{dictionary.about.title}</h2>
            <p className="text-base sm:text-lg mb-6 leading-relaxed" dangerouslySetInnerHTML={{ __html: dictionary.about.description }} />
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6 mt-8">
                <button 
                    onClick={openModal}
                    className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2 w-full sm:w-auto justify-center"
                >
                    <FaGraduationCap /> {dictionary.about.view_education}
                </button>
                <div className="flex space-x-4">
                    <a
                      href="https://www.linkedin.com/in/alberto-ledesma-ollega-6727a651/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open('https://www.linkedin.com/in/alberto-ledesma-ollega-6727a651/', '_blank', 'noopener');
                      }}
                    >
                        <FaLinkedin className="text-blue-700 text-4xl hover:scale-110 transition-transform" />
                    </a>
                    <a
                      href="https://github.com/alledesma89/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open('https://github.com/alledesma89/', '_blank', 'noopener');
                      }}
                    >
                        <FaGithub className="text-gray-800 text-4xl hover:scale-110 transition-transform" />
                    </a>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Formación */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white rounded-lg shadow-2xl max-w-lg w-full mx-auto p-6 sm:p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
              <h3 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-6">{dictionary.about.education_history}</h3>
              <div className="space-y-6">
                {formacion.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-full hidden sm:block">
                        {i === 0 ? <FaUniversity className="text-blue-500 text-3xl" /> : <FaCode className="text-green-500 text-3xl" />}
                    </div>
                    <div>
                      <p className="font-bold text-base sm:text-lg text-gray-800">{item.title}</p>
                      <p className="text-sm sm:text-md text-gray-600 font-semibold">{item.place}</p>
                      <p className="text-xs sm:text-sm text-gray-700 mt-1">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default SobreMi;