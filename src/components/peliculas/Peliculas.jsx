import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './Peliculas.css';

const Peliculas = () => {
    const { genreId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);

    const API_KEY = '7f725faee93092b2c693d44412011a01';
    const BASE_URL = 'https://api.themoviedb.org/3';

    // Leer término de búsqueda de la URL
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('search') || '';

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
            .then((data) => {
                setMovies(data.results);
                setFilteredMovies(data.results);
            });
    }, [genreId]);

    useEffect(() => {
        if (searchTerm) {
            setFilteredMovies(
                movies.filter((movie) =>
                    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        } else {
            setFilteredMovies(movies);
        }
    }, [searchTerm, movies]);

    const handleMovieClick = (movieId) => {
        navigate(`/pelicula/${movieId}`);
    };

    return (
        <div className="peliculas-container">
            <aside className="categorias">
                <h2>Géneros</h2>
                <ul>
                    <li onClick={() => navigate('/peliculas')}>Todos</li>
                    {genres.map((genre) => (
                        <li
                            key={genre.id}
                            onClick={() => navigate(`/peliculas/${genre.id}`)}
                        >
                            {genre.name}
                        </li>
                    ))}
                </ul>
            </aside>

            <main className="peliculas">
                <div className="peliculas-grid">
                    {filteredMovies.map((movie) => (
                        <div
                            key={movie.id}
                            className="pelicula"
                            onClick={() => handleMovieClick(movie.id)}
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
        </div>
    );
};

export default Peliculas;
