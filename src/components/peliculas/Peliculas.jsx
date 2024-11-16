import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Importar useNavigate
import './Peliculas.css';

const Peliculas = () => {
    const { genreId } = useParams();
    const navigate = useNavigate(); // Crear instancia de useNavigate
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const API_KEY = '7f725faee93092b2c693d44412011a01';
    const BASE_URL = 'https://api.themoviedb.org/3';

    useEffect(() => {
        fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=es-ES`)
            .then((response) => response.json())
            .then((data) => setGenres(data.genres));
    }, []);

    useEffect(() => {
        const endpoint = genreId
            ? `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=es-ES`
            : `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES`;

        fetch(endpoint)
            .then((response) => response.json())
            .then((data) => setMovies(data.results));
    }, [genreId]);

    const handleMovieClick = (movie) => {
        setSelectedMovie(movie);
    };

    return (
        <div className="peliculas-container">
            <aside className="categorias">
                <h2>Géneros</h2>
                <ul>
                    <li onClick={() => window.location.href = '/peliculas'}>Todos</li>
                    {genres.map((genre) => (
                        <li
                            key={genre.id}
                            onClick={() => window.location.href = `/peliculas/${genre.id}`}
                        >
                            {genre.name}
                        </li>
                    ))}
                </ul>
            </aside>

            <main className="peliculas">
                <div className="peliculas-grid">
                    {movies.map((movie) => (
                        <div
                            key={movie.id}
                            className="pelicula"
                            onClick={() => handleMovieClick(movie)}
                        >
                            <img
                                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                alt={movie.title}
                            />
                            <h3>{movie.title}</h3>
                            <p>{movie.release_date}</p>
                        </div>
                    ))}
                </div>
            </main>

            <aside className="detalles-pelicula">
                {selectedMovie ? (
                    <div className="detalles-contenido">
                        <h2>{selectedMovie.title}</h2>
                        <p>
                            <strong>Fecha de lanzamiento:</strong> {selectedMovie.release_date}
                        </p>
                        <p>
                            <strong>Descripción:</strong> {selectedMovie.overview}
                        </p>
                        {/* Botón modificado para redirigir a la página de detalles */}
                        <button
                            className="btn-reproducir"
                            onClick={() => navigate(`/pelicula/${selectedMovie.id}`)}
                        >
                            Saber Más
                        </button>
                    </div>
                ) : (
                    <p>Selecciona una película para ver los detalles.</p>
                )}
            </aside>
        </div>
    );
};

export default Peliculas;
