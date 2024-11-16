import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Contenido.css";

const Contenido = () => {
  const API_KEY = '7f725faee93092b2c693d44412011a01';
  const BASE_URL = 'https://api.themoviedb.org/3';

  const [ultimosEstrenos, setUltimosEstrenos] = useState([]);
  const [proximosEstrenos, setProximosEstrenos] = useState([]);
  const [peliculasRecomendadas, setPeliculasRecomendadas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate(); // Hook para redireccionar

  const reseñasFicticias = [
    {
      usuario: "CineFanatic123",
      reseña: "¡Esta película me dejó sin palabras! La trama es muy envolvente y las actuaciones increíbles.",
      puntuacion: 9.5,
    },
    {
      usuario: "PeliculasTop",
      reseña: "Me gustó, aunque sentí que el final pudo ser mejor. Aún así, buena experiencia.",
      puntuacion: 7.8,
    },
    {
      usuario: "FilmLover89",
      reseña: "Los efectos visuales son impresionantes, pero la historia no fue tan impactante como esperaba.",
      puntuacion: 8.0,
    },
    {
      usuario: "CinemaAddict",
      reseña: "¡Un verdadero clásico moderno! No puedo esperar para verla de nuevo.",
      puntuacion: 10,
    },
  ];

  useEffect(() => {
    // Últimos estrenos
    fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=es-ES`)
      .then((response) => response.json())
      .then((data) => setUltimosEstrenos(data.results.slice(0, 5)))
      .catch((error) => console.error("Error al cargar los estrenos:", error));

    // Próximos estrenos
    fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=es-ES`)
      .then((response) => response.json())
      .then((data) => setProximosEstrenos(data.results.slice(0, 5)))
      .catch((error) => console.error("Error al cargar los próximos estrenos:", error));

    // Películas recomendadas
    fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES`)
      .then((response) => response.json())
      .then((data) => setPeliculasRecomendadas(data.results.slice(0, 5)))
      .catch((error) => console.error("Error al cargar las películas recomendadas:", error));

    // Categorías
    fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=es-ES`)
      .then((response) => response.json())
      .then((data) => setCategorias(data.genres))
      .catch((error) => console.error("Error al cargar las categorías:", error));
  }, []);

  const handleCategoryClick = (genreId) => {
    navigate(`/peliculas/${genreId}`); // Navega a la ruta con el ID del género
  };

  return (
    <div className="inicio-container">
      {/* Últimos estrenos */}
      <section className="estrenos">
        <h2 className="logo">Últimos Estrenos</h2>
        <div className="grid-peliculas">
          {ultimosEstrenos.map((pelicula) => (
            <div key={pelicula.id} className="tarjeta-pelicula">
              <img
                src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`}
                alt={pelicula.title}
                className="poster"
              />
              <div className="info-pelicula">
                <h3>{pelicula.title}</h3>
                <p>{pelicula.release_date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Próximos estrenos */}
      <section className="proximos">
        <h2 className="logo">Próximos Estrenos</h2>
        <div className="grid-peliculas">
          {proximosEstrenos.map((pelicula) => (
            <div key={pelicula.id} className="tarjeta-pelicula">
              <img
                src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`}
                alt={pelicula.title}
                className="poster"
              />
              <div className="info-pelicula">
                <h3>{pelicula.title}</h3>
                <p>Estreno: {pelicula.release_date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Películas recomendadas */}
      <section className="recomendadas">
        <h2 className="logo">Películas Recomendadas</h2>
        <div className="grid-peliculas">
          {peliculasRecomendadas.map((pelicula) => (
            <div key={pelicula.id} className="tarjeta-pelicula">
              <img
                src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`}
                alt={pelicula.title}
                className="poster"
              />
              <div className="info-pelicula">
                <h3>{pelicula.title}</h3>
                <p>Puntuación: {pelicula.vote_average}/10</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categorías */}
      <div>
        <h2 className="logo">Categorías Destacadas</h2>
        <section className="hola">
          <div className="grid-categorias">
            {categorias.slice(0, 7).map((categoria) => (
              <button
                key={categoria.id}
                className="boton-categoria"
                onClick={() => handleCategoryClick(categoria.id)} // Redirección al hacer clic
              >
                {categoria.name}
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* Reseñas de Usuarios */}
      <section className="reseñas">
        <h2 className="logo">Reseñas de Usuarios</h2>
        <div className="lista-reseñas">
          {reseñasFicticias.map((reseña, index) => (
            <div key={index} className="tarjeta-reseña">
              <h3>{reseña.usuario}</h3>
              <p>"{reseña.reseña}"</p>
              <span>Puntuación: {reseña.puntuacion}/10</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Contenido;
