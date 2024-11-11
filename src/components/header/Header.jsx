import React, { useState, useEffect, useRef } from 'react';
import './components/header/header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null); // Referencia para el menú
  const hamburgerRef = useRef(null); // Referencia para el botón hamburguesa

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Alternar estado del menú
  };

  const closeMenu = (e) => {
    // Cerrar menú si se hace clic fuera del menú o del botón hamburguesa
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target) &&
      hamburgerRef.current &&
      !hamburgerRef.current.contains(e.target)
    ) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    // Agregar evento para detectar clics fuera del menú
    document.addEventListener('mousedown', closeMenu);
    return () => {
      document.removeEventListener('mousedown', closeMenu);
    };
  }, []);

  const openLoginPopup = () => {
    const wrapper = document.querySelector('.wrapper');
    if (wrapper) wrapper.classList.add('active-popup');
  };

  return (
    <header>
      <div className="nav">
        {/* Logo */}
        <a href="#" className="logo">
          CineLuxe
        </a>

        {/* Botón de menú hamburguesa */}
        <div
          className={`hamburger ${menuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          ref={hamburgerRef} // Referencia para el botón hamburguesa
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Links principales */}
        <ul className={`links ${menuOpen ? 'active' : ''}`} ref={menuRef}>
          <li onClick={() => setMenuOpen(false)}>
            <a href="#">
              <i className="fa-solid fa-house"></i> Inicio
            </a>
          </li>
          <li onClick={() => setMenuOpen(false)}>
            <a href="#peliculas">
              <i className="fa-solid fa-film"></i> Películas
            </a>
          </li>
          <li>
            <button className="btnLogin-popup" onClick={openLoginPopup}>
              <i className="fa-solid fa-user"></i> Iniciar Sesión
            </button>
          </li>
          <li className="search-small">
            <input type="text" placeholder="Buscar" />
            <i className="fa-solid fa-magnifying-glass"></i>
          </li>
        </ul>

        {/* Barra de búsqueda (solo visible en pantallas grandes) */}
        <div className="search">
          <input type="text" placeholder="Search" />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
    </header>
  );
};

export default Header;
