import React from 'react';

const Header = () => {
    return (
        <>
            <header>
                <div className='nav'>
                    <a href="#" className='logo'>CineLuxe</a>
                    <ul className='links'>
                        <li><a href="#"><i className="fa-solid fa-house"></i></a></li>
                        <li><button className="btnLogin-popup"><i class="fa-solid fa-user"></i></button></li>
                        <li><a href="#">Películas</a></li>
                    </ul>
                    <div className='search'>
                        <input type="text" placeholder='Search' />
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header