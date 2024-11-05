import React from 'react'


const Header = () => {
    return (
        <>
            <header>
                <a href="#" className='logo'>CineLuxe</a>
                <ul className='nav'>
                    <li><a href="#"><i className="fa-solid fa-house"></i></a></li>
                    <li><a href="#">Películas</a></li>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Home</a></li>
                </ul>

                <div className='search'>
                    <input type="text" placeholder='Search' />
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>
            </header>
        </>
    )
}

export default Header