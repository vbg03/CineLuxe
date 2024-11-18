import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MiniPerfil from '../perfil/MiniPerfil'; // Importa el MiniPerfil
import './Header.css';

const Header = ({ user, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showMiniPerfil, setShowMiniPerfil] = useState(false);
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);
  const navigate = useNavigate();

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
      setShowMiniPerfil(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', closeMenu);
    return () => document.removeEventListener('mousedown', closeMenu);
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/peliculas?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const toggleMiniPerfil = (e) => {
    e.stopPropagation(); // Detiene la propagación del evento
    setShowMiniPerfil((prev) => !prev);
    setMenuOpen(false); // Opcional
  };
  

  return (
    <>
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
            {user ? (
              <>
                <li onClick={toggleMiniPerfil}>
                  <button className="btnLogin-popup">
                    <i className="fa-solid fa-user"></i> Mi Perfil
                  </button>
                </li>
                <li>
                  <button className="btnLogout" onClick={onLogout}>
                    <i className="fa-solid fa-sign-out-alt"></i> Cerrar Sesión
                  </button>
                </li>
              </>
            ) : (
              <li>
                <button className="btnLogin-popup" onClick={() => navigate('/')}>
                  <i className="fa-solid fa-user"></i> Iniciar Sesión
                </button>
              </li>
            )}
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

      {showMiniPerfil && (
        <MiniPerfil
          user={user}
          onLogout={() => {
            onLogout();
            setShowMiniPerfil(false);
          }}
        />
      )}
    </>
  );
};

export default Header;
