'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { Pagination } from 'swiper/modules';

import 'swiper/css/pagination';

const Hero = () => {
  const [activeButton, setActiveButton] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleButtonClick = (button) => {
    if (activeButton === button) {
      setShowDropdown(!showDropdown);
    } else {
      setActiveButton(button);
      setShowDropdown(true);
    }
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-5 overflow-hidden">

      {/* Fondo en video */}
      <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover z-0">
        <source src="/media/cubo.mp4" type="video/mp4" />
        Tu navegador no soporta la etiqueta de video.
      </video>

      {/* Botones de servicio */}
      <div className="flex flex-wrap justify-center gap-4 z-10 relative mt-10 max-w-4xl mx-auto">
        {[
          { id: 'webDevelopment', icon: 'fas fa-laptop-code', label: 'Desarrollo Web' },
          { id: 'seo', icon: 'fas fa-search', label: 'Posicionamiento SEO' },
          { id: 'socialMedia', icon: 'fab fa-facebook-f', label: 'Gestión de Redes Sociales' },
          { id: 'support', icon: 'fas fa-headset', label: 'Soporte Full Stack' },
          { id: 'ProyectosOnBoarding', icon: 'fas fa-gift', label: 'Proyectos On Boarding' },
        ].map(({ id, icon, label }, index) => {
          const isEven = index % 2 === 0;
          const bgColor = isEven
            ? 'bg-blue-600 text-white hover:bg-blue-500'
            : 'bg-white text-blue-600 hover:bg-gray-100 border border-blue-600';

          return (
            <button
              key={id}
              onClick={() => handleButtonClick(id)}
              className={`flex items-center py-2 px-4 rounded-lg w-64 justify-center space-x-2 transition duration-600 ${bgColor}`}
            >
              <i className={`${icon} text-xl`} />
              <span className="text-sm">{label}</span>
              <i
                className={`fas ${showDropdown && activeButton === id ? 'fa-chevron-up' : 'fa-chevron-down'} text-xs ml-2`}
              />
            </button>
          );
        })}
      </div>

      {/* Contenido expandido */}
      {showDropdown && (
  <div className="relative z-10 mt-10 w-full max-w-5xl bg-gray-900 text-white p-10 rounded-xl shadow-lg animate-slideDown transition-all duration-500 ease-in-out">
    {/* Botón cerrar */}
    <button
      className="absolute top-5 right-5 text-white text-5xl bg-gray-700 rounded-full p-1 hover:bg-gray-600 transition"
      onClick={closeDropdown}
      aria-label="Cerrar desplegable"
    >
      <i className="fas fa-times" />
    </button>

          {/* Contenido según selección */}
          {activeButton === 'webDevelopment' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Desarrollo Web</h2>
              <p className="mb-6">Creamos sitios web personalizados adaptados a tus necesidades.</p>

              


              {/* Carrusel de proyectos */}
              
              <Swiper
                spaceBetween={20}
                slidesPerView={1}
                pagination={{ clickable: true }}
                modules={[Pagination]}
                className="rounded-lg overflow-hidden"
              >
                {/* Slide combinado: introducción + logos */}
  <SwiperSlide>
    <div className="flex flex-col items-center bg-white text-black p-10 rounded-lg">
      <h3 className="text-xl font-semibold mb-4 text-center">Ejemplos de proyectos web</h3>
      <p className="text-center max-w-xl mb-8">
        Aquí muestro algunos ejemplos representativos de sitios web que he desarrollado, 
        usando diferentes tecnologías y plataformas para adaptarme a las necesidades de cada cliente.
      </p>

      <h4 className="text-lg font-semibold mb-4">Plataformas y editores web populares</h4>
      <div className="flex flex-wrap justify-center items-center gap-8">
        <img
          src="/media/wordpress.png"
          alt="WordPress"
          className="h-16 object-contain"
          loading="lazy"
        />
        <img
          src="/media/wix.png"
          alt="Wix"
          className="h-16 object-contain"
          loading="lazy"
        />
        <img
          src="/media/squarespace.png"
          alt="Squarespace"
          className="h-16 object-contain"
          loading="lazy"
        />
        <img
          src="/media/shopify.png"
          alt="Shopify"
          className="h-16 object-contain"
          loading="lazy"
        />
        <img
          src="/media/joomla.png"
          alt="Joomla"
          className="h-16 object-contain"
          loading="lazy"
        />
      </div>
    </div>
  </SwiperSlide>

                <SwiperSlide>
                  <div className="flex flex-col md:flex-row gap-6 items-center bg-white text-black p-4 rounded-lg">
                    <a href="https://costanest.com" target="_blank" rel="noopener noreferrer" className="w-full md:w-1/2">
                      <img src="/media/costanest.jpg" alt="CostaNest" className="w-full h-64 object-cover rounded-lg" />
                    </a>
                    <div className="md:w-1/2">
                      <h3 className="text-xl font-semibold mb-2">CostaNest</h3>
                      <p className="text-sm mb-2">
                        Plataforma inmobiliaria con integración de plugins para gestión de propiedades (Estatik) y búsqueda avanzada.
                      </p>
                      <ul className="text-sm list-disc pl-5">
                        <li>WordPress + Elementor Pro</li>
                        <li>Plugin de traducción WPML</li>
                        <li>Formularios avanzados con Gravity Forms</li>
                        <li>SEO optimizado con Rank Math</li>
                      </ul>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="flex flex-col md:flex-row gap-6 items-center bg-white text-black p-4 rounded-lg">
                    <a href="https://erescambio.com" target="_blank" rel="noopener noreferrer" className="w-full md:w-1/2">
                      <img src="/media/erescambio.jpg" alt="Eres Cambio" className="w-full h-64 object-cover rounded-lg" />
                    </a>
                    <div className="md:w-1/2">
                      <h3 className="text-xl font-semibold mb-2">EresCambio</h3>
                      <p className="text-sm mb-2">
                        Comunidad online para coaches y terapeutas. Integración de membresías y pagos online.
                      </p>
                      <ul className="text-sm list-disc pl-5">
                        <li>WordPress + Astra Theme</li>
                        <li>LearnDash para cursos y membresías</li>
                        <li>WooCommerce + Stripe</li>
                        <li>Mailchimp para automatización</li>
                      </ul>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="flex flex-col md:flex-row gap-6 items-center bg-white text-black p-4 rounded-lg">
                    <a href="https://psicologaegovida.es" target="_blank" rel="noopener noreferrer" className="w-full md:w-1/2">
                      <img src="/media/psicologaegovida.jpg" alt="EgoVida" className="w-full h-64 object-cover rounded-lg" />
                    </a>
                    <div className="md:w-1/2">
                      <h3 className="text-xl font-semibold mb-2">EgoVida</h3>
                      <p className="text-sm mb-2">
                        Web corporativa de psicología con reserva de sesiones online y blog de recursos.
                      </p>
                      <ul className="text-sm list-disc pl-5">
                        <li>WordPress + OceanWP</li>
                        <li>Plugin Amelia para citas</li>
                        <li>Blog optimizado para SEO</li>
                        <li>Certificados SSL y optimización de carga</li>
                      </ul>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="flex flex-col md:flex-row gap-6 items-center bg-white text-black p-4 rounded-lg">
                    <a href="https://publipayi.com" target="_blank" rel="noopener noreferrer" className="w-full md:w-1/2">
                      <img src="/media/publipayi.jpg" alt="Publipayi" className="w-full h-64 object-cover rounded-lg" />
                    </a>
                    <div className="md:w-1/2">
                      <h3 className="text-xl font-semibold mb-2">Publipayi</h3>
                      <p className="text-sm mb-2">
                        Sitio para imprenta y papelería con catálogo de productos y cotizaciones personalizadas.
                      </p>
                      <ul className="text-sm list-disc pl-5">
                        <li>WordPress + Woodmart theme</li>
                        <li>Catálogo dinámico con CPT UI + ACF</li>
                        <li>Integración con WhatsApp Business</li>
                        <li>Plugin WP Super Cache para rendimiento</li>
                      </ul>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          )}

          {activeButton === 'seo' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Posicionamiento SEO</h2>
             <Swiper
  spaceBetween={20}
  slidesPerView={1}
  pagination={{ clickable: true }}
  modules={[Pagination]}
  className="rounded-lg overflow-hidden"
>
  {/* Slide 1: Estrategia de Captación de Leads */}
  <SwiperSlide>
    <div className="flex flex-col md:flex-row gap-6 items-center bg-white text-black p-6 rounded-lg">
      <div className="w-full md:w-1/2">
        <img src="/media/analitycs.png" alt="Lead Generation" className="w-full h-64 object-cover rounded-lg" />
      </div>
      <div className="md:w-1/2">
        <h3 className="text-2xl font-bold mb-3">Estrategia de Captación de Leads</h3>
        <p className="text-sm mb-3">
          Diseño y ejecución de campañas digitales centradas en la conversión, orientadas a generar leads cualificados mediante canales orgánicos y de pago.
        </p>
        <ul className="text-sm list-disc pl-5">
          <li>Creación de landing pages optimizadas para conversión (CRO)</li>
          <li>Lead magnets estratégicos (ebooks, demos, webinars...)</li>
          <li>Integración con CRM para nurturing y lead scoring</li>
          <li>Campañas multicanal: SEO, SEM, Meta Ads y LinkedIn Ads</li>
        </ul>
      </div>
    </div>
  </SwiperSlide>

  {/* Slide 2: Automatización y Funnels de Conversión */}
  <SwiperSlide>
    <div className="flex flex-col md:flex-row gap-6 items-center bg-white text-black p-6 rounded-lg">
      <div className="w-full md:w-1/2">
        <img src="/media/seo.png" alt="Funnels y Automatización" className="w-full h-64 object-cover rounded-lg" />
      </div>
      <div className="md:w-1/2">
        <h3 className="text-2xl font-bold mb-3">Funnels y Automatización</h3>
        <p className="text-sm mb-3">
          Diseño de embudos de conversión automatizados que segmentan y calientan leads de forma inteligente hasta que están listos para la venta.
        </p>
        <ul className="text-sm list-disc pl-5">
          <li>Automatización de emails (Mailchimp, ActiveCampaign...)</li>
          <li>Lead scoring basado en comportamiento e interacción</li>
          <li>Secuencias de nurturing personalizadas por etapa</li>
          <li>Optimización de tasas de conversión en cada fase del funnel</li>
        </ul>
      </div>
    </div>
  </SwiperSlide>

  {/* Slide 3: Análisis y Optimización de Campañas */}
  <SwiperSlide>
    <div className="flex flex-col md:flex-row gap-6 items-center bg-white text-black p-6 rounded-lg">
      <div className="w-full md:w-1/2">
        <img src="/media/semrush.png" alt="Análisis de Leads" className="w-full h-64 object-cover rounded-lg" />
      </div>
      <div className="md:w-1/2">
        <h3 className="text-2xl font-bold mb-3">Análisis y Optimización de Campañas</h3>
        <p className="text-sm mb-3">
          Monitorización constante del rendimiento para escalar campañas con ROI positivo, basado en datos y pruebas A/B continuas.
        </p>
        <ul className="text-sm list-disc pl-5">
          <li>KPIs clave: CPL, tasa de conversión, CAC, LTV</li>
          <li>Uso de dashboards dinámicos (GA4, Looker Studio...)</li>
          <li>Test A/B de elementos clave: CTA, headlines, formularios</li>
          <li>Revisión continua del funnel para identificar cuellos de botella</li>
        </ul>
      </div>
    </div>
  </SwiperSlide>

  {/* Slide 4: Experiencia con marcas */}
  <SwiperSlide>
    <div className="flex flex-col md:flex-row gap-8 items-center bg-white text-black p-6 rounded-lg max-w-5xl mx-auto">
      <div className="flex flex-wrap justify-center items-center gap-6 md:w-1/2">
        <img src="/media/kampaoh.png" alt="Kampaoh" className="h-10 object-contain" />
        <img src="/media/amovens.png" alt="Amovens" className="h-10 object-contain" />
        <img src="/media/tulipan.png" alt="Tulipán" className="h-10 object-contain" />
        <img src="/media/pymes.png" alt="PYMEs" className="h-10 object-contain" />
      </div>

      <div className="md:w-1/2 text-center md:text-left">
        <h3 className="text-2xl font-bold mb-3">Generación de Leads para Marcas y PYMEs</h3>
        <p className="text-sm mb-3">
          He colaborado en campañas de captación de leads para <strong>Kampaoh</strong>, <strong>Amovens</strong> y <strong>Tulipán</strong>, aplicando estrategias escalables tanto para grandes marcas como para negocios locales.
        </p>
        <ul className="text-sm list-disc pl-5 text-left mx-auto md:mx-0 max-w-md">
          <li>Configuración de campañas lead-gen con enfoque local y nacional</li>
          <li>Segmentación avanzada por buyer persona y comportamiento</li>
          <li>Optimización de formularios y landing pages para mayor conversión</li>
          <li>Colaboración con equipos internos de ventas y CRM</li>
        </ul>
      </div>
    </div>
  </SwiperSlide>
    {/* Slide 5: Experiencia concreta */}
 <SwiperSlide>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white text-black p-6 rounded-lg">
    {/* Card 1: Alex Rosales (EresCambio) */}
    <div className="bg-white rounded-xl shadow-md p-4 space-y-3">
      <img src="/media/seo1.png" alt="Campaña Kit Digital" className="w-full h-40 object-cover rounded-md" />
      <h3 className="text-lg font-bold">Kit Digital – Alex Rosales (EresCambio)</h3>
      <p className="text-sm">Captación de autónomos y micropymes para acceder al Kit Digital.</p>
      <ul className="list-disc text-sm pl-5">
        <li>+620 leads en 5 semanas</li>
        <li>CPL: 2,90€</li>
        <li>Embudo automatizado con Mailchimp</li>
        <li>Lead magnet descargable</li>
      </ul>
      <p className="text-xs italic">"Resultados muy por encima de nuestras expectativas" – Alex Rosales</p>
    </div>

    {/* Card 2: Eva Recommends */}
    <div className="bg-white rounded-xl shadow-md p-4 space-y-3">
      <img src="/media/seo2.png" alt="Alquiler Turístico" className="w-full h-40 object-cover rounded-md" />
      <h3 className="text-lg font-bold">Alquiler Turístico – Eva Recommends</h3>
      <p className="text-sm">Campañas de captación para propietarios de viviendas turísticas.</p>
      <ul className="list-disc text-sm pl-5">
        <li>+350 leads cualificados</li>
        <li>CTR: 5,2% – Conversión: 18%</li>
        <li>Formulario conectado a WhatsApp</li>
        <li>Audiencias lookalike + contextual</li>
      </ul>
      <p className="text-xs italic">"Alta calidad de leads y feedback constante" – Eva</p>
    </div>
  </div>
</SwiperSlide>

<SwiperSlide>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white text-black p-6 rounded-lg">
    {/* Card 3: Luis G. (Amovens) */}
    <div className="bg-white rounded-xl shadow-md p-4 space-y-3">
      <img src="/media/seo3.png" alt="Concienciación Amovens" className="w-full h-40 object-cover rounded-md" />
      <h3 className="text-lg font-bold">Nuevos Servicios – Luis G. (Amovens)</h3>
      <p className="text-sm">Campaña de awareness sobre los nuevos servicios de movilidad compartida.</p>
      <ul className="list-disc text-sm pl-5">
        <li>+200K impresiones en Meta Ads</li>
        <li>Vídeos con tiempo medio de 21s</li>
        <li>+37% tráfico web</li>
        <li>Retargeting con comportamiento</li>
      </ul>
      <p className="text-xs italic">"Estrategia elegante y efectiva" – Luis G.</p>
    </div>

    {/* Card 4: Ignacio G. (Kampaoh) */}
    <div className="bg-white rounded-xl shadow-md p-4 space-y-3">
      <img src="/media/seo4.jpg" alt="Conversión Kampaoh" className="w-full h-40 object-cover rounded-md" />
      <h3 className="text-lg font-bold">Conversión – Ignacio G. (Kampaoh)</h3>
      <p className="text-sm">Generación de reservas para alojamientos turísticos glamping.</p>
      <ul className="list-disc text-sm pl-5">
        <li>+1MILLON impresiones en Meta Ads</li>
         <li>Formulario conectado a WhatsApp</li>
        <li>Audiencias lookalike + contextual</li>
      </ul>
      <p className="text-xs italic">"Alta calidad de leads y feedback constante" – Eva</p>
    </div>
  </div>
</SwiperSlide>



</Swiper>


        </div>
      )}

     {activeButton === 'socialMedia' && (
  <div>
    <h2 className="text-2xl font-bold mb-4">Gestión de Redes Sociales</h2>
    <p className="mb-6">Aumenta tu presencia en redes con estrategias efectivas.</p>

    <Swiper 
    spaceBetween={20} 
    slidesPerView={1} 
     pagination={{ clickable: true }}
  modules={[Pagination]}
    className="rounded-lg overflow-hidden">
      
      {/* Slide 1: Branding y Estrategia de Contenido */}
      <SwiperSlide>
        <div className="flex flex-col md:flex-row items-center gap-6 bg-white text-black p-6 rounded-lg">
          <div className="w-full md:w-1/2">
            <img src="/media/estrategiacontenidos.png" alt="Estrategia de Contenido" className="w-full h-64 object-cover rounded-lg" />
          </div>
          <div className="md:w-1/2">
            <h3 className="text-xl font-semibold mb-3">Estrategia de Marca y Contenido</h3>
            <p className="text-sm mb-2">
              Creamos un plan de contenido personalizado para comunicar los valores de tu marca, mantener consistencia visual y generar reconocimiento en redes como Instagram, Facebook o LinkedIn.
            </p>
            <ul className="text-sm list-disc pl-5">
              <li>Calendario de publicaciones mensual</li>
              <li>Diseño gráfico y copywriting optimizado</li>
              <li>Identidad visual adaptada a redes</li>
              <li>Análisis de audiencia y tono de voz</li>
            </ul>
          </div>
        </div>
      </SwiperSlide>

      {/* Slide 2: Campañas Promocionales */}
      <SwiperSlide>
        <div className="flex flex-col md:flex-row items-center gap-6 bg-white text-black p-6 rounded-lg">
          <div className="w-full md:w-1/2">
            <img src="/media/campañas.jpg" alt="Campañas Promocionales" className="w-full h-64 object-cover rounded-lg" />
          </div>
          <div className="md:w-1/2">
            <h3 className="text-xl font-semibold mb-3">Campañas para Promocionar Productos</h3>
            <p className="text-sm mb-2">
              Gestionamos campañas pagadas y orgánicas para promocionar tus productos o servicios y atraer tráfico a tu web o tienda online.
            </p>
            <ul className="text-sm list-disc pl-5">
              <li>Facebook & Instagram Ads segmentados</li>
              <li>Promociones con influencers locales</li>
              <li>Creatividades en formato Reels y Stories</li>
              <li>Integración con landing pages personalizadas</li>
            </ul>
          </div>
        </div>
      </SwiperSlide>

      {/* Slide 3: Atención al cliente y reputación */}
      <SwiperSlide>
        <div className="flex flex-col md:flex-row items-center gap-6 bg-white text-black p-6 rounded-lg">
          <div className="w-full md:w-1/2">
            <img src="/media/gestioncomunidades.jpg" alt="Atención al cliente" className="w-full h-64 object-cover rounded-lg" />
          </div>
          <div className="md:w-1/2">
            <h3 className="text-xl font-semibold mb-3">Gestión de Comunidad y Reputación</h3>
            <p className="text-sm mb-2">
              Respondemos a comentarios, gestionamos reseñas y fomentamos una comunidad activa y positiva alrededor de tu marca.
            </p>
            <ul className="text-sm list-disc pl-5">
              <li>Gestión de mensajes directos</li>
              <li>Monitorización de menciones</li>
              <li>Respuestas personalizadas y automáticas</li>
              <li>Protocolos ante crisis de reputación</li>
            </ul>
          </div>
        </div>
      </SwiperSlide>

      {/* Slide 4: Analítica y Optimización */}
      <SwiperSlide>
        <div className="flex flex-col md:flex-row items-center gap-6 bg-white text-black p-6 rounded-lg">
          <div className="w-full md:w-1/2">
            <img src="/media/resultados.png" alt="Análisis de resultados" className="w-full h-64 object-cover rounded-lg" />
          </div>
          <div className="md:w-1/2">
            <h3 className="text-xl font-semibold mb-3">Análisis de Resultados y Optimización</h3>
            <p className="text-sm mb-2">
              Medimos el impacto de cada acción y optimizamos tus campañas para obtener el mejor ROI posible.
            </p>
            <ul className="text-sm list-disc pl-5">
              <li>Reportes mensuales con métricas clave</li>
              <li>Seguimiento de conversiones</li>
              <li>Auditoría de engagement y crecimiento</li>
              <li>Ajustes de pauta y contenido según datos</li>
            </ul>
          </div>
        </div>
      </SwiperSlide>

    </Swiper>
  </div>
)}


      {activeButton === 'support' && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Soporte Full Stack</h2>
          <p className="mb-6">Asistencia técnica y mantenimiento de tus sistemas web.</p>
         <Swiper
  spaceBetween={20}
  slidesPerView={1}
  pagination={{ clickable: true }}
  modules={[Pagination]}
  className="rounded-lg overflow-hidden"
>
  {/* FRONT-END */}
  <SwiperSlide>
    <div className="bg-white text-black p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Front-End</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center items-center">
        <div className="flex flex-col items-center">
          <img src="/media/html5.svg" alt="HTML5" className="w-12 h-12 mb-2" />
          <span className="text-sm">HTML5</span>
        </div>
        <div className="flex flex-col items-center">
          <img src="/media/css3.svg" alt="CSS3" className="w-12 h-12 mb-2" />
          <span className="text-sm">CSS3</span>
        </div>
        <div className="flex flex-col items-center">
          <img src="/media/javascript.svg" alt="JavaScript" className="w-12 h-12 mb-2" />
          <span className="text-sm">JavaScript</span>
        </div>
        <div className="flex flex-col items-center">
          <img src="/media/react.svg" alt="React" className="w-12 h-12 mb-2" />
          <span className="text-sm">React</span>
        </div>
        <div className="flex flex-col items-center">
          <img src="/media/tailwind.svg" alt="Tailwind" className="w-12 h-12 mb-2" />
          <span className="text-sm">Tailwind CSS</span>
        </div>
        <div className="flex flex-col items-center">
          <img src="/media/bootstrap.svg" alt="Bootstrap" className="w-12 h-12 mb-2" />
          <span className="text-sm">Bootstrap</span>
        </div>
        <div className="flex flex-col items-center">
          <img src="/media/vue.svg" alt="Vue.js" className="w-12 h-12 mb-2" />
          <span className="text-sm">Vue.js</span>
        </div>
      </div>
    </div>
  </SwiperSlide>

  {/* BACK-END */}
  <SwiperSlide>
    <div className="bg-white text-black p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Back-End</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center items-center">
        <div className="flex flex-col items-center">
          <img src="/media/nodejs.svg" alt="Node.js" className="w-12 h-12 mb-2" />
          <span className="text-sm">Node.js</span>
        </div>
        <div className="flex flex-col items-center">
          <img src="/media/expressjs.svg" alt="Express.js" className="w-12 h-12 mb-2" />
          <span className="text-sm">Express.js</span>
        </div>
        <div className="flex flex-col items-center">
          <img src="/media/php.svg" alt="PHP" className="w-12 h-12 mb-2" />
          <span className="text-sm">PHP</span>
        </div>
        <div className="flex flex-col items-center">
          <img src="/media/laravel.svg" alt="Laravel" className="w-12 h-12 mb-2" />
          <span className="text-sm">Laravel</span>
        </div>
        <div className="flex flex-col items-center">
          <img src="/media/python.svg" alt="Python" className="w-12 h-12 mb-2" />
          <span className="text-sm">Python</span>
        </div>
        <div className="flex flex-col items-center">
          <img src="/media/django.svg" alt="Django" className="w-12 h-12 mb-2" />
          <span className="text-sm">Django</span>
        </div>
      </div>
    </div>
  </SwiperSlide>
</Swiper>

        </div>
      )}

      {activeButton === 'ProyectosOnBoarding' && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Proyecto Weedup</h2>
          <p className="mb-6">Proyecto en creación de Invitaciones a Bodas Digitales.</p>
       <Swiper
  spaceBetween={20}
  slidesPerView={1}
  pagination={{ clickable: true }}
  modules={[Pagination]}
  className="rounded-lg overflow-hidden"
>
  {/* Slide 1 - Introducción */}
  <SwiperSlide>
    <div className="flex flex-col md:flex-row gap-6 items-center bg-white text-black p-6 rounded-lg">
      <img
        src="/media/logoweedup.png"
        alt="Invitación digital de boda"
       className="w-full md:w-1/2 h-64 object-contain rounded-lg"
      />
      <div className="md:w-1/2">
        <h3 className="text-xl font-semibold mb-2">Plataforma de Invitaciones Virtuales para Bodas</h3>
        <p>
          Proyecto de código abierto para que parejas creen invitaciones digitales personalizadas automáticamente,
          rellenando un formulario que volcará la información en un frontend ajustado al contenido.
          Los invitados podrán confirmar asistencia, elegir menú, conocer su asiento y hacer donaciones vía PayPal.
        </p>
      </div>
    </div>
  </SwiperSlide>

  {/* Slide 2 - Tecnologías */}
  <SwiperSlide>
    <div className="flex flex-col md:flex-row gap-6 items-center bg-white text-black p-6 rounded-lg">
      <div className="md:w-1/2">
        <h3 className="text-xl font-semibold mb-2">Tecnologías Clave del Proyecto</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Drupal:</strong> CMS flexible y robusto para gestionar contenido.</li>
          <li><strong>MongoDB:</strong> Base de datos NoSQL escalable y eficiente.</li>
          <li><strong>Node.js & React:</strong> Para construir el frontend dinámico y backend eficiente.</li>
        </ul>
        <div className="flex items-center space-x-3 mt-4">
          <a
            href="https://github.com/alledesma89/weedup"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
              alt="GitHub"
              className="h-12 cursor-pointer"
            />
          </a>
          <span className="text-sm text-gray-700">Repositorio abierto en GitHub</span>
        </div>
      </div>
      <div className="md:w-1/2 flex justify-around">
        <img
          src="/media/Wordmark2_blue_RGB.png"
          alt="Drupal"
          className="h-16"
        />
        <img
          src="https://webassets.mongodb.com/_com_assets/cms/mongodb-logo-rgb-j6w271g1xn.jpg"
          alt="MongoDB"
          className="h-16 object-contain"
        />
      </div>
    </div>
  </SwiperSlide>

  {/* Slide 3 - Formulario y generación automática */}
  <SwiperSlide>
    <div className="flex flex-col md:flex-row gap-6 items-center bg-white text-black p-6 rounded-lg">
      <img
        src="/media/formulario.png"
        alt="Formulario invitación boda"
        className="w-full md:w-1/2 h-64 object-contain rounded-lg"
      />
      <div className="md:w-1/2">
        <h3 className="text-xl font-semibold mb-2">Formulario Personalizado para Invitaciones</h3>
        <p>
          Las parejas completan un formulario con todos los detalles de su boda. Esta información se vuelca
          automáticamente en la web, generando una invitación única con datos como fecha, lugar, menú y más.
        </p>
      </div>
    </div>
  </SwiperSlide>

  {/* Slide 4 - Interacción invitados */}
  <SwiperSlide>
    <div className="flex flex-col md:flex-row gap-6 items-center bg-white text-black p-6 rounded-lg">
      <div className="md:w-1/2 flex flex-col justify-center">
        <h3 className="text-xl font-semibold mb-2">Confirmación y Funcionalidades para Invitados</h3>
        <p className="mb-4">
          Los invitados pueden confirmar asistencia, elegir menú, ver su asiento asignado y realizar donaciones via PayPal.
          Todo gestionado fácilmente desde la plataforma.
        </p>
      </div>
      <img
        src="/media/confirm3.webp"
        alt="Confirmación asistencia boda"
        className="w-full md:w-1/2 h-64 object-contain rounded-lg"
      />
    </div>
  </SwiperSlide>
</Swiper>

        </div>
      )}

    </div>
  )}
</div>
);
};

export default Hero;
