import React, { useEffect, useState } from 'react';
import Footer from '../footer/Footer';
import './Peliculas.css';

const Peliculas = () => {
    const [genres, setGenres] = useState([]);
    const [movies, setMovies] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const API_KEY = '7f725faee93092b2c693d44412011a01';
    const BASE_URL = 'https://api.themoviedb.org/3';

    // Cargar géneros al montar el componente
    useEffect(() => {
        fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`)
            .then((response) => response.json())
            .then((data) => setGenres(data.genres));
    }, []);

    // Cargar películas (todas o por género seleccionado)
    useEffect(() => {
        const endpoint = selectedGenre
            ? `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${selectedGenre}`
            : `${BASE_URL}/movie/popular?api_key=${API_KEY}`;

        fetch(endpoint)
            .then((response) => response.json())
            .then((data) => setMovies(data.results));
    }, [selectedGenre]);

    useEffect(() => {
        // Cargar los géneros al montar el componente (en español)
        fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=es-ES`)
            .then(response => response.json())
            .then(data => setGenres(data.genres));
    }, []);
    
    useEffect(() => {
        const endpoint = selectedGenre
            ? `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${selectedGenre}&language=es-ES`
            : `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES`;
    
        // Cargar películas (en español)
        fetch(endpoint)
            .then(response => response.json())
            .then(data => setMovies(data.results));
    }, [selectedGenre]);

    const handleGenreClick = (genreId) => {
        setSelectedGenre(genreId); // Establecer género seleccionado
    };

    const handleMovieClick = (movie) => {
        setSelectedMovie(movie); // Establecer película seleccionada
    };

    return (
        <>
            <div className="peliculas-container">
                {/* Sección de categorías */}
                <aside className="categorias">
                    <h2>Géneros</h2>
                    <ul>
                        <li onClick={() => setSelectedGenre(null)}>Todos</li> {/* Opción para mostrar todas las películas */}
                        {genres.map((genre) => (
                            <li key={genre.id} onClick={() => handleGenreClick(genre.id)}>
                                {genre.name}
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* Sección de películas */}
                <main className="peliculas">
                    <div className="peliculas-grid">
                        {movies.map((movie) => (
                            <div
                                key={movie.id}
                                className="pelicula"
                                onClick={() => handleMovieClick(movie)} // Evento para seleccionar película
                            >
                                <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                                <h3>{movie.title}</h3>
                                <p>{movie.release_date}</p>
                            </div>
                        ))}
                    </div>
                </main>

                {/* Sección de detalles de la película */}
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
                            <button className="btn-reproducir">Reproducir</button>
                        </div>
                    ) : (
                        <p>Selecciona una película para ver los detalles.</p>
                    )}
                </aside>
            </div>
            <Footer />
        </>
    );
};

export default Peliculas;
