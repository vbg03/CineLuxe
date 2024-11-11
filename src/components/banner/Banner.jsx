import React, { useEffect, useRef } from 'react';
import M from 'materialize-css';

const Banner = () => {
    const intervalRef = useRef(null); // Referencia para el intervalo

    useEffect(() => {
        const elems = document.querySelectorAll('.carousel');
        const instance = M.Carousel.init(elems, {
            fullWidth: false,
            shift: 10,
            indicators: false,
            padding: 30,
            onCycleTo: (activeItem) => {
                const bg = activeItem.getAttribute('data-bg');
                const title = activeItem.getAttribute('data-title');
                changeBg(bg, title);
            }
        });

        // Movimiento automático cada 5 segundos
        intervalRef.current = setInterval(() => {
            const carouselInstance = M.Carousel.getInstance(elems[0]);
            if (carouselInstance) {
                carouselInstance.next(); // Mueve al siguiente ítem
            }
        }, 5000);

        return () => clearInterval(intervalRef.current); // Limpia el intervalo al desmontar el componente
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

    const handleItemClick = (bg, title) => {
        clearInterval(intervalRef.current); // Detén el movimiento automático
        changeBg(bg, title); // Actualiza el fondo y el contenido
    };

    return (
        <>
            <div className="banner">
                {/* Contenidos dinámicos */}
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

                {/* Carrusel */}
                <div className="carousel-box">
                    <div className="carousel">
                        <div className="carousel-item" data-bg="bg-laSirenita.jpg" data-title="laSirenita" onClick={() => handleItemClick('bg-laSirenita.jpg', 'laSirenita')}>
                            <img src="/imagenes/peliculas/laSirenita-poster.jpeg" alt="laSirenita-poster" />
                        </div>
                        <div className="carousel-item" data-bg="bg-joker.jpg" data-title="joker" onClick={() => handleItemClick('bg-joker.jpg', 'joker')}>
                            <img src="/imagenes/peliculas/joker-poster.avif" alt="joker-poster" />
                        </div>
                        <div className="carousel-item" data-bg="bg-theSubstance.jpg" data-title="theSubstance" onClick={() => handleItemClick('bg-theSubstance.jpg', 'theSubstance')}>
                            <img src="/imagenes/peliculas/theSubstance-poster.jpg" alt="theSubstance-poster" />
                        </div>
                        <div className="carousel-item" data-bg="bg-terrifier.jpeg" data-title="terrifier" onClick={() => handleItemClick('bg-terrifier.jpeg', 'terrifier')}>
                            <img src="/imagenes/peliculas/terrifier-poster.webp" alt="terrifier-poster" />
                        </div>
                        <div className="carousel-item" data-bg="bg-venom3.webp" data-title="venom3" onClick={() => handleItemClick('bg-venom3.webp', 'venom3')}>
                            <img src="/imagenes/peliculas/venom3-poster.jpg" alt="venom3-poster" />
                        </div>
                    </div>
                </div>

                {/* Botón para el trailer */}
                <a href="#" className="play"><i className="fa-solid fa-circle-play"></i>Mirar Trailer</a>
            </div>
        </>
    );
};

export default Banner;
