import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Pelicula.css";

const Pelicula = () => {
  const { id } = useParams(); // Obtiene el ID de la película desde la URL
  const API_KEY = '7f725faee93092b2c693d44412011a01';
  const BASE_URL = 'https://api.themoviedb.org/3';

  const [pelicula, setPelicula] = useState(null);
  const [reseñas, setReseñas] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null); // Clave del tráiler de YouTube
  const [mostrarReproductor, setMostrarReproductor] = useState(false); // Estado del reproductor

  useEffect(() => {
    // Obtener detalles de la película
    fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=es-ES`)
      .then((response) => response.json())
      .then((data) => setPelicula(data))
      .catch((error) => console.error("Error al cargar los detalles:", error));

    // Obtener reseñas de la película
    fetch(`${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}&language=es-ES`)
      .then((response) => response.json())
      .then((data) => setReseñas(data.results))
      .catch((error) => console.error("Error al cargar las reseñas:", error));
  }, [id]);

  const handleVerTrailer = () => {
    // Obtener los videos asociados a la película
    fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=es-ES`)
      .then((response) => response.json())
      .then((data) => {
        const trailer = data.results.find((video) => video.type === "Trailer" && video.site === "YouTube");
        if (trailer) {
          setTrailerKey(trailer.key); // Guarda la clave del tráiler
        } else {
          alert("No se encontró un tráiler para esta película.");
        }
      })
      .catch((error) => console.error("Error al cargar el tráiler:", error));
  };

  const handleReproducir = () => {
    setMostrarReproductor(true); // Muestra el reproductor
  };

  if (!pelicula) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="container">
      <div className="detalles">
        <img
          src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`}
          alt={pelicula.title}
          className="poster-pelicula"
        />
        <div className="info-detallada">
          <h1>{pelicula.title}</h1>
          <p><strong>Sinopsis:</strong> {pelicula.overview}</p>
          <p><strong>Fecha de estreno:</strong> {pelicula.release_date}</p>
          <p><strong>Género:</strong> {pelicula.genres.map((g) => g.name).join(", ")}</p>
          <p><strong>Calificación:</strong> {pelicula.vote_average}/10</p>
          <button className="btn-trailer" onClick={handleVerTrailer}>
            <i className="fa-solid fa-circle-play"></i> Ver Trailer
          </button>
          <button className="btn-reproducir" onClick={handleReproducir}>
            <i className="fa-solid fa-play"></i> Reproducir
          </button>
        </div>
      </div>

      {/* Mostrar el tráiler si está disponible */}
      {trailerKey && (
        <div className="trailer-modal">
          <iframe
            width="100%"
            height="500"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="Tráiler"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <button className="btn-cerrar" onClick={() => setTrailerKey(null)}>Cerrar</button>
        </div>
      )}

      {/* Simulación del reproductor */}
      {mostrarReproductor && (
        <div className="reproductor">
          <h2>Reproduciendo: {pelicula.title}</h2>
          <p>(Simulación de reproducción de la película)</p>
          <button className="btn-cerrar" onClick={() => setMostrarReproductor(false)}>Cerrar</button>
        </div>
      )}

      {/* Sección de reseñas */}
      <div className="reseñas">
        <h2>Reseñas</h2>
        {reseñas.length > 0 ? (
          reseñas.map((reseña) => (
            <div key={reseña.id} className="reseña">
              <h3>{reseña.author}</h3>
              <p>{reseña.content}</p>
            </div>
          ))
        ) : (
          <p>No hay reseñas disponibles para esta película.</p>
        )}
      </div>
    </div>
  );
};

export default Pelicula;
