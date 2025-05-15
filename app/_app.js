// pages/_app.js
import '../styles/globals.css'; // Mantén tus estilos globales
import 'swiper/css';
import 'swiper/css';
import 'swiper/css/pagination';



function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} /> {/* Solo carga el contenido específico de la página */}
    </>
  );
}

export default MyApp;
