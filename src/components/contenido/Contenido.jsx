import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Contenido.css";

const Contenido = () => {
  const API_KEY = "7f725faee93092b2c693d44412011a01";
  const BASE_URL = "https://api.themoviedb.org/3";

  const [ultimosEstrenos, setUltimosEstrenos] = useState([]);
  const [proximosEstrenos, setProximosEstrenos] = useState([]);
  const [peliculasRecomendadas, setPeliculasRecomendadas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate(); // Hook para redireccionar

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

  // Manejar clic en una película
  const handleMovieClick = (movieId) => {
    navigate(`/pelicula/${movieId}`); // Navega a la página de detalles con el ID de la película
  };

  // Manejar clic en una categoría
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
            <div
              key={pelicula.id}
              className="tarjeta-pelicula"
              onClick={() => handleMovieClick(pelicula.id)} // Maneja el clic en la película
            >
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
            <div
              key={pelicula.id}
              className="tarjeta-pelicula"
              onClick={() => handleMovieClick(pelicula.id)} // Maneja el clic en la película
            >
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
            <div
              key={pelicula.id}
              className="tarjeta-pelicula"
              onClick={() => handleMovieClick(pelicula.id)} // Maneja el clic en la película
            >
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

      
    </div>
  );
};

export default Contenido;
