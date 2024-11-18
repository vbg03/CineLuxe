import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Banner from './components/banner/Banner';
import Login from './components/login/Login';
import Contenido from './components/contenido/Contenido';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Peliculas from './components/peliculas/Peliculas';
import Pelicula from "./components/pelicula/Pelicula";
import MiniPerfil from './components/perfil/MiniPerfil';
import { auth } from './firebase/firebase'; // Firebase Auth config
import { onAuthStateChanged, signOut } from 'firebase/auth'; // Firebase methods

function App() {
  const [user, setUser] = useState(null);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // Cleanup listener on unmount
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

      {/* Header always visible */}
      <Header user={user} onLogout={handleLogout} />

      {/* Route configuration */}
      <Routes>
        {/* Home Route */}
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

        {/* Movies Routes */}
        <Route path="/peliculas" element={<Peliculas />} />
        <Route path="/peliculas/:genreId" element={<Peliculas />} />
        <Route path="/pelicula/:id" element={<Pelicula />} />

        {/* Profile Route */}
        <Route
          path="/perfil"
          element={user ? <MiniPerfil user={user} onLogout={handleLogout} /> : <Navigate to="/" />}
        />
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
