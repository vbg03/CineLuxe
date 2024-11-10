import React, { useEffect } from 'react';
import M from 'materialize-css'; // Asegúrate de que esté instalado

const Banner = () => {
    useEffect(() => {
        const elems = document.querySelectorAll('.carousel');
        M.Carousel.init(elems, {
            fullWidth: false,
            shift: 10,
            indicators: false,
            padding: 30 // Espacio entre ítems
        });
    }, []);

    const changeBg = (bg, title) => {
        const banner = document.querySelector('.banner');
        const contents = document.querySelectorAll('.content');

        // Cambia el fondo del banner
        banner.style.background = `url("./imagenes/peliculas/${bg}")`;
        banner.style.backgroundSize = 'cover';
        banner.style.backgroundPosition = 'center';

        // Cambia el contenido activo
        contents.forEach(content => {
            content.classList.remove('active');
            if (content.classList.contains(title)) {
                content.classList.add('active');
            }
        });
    };

    

    return (
        <>
            <div className="banner">
                <div className="content laSirenita active">
                    <img src="/imagenes/peliculas/laSirenita-title.png" alt="laSirenita-logo" className="movie-title" />
                    <h4>
                        <span>2023</span><span><i>12+</i></span><span>2h 14min</span><span>Romance</span>
                    </h4>
                    <p>Hola</p>
                    <div className="button">
                        <a href="#"><i className="fa-solid fa-play"></i>Mirar</a>
                        <a href="#"><i className="fa-solid fa-plus"></i>Mi Lista</a>
                    </div>
                </div>
                <div className="content joker">
                    <img src="/imagenes/peliculas/joker-title.png" alt="joker-logo" className="movie-title" />
                    <h4>
                        <span>2024</span><span><i>15+</i></span><span>2h 14min</span><span>Romance</span>
                    </h4>
                    <p>Hola</p>
                    <div className="button">
                        <a href="#"><i className="fa-solid fa-play"></i>Mirar</a>
                        <a href="#"><i className="fa-solid fa-plus"></i>Mi Lista</a>
                    </div>
                </div>
                <div className="content terrifier">
                    <img src="/imagenes/peliculas/terrifier-title.png" alt="terrifier-logo" className="movie-title" />
                    <h4>
                        <span>2024</span><span><i>18+</i></span><span>2h 14min</span><span>Terror</span>
                    </h4>
                    <p>Hola</p>
                    <div className="button">
                        <a href="#"><i className="fa-solid fa-play"></i>Mirar</a>
                        <a href="#"><i className="fa-solid fa-plus"></i>Mi Lista</a>
                    </div>
                </div>
                <div className="content theSubstance">
                    <img src="/imagenes/peliculas/theSubstance-title.webp" alt="theSubstance-logo" className="movie-title" />
                    <h4>
                        <span>2024</span><span><i>18+</i></span><span>2h 14min</span><span>Suspenso</span>
                    </h4>
                    <p>Hola</p>
                    <div className="button">
                        <a href="#"><i className="fa-solid fa-play"></i>Mirar</a>
                        <a href="#"><i className="fa-solid fa-plus"></i>Mi Lista</a>
                    </div>
                </div>
                <div className="content venom3">
                    <img src="/imagenes/peliculas/venom3-title.png" alt="venom3-logo" className="movie-title" />
                    <h4>
                        <span>2024</span><span><i>12+</i></span><span>2h 14min</span><span>Acción</span>
                    </h4>
                    <p>Hola</p>
                    <div className="button">
                        <a href="#"><i className="fa-solid fa-play"></i>Mirar</a>
                        <a href="#"><i className="fa-solid fa-plus"></i>Mi Lista</a>
                    </div>
                </div>
                <div className="carousel-box">
                    <div className="carousel">
                        <div className="carousel-item" onClick={() => changeBg('bg-laSirenita.jpg', 'laSirenita')}>
                            <img src="/imagenes/peliculas/laSirenita-poster.jpeg" alt="laSirenita-poster" />
                        </div>
                        <div className="carousel-item" onClick={() => changeBg('bg-joker.jpg', 'joker')}>
                            <img src="/imagenes/peliculas/joker-poster.avif" alt="joker-poster" />
                        </div>
                        <div className="carousel-item" onClick={() => changeBg('bg-theSubstance.jpg', 'theSubstance')}>
                            <img src="/imagenes/peliculas/theSubstance-poster.jpg" alt="theSubstance-poster" />
                        </div>
                        <div className="carousel-item" onClick={() => changeBg('bg-terrifier.jpeg', 'terrifier')}>
                            <img src="/imagenes/peliculas/terrifier-poster.webp" alt="terrifier-poster" />
                        </div>
                        <div className="carousel-item" onClick={() => changeBg('bg-venom3.webp', 'venom3')}>
                            <img src="/imagenes/peliculas/venom3-poster.jpg" alt="venom3-poster" />
                        </div>
                    </div>
                </div>
                <a href="#" className="play"><i className="fa-solid fa-circle-play"></i>Mirar Trailer</a>
            </div>
        </>
    );
}

export default Banner;
