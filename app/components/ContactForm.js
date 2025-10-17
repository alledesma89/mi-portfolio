'use client';

import React, { useState } from "react";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa"; // íconos

const opciones = [
  "Diseño Web",
  "Posicionamiento SEO",
  "Gestión Redes Sociales",
  "Tareas de Programación (Soporte Full Stack)",
  "Otros",
];

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    asunto: opciones[0],
    otroAsunto: "",
  });

  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAsuntoClick = (opcion) => {
    setFormData((prev) => ({
      ...prev,
      asunto: opcion,
      otroAsunto: opcion === "Otros" ? prev.otroAsunto : "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El formato del email no es válido.";
    }
    if (!formData.telefono.trim()) {
      newErrors.telefono = "El teléfono es obligatorio.";
    } else if (!/^\+?[\d\s-]{7,}$/.test(formData.telefono)) {
      newErrors.telefono = "El formato del teléfono no es válido.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(null);
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setErrors({});
    setEnviando(true);

    try {
      const res = await fetch(`${window.location.origin}/api/send-contact-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Error enviando email");

      setMensaje({
        type: "success",
        text: "Gracias por tu mensaje. Te contactaré pronto.",
      });
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        asunto: opciones[0],
        otroAsunto: "",
      });
    } catch (error) {
      setMensaje({
        type: "error",
        text: "Hubo un problema al enviar tu mensaje. Intenta de nuevo más tarde.",
      });
    }
    setEnviando(false);
  };

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-blue-400 text-center">Contacto</h2>
        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-8 rounded-xl shadow-lg">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col gap-5 flex-1">
              <div>
                <label htmlFor="nombre" className="block text-sm font-semibold text-gray-300 mb-1">Nombre<span className="text-red-500">*</span></label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tu nombre completo"
                  required
                />
                {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-1">Email<span className="text-red-500">*</span></label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="tu@email.com"
                  required
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="telefono" className="block text-sm font-semibold text-gray-300 mb-1">Teléfono<span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+34 600 123 456"
                  required
                />
                {errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>}
              </div>
            </div>

            <div className="flex flex-col flex-1">
              <label className="text-sm font-semibold text-gray-300 mb-2">Consulta sobre</label>
              <div className="flex flex-wrap gap-3">
                {opciones.map((opcion) => (
                  <button
                    key={opcion}
                    type="button"
                    onClick={() => handleAsuntoClick(opcion)}
                    className={`px-4 py-2 rounded-md border transition whitespace-nowrap ${
                      formData.asunto === opcion
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600"
                    }`}
                  >
                    {opcion}
                  </button>
                ))}
              </div>
              {formData.asunto === "Otros" && (
                <div className="mt-4">
                  <label htmlFor="otroAsunto" className="block text-sm font-semibold text-gray-300 mb-1">Describir asunto</label>
                  <input
                    type="text"
                    id="otroAsunto"
                    name="otroAsunto"
                    value={formData.otroAsunto}
                    onChange={handleChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe brevemente tu consulta"
                  />
                </div>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={enviando}
              className="w-full bg-blue-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-700 transition disabled:opacity-60 shadow-lg"
            >
              {enviando ? "Enviando..." : "Enviar Consulta"}
            </button>
          </div>

          {mensaje && (
            <p className={`mt-4 font-semibold text-center ${mensaje.type === "error" ? "text-red-500" : "text-green-400"}`}>
              {mensaje.text}
            </p>
          )}
        </form>

        <section className="mt-12 border-t border-gray-700 pt-8 text-gray-300 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 text-lg font-semibold">
          <div className="flex items-center gap-3">
            <FaWhatsapp className="text-green-400 text-2xl" />
            <a href="https://wa.me/34622281415" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
              622 281 415
            </a>
          </div>
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-red-400 text-2xl" />
            <a href="mailto:ctdigitalsolutions20@gmail.com" className="text-blue-400 underline">
              ctdigitalsolutions20@gmail.com
            </a>
          </div>
        </section>
      </div>
    </section>
  );
};

export default ContactForm;