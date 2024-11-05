import React from 'react'


const Header = () => {
    return (
        <>
            <header>
                <a href="#" className='logo'>CineLuxe</a>
                <ul className='nav'>
                    <li><a href="#"></a><i class="fa-solid fa-house"></i></li>
                    <li><a href="#"></a>Home</li>
                    <li><a href="#"></a>Home</li>
                    <li><a href="#"></a>Home</li>
                </ul>

                <div className='search'>
                    <input type="text" placeholder='Search' />
                    <i class="fa-solid fa-magnifying-glass"></i>
                </div>
            </header>
        </>
    )
}

export default Header