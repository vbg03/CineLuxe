import React from 'react';
import './footer.css'; // Asegúrate de crear un archivo CSS para los estilos del footer

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3 className='logo'>CineLuxe</h3>
          <p>La mejor experiencia cinematográfica online. Explora, descubre y disfruta de películas y series de todo el mundo.</p>
        </div>

        <div className="footer-section social">
          <h4 className='logo'>Síguenos</h4>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 CineLuxe. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
