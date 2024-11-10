import React, { useEffect } from 'react';

const Login = () => {
    useEffect(() => {
        // Selecciona los elementos después de que el componente esté montado
        const wrapper = document.querySelector('.wrapper');
        const loginLink = document.querySelector('.login-link');
        const registerLink = document.querySelector('.register-link');
        const btnPopup = document.querySelector('.btnLogin-popup');
        const iconClose = document.querySelector('.icon-close');

        // Verifica si los elementos existen antes de agregar los eventos
        registerLink && registerLink.addEventListener('click', () => {
            wrapper.classList.add('active');
        });

        btnPopup && btnPopup.addEventListener('click', () => {
            wrapper.classList.add('active-popup');
        });

        loginLink && loginLink.addEventListener('click', () => {
            wrapper.classList.remove('active');
        });

        iconClose && iconClose.addEventListener('click', () => {
            wrapper.classList.remove('active-popup');
        });

        // Limpia los event listeners cuando el componente se desmonte
        return () => {
            registerLink && registerLink.removeEventListener('click', () => wrapper.classList.add('active'));
            btnPopup && btnPopup.removeEventListener('click', () => wrapper.classList.add('active-popup'));
            loginLink && loginLink.removeEventListener('click', () => wrapper.classList.remove('active'));
            iconClose && iconClose.removeEventListener('click', () => wrapper.classList.remove('active-popup'));
        };
    }, []);

    return (
        <div className='wrapper'>
            <span className="icon-close"><i class="fa-solid fa-x"></i></span>
            <div className="form-box login">
                <h2>Ingresar</h2>
                <form action="#">
                    <div className="input-box">
                        <span className="icon"><i class="fa-solid fa-envelope"></i></span>
                        <input type="email" required />
                        <label>Email</label>
                    </div>
                    <div className="input-box">
                        <span className="icon"><i class="fa-solid fa-lock"></i></span>
                        <input type="password" required />
                        <label>Contraseña</label>
                    </div>
                    <div className="remember-forgot">
                        <a href="#">¿Olvidaste tu contraseña?</a>
                    </div>
                    <button type='submit' className='btn'>Iniciar Sesión</button>
                    <div className="login-register">
                        <p>¿No tienes una cuenta?<a href="#" className='register-link'> Registrate</a></p>
                    </div>
                </form>
            </div>

            <div className="form-box register">
                <h2>Registrarse</h2>
                <form action="#">
                    <div className="input-box">
                        <span className="icon"><i class="fa-solid fa-user"></i></span>
                        <input type="text" required />
                        <label>Usuario</label>
                    </div>
                    <div className="input-box">
                        <span className="icon"><i class="fa-solid fa-envelope"></i></span>
                        <input type="email" required />
                        <label>Email</label>
                    </div>
                    <div className="input-box">
                        <span className="icon"><i class="fa-solid fa-lock"></i></span>
                        <input type="password" required />
                        <label>Contraseña</label>
                    </div>
                    <div className="remember-forgot">
                    </div>
                    <button type='submit' className='btn'>Registrarse</button>
                    <div className="login-register">
                        <p>¿Ya tienes una cuenta?<a href="#" className='login-link'> Ingresa</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;