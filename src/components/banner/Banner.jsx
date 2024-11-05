import React from 'react'

const Banner = () => {
    return (
        <>
            <div className="banner">
                <div className="content active">
                    <img src="./imagenes/peliculas/laSirenita-logo.png" alt="laSirenita-logo" className="movie-title" />
                    <h4>
                        <span>2023</span><span><i>12+</i></span><span>2h 14min</span><span>Romance</span>
                    </h4>
                    <p>Hola</p>
                    <div className="button">
                        <a href="#"><i class="fa-solid fa-play"></i>Mirar</a>
                        <a href="#"><i class="fa-solid fa-plus"></i>Mi Lista</a>
                    </div>
                </div>
                <div className="carousel-box">
                    <div className="carousel">
                        <div className="carousel-item">
                            <img src="../imagenes/peliculas/laSirenita-poster.jpeg" alt="laSirenita-poster" />
                        </div>
                        <div className="carousel-item">
                            <img src="../imagenes/peliculas/joker-poster.avif" alt="joker-poster" />
                        </div>
                        <div className="carousel-item">
                            <img src="../imagenes/peliculas/theSubstance-poster.jpg" alt="laSustancia-poster" />
                        </div>
                        <div className="carousel-item">
                            <img src="../imagenes/peliculas/terrifier-poster.webp" alt="terrifier-poster" />
                        </div>
                        <div className="carousel-item">
                            <img src="../imagenes/peliculas/venom3-poster.jpg" alt="venom-poster" />
                        </div>
                    </div>
                </div>
                <a href="#" className="play"><i class="fa-solid fa-circle-play"></i>Mirar Trailer</a>
                <ul className="sci">
                    <li><a href="#"></a><i class="fa-brands fa-youtube"></i></li>
                </ul>

            </div>
        </>
    )
}

export default Banner