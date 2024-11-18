import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importa Link y useNavigate
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el buscador
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);
  const navigate = useNavigate(); // Navegación para el buscador

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

  // Manejar el cambio en el buscador
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  // Enviar búsqueda al componente Peliculas
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/peliculas?search=${encodeURIComponent(searchTerm)}`);
    }
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
            <Link to="/peliculas">
              <i className="fa-solid fa-film"></i> Películas
            </Link>
          </li>
          <li>
            <button className="btnLogin-popup" onClick={openLoginPopup}>
              <i className="fa-solid fa-user"></i> Iniciar Sesión
            </button>
          </li>
          <li className="search-small">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Buscar"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
          </li>
        </ul>

        <div className="search">
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Buscar"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
