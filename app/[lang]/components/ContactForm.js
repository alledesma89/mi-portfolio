'use client';

import React from "react";
import { FaWhatsapp, FaPhone, FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";
import { useDictionary } from "./DictionaryProvider";

const ContactForm = () => {
  const dictionary = useDictionary() || {};
  const phone = dictionary.contact.whatsapp || "622281415";
  const phoneDigits = phone.replace(/[^0-9+]/g, '') || '34622281415';
  const mail = dictionary.contact.email_address || 'ledesma89alberto@gmail.com';
  const displayName = (dictionary.hero && dictionary.hero.name) || 'Alberto Ledesma';

  const btn = dictionary.contact || {};
  const whatsappLabel = btn.button_whatsapp || 'WhatsApp';
  const callLabel = btn.button_call || 'Call';
  const emailLabel = btn.button_email || 'Email';
  const linkedinLabel = btn.button_linkedin || 'LinkedIn';
  const githubLabel = btn.button_github || 'GitHub';

  const openLink = (url) => {
    try { window.open(url, '_blank', 'noopener'); } catch (e) { window.location.href = url; }
  };

  return (
    <section className="py-16 sm:py-20 bg-gray-900 text-white" id="contacto">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-blue-400">{dictionary.contact.title}</h2>
  <p className="text-xl font-semibold text-white mb-6">{displayName}</p>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          <button
            onClick={() => openLink(`https://wa.me/${phoneDigits}`)}
            className="flex flex-col items-center justify-center bg-green-600 hover:bg-green-700 transition rounded-lg p-4"
            aria-label={whatsappLabel}
          >
            <FaWhatsapp className="text-white text-2xl mb-2" />
            <span className="text-sm">{whatsappLabel}</span>
          </button>

          <button
            onClick={() => (window.location.href = `tel:${phoneDigits}`)}
            className="flex flex-col items-center justify-center bg-blue-600 hover:bg-blue-700 transition rounded-lg p-4"
            aria-label={callLabel}
          >
            <FaPhone className="text-white text-2xl mb-2" />
            <span className="text-sm">{callLabel}</span>
          </button>

          <button
            onClick={() => (window.location.href = `mailto:${mail}`)}
            className="flex flex-col items-center justify-center bg-red-500 hover:bg-red-600 transition rounded-lg p-4"
            aria-label={emailLabel}
          >
            <FaEnvelope className="text-white text-2xl mb-2" />
            <span className="text-sm">{emailLabel}</span>
          </button>

          <button
            onClick={() => openLink('https://www.linkedin.com/in/alberto-ledesma-ollega-6727a651/')}
            className="flex flex-col items-center justify-center bg-white/10 hover:bg-white/20 transition rounded-lg p-4"
            aria-label={linkedinLabel}
          >
            <FaLinkedin className="text-blue-400 text-2xl mb-2" />
            <span className="text-sm">{linkedinLabel}</span>
          </button>

          <button
            onClick={() => openLink('https://github.com/alledesma89/')}
            className="flex flex-col items-center justify-center bg-white/10 hover:bg-white/20 transition rounded-lg p-4"
            aria-label={githubLabel}
          >
            <FaGithub className="text-gray-200 text-2xl mb-2" />
            <span className="text-sm">{githubLabel}</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;