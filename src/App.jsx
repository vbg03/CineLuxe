import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Banner from './components/banner/Banner';
import Login from './components/login/Login';
import Contenido from './components/contenido/Contenido';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Peliculas from './components/peliculas/Peliculas';
import Pelicula from "./components/pelicula/Pelicula";
import MiniPerfil from './components/perfil/MiniPerfil'; // Importa el MiniPerfil
import { auth } from './firebase/firebase'; // Asegúrate de que el auth esté configurado correctamente
import { onAuthStateChanged, signOut } from 'firebase/auth'; // Métodos de Firebase

function App() {
  const [user, setUser] = useState(null);

  // Escuchar cambios de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // Limpia el listener cuando se desmonte
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <Router>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
        integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
      />

      {/* Header siempre visible */}
      <Header />

      {/* Configuración de rutas */}
      <Routes>
        {/* Ruta de Inicio */}
        <Route
          path="/"
          element={
            <>
              {!user ? <Login /> : <MiniPerfil user={user} onLogout={handleLogout} />}
              <Banner />
              <Contenido />
            </>
          }
        />

        {/* Ruta de Películas */}
        <Route path="/peliculas" element={<Peliculas />} />
        <Route path="/" element={<Contenido />} />
        <Route path="/peliculas/:genreId" element={<Peliculas />} />
        <Route path="/pelicula/:id" element={<Pelicula />} />
        <Route path="/perfil" element={<MiniPerfil user={user} onLogout={handleLogout} />} />
      </Routes>

      <Footer />

      {/* Scripts */}
      <script
        type="module"
        src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
      ></script>
      <script
        noModule
        src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
      ></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
      <script
        src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
        type="module"
      ></script>
      <script
        src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
        noModule
      ></script>
    </Router>
  );
}

export default App; 