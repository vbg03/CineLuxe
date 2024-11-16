import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // Importa Link
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);
  

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = (e) => {
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
        <Link to="/" className="logo">
          CineLuxe
        </Link>

        <div
          className={`hamburger ${menuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          ref={hamburgerRef}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`links ${menuOpen ? 'active' : ''}`} ref={menuRef}>
          <li onClick={() => setMenuOpen(false)}>
            <Link to="/">
              <i className="fa-solid fa-house"></i> Inicio
            </Link>
          </li>
          <li onClick={() => setMenuOpen(false)}>
            <Link to="/peliculas"> {/* Usa Link para la navegación */}
              <i className="fa-solid fa-film"></i> Películas
            </Link>
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

        <div className="search">
          <input type="text" placeholder="Buscar" />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
    </header>
  );
};

export default Header;
