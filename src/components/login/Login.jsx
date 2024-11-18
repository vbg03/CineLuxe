import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase/firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
} from "firebase/auth";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [logoutMessage, setLogoutMessage] = useState(false);
    const [showWelcome, setShowWelcome] = useState(false);

    useEffect(() => {
        const wrapper = document.querySelector('.wrapper');
        const loginLink = document.querySelector('.login-link');
        const registerLink = document.querySelector('.register-link');
        const btnPopup = document.querySelector('.btnLogin-popup');
        const iconClose = document.querySelector('.icon-close');

        registerLink && registerLink.addEventListener('click', () => {
            wrapper.classList.add('active');
            setIsRegistering(true);
            resetForm();
        });

        loginLink && loginLink.addEventListener('click', () => {
            wrapper.classList.remove('active');
            setIsRegistering(false);
            resetForm();
        });

        btnPopup && btnPopup.addEventListener('click', () => {
            wrapper.classList.add('active-popup');
        });

        iconClose && iconClose.addEventListener('click', () => {
            wrapper.classList.remove('active-popup');
        });

        return () => {
            registerLink && registerLink.removeEventListener('click', () => wrapper.classList.add('active'));
            btnPopup && btnPopup.removeEventListener('click', () => wrapper.classList.add('active-popup'));
            loginLink && loginLink.removeEventListener('click', () => wrapper.classList.remove('active'));
            iconClose && iconClose.removeEventListener('click', () => wrapper.classList.remove('active-popup'));
        };
    }, []);

    const resetForm = () => {
        setEmail('');
        setPassword('');
        setUsername('');
        setError('');
    };

    const handleError = (errorCode) => {
        switch (errorCode) {
            case 'auth/email-already-in-use':
                return 'El email ya está registrado.';
            case 'auth/invalid-email':
                return 'El email ingresado no es válido.';
            case 'auth/weak-password':
                return 'La contraseña debe tener al menos 6 caracteres.';
            case 'auth/user-not-found':
                return 'No se encontró un usuario con ese email.';
            case 'auth/wrong-password':
                return 'La contraseña es incorrecta.';
            default:
                return 'Ocurrió un error. Por favor, intenta de nuevo.';
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setIsLoggedIn(true);
            setShowWelcome(true);
        } catch (err) {
            setError(handleError(err.code));
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        if (!username.trim()) {
            setError('El nombre de usuario es obligatorio.');
            setIsLoading(false);
            return;
        }
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setIsLoggedIn(true);
            setShowWelcome(true);
        } catch (err) {
            setError(handleError(err.code));
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordReset = async () => {
        if (!email) {
            setError('Por favor ingresa tu email para restablecer la contraseña.');
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            alert('Se ha enviado un enlace para restablecer la contraseña a tu correo.');
        } catch (err) {
            setError(handleError(err.code));
        }
    };

    // Mensaje de sesión cerrada
    if (logoutMessage && !showWelcome) {
        return (
            <div className="wrapper logout-message">
                <span
                    className="icon-close"
                    onClick={() => setLogoutMessage(false)}
                >
                    <i className="fa-solid fa-x"></i>
                </span>
                <h2>Sesión cerrada</h2>
                <p>Has cerrado sesión correctamente.</p>
                <button
                    className="btn btn-green"
                    onClick={() => {
                        setLogoutMessage(false);
                        setIsRegistering(false); // Vuelve al estado de inicio de sesión
                    }}
                >
                    Volver a Iniciar Sesión
                </button>
            </div>
        );
    }

// Mensaje de bienvenida después del inicio de sesión
if (isLoggedIn && showWelcome && !logoutMessage) {
    return (
        <div className="wrapper welcome">
            <span
                className="icon-close"
                onClick={() => setShowWelcome(false)}
            >
                <i className="fa-solid fa-x"></i>
            </span>
            <h2>Bienvenido/a</h2>
            <p>Has iniciado sesión exitosamente.</p>
            <div className="button-group">
                <button
                    className="btn btn-green"
                    onClick={() => setShowWelcome(false)}
                >
                    Continuar
                </button>
                <button
                    className="btn btn-logout"
                    onClick={() => {
                        setIsLoggedIn(false);
                        setShowWelcome(false);
                        setLogoutMessage(true);
                    }}
                >
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
}


    // Formulario de inicio o registro
    return (
        <div className='wrapper'>
            <span className="icon-close"><i className="fa-solid fa-x"></i></span>
            {!isRegistering ? (
                <div className="form-box login">
                    <h2>Ingresar</h2>
                    <form onSubmit={handleLogin}>
                        <div className="input-box">
                            <span className="icon"><i className="fa-solid fa-envelope"></i></span>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                title="Por favor, introduce un email válido"
                            />
                            <label>Email</label>
                        </div>
                        <div className="input-box">
                            <span className="icon"><i className="fa-solid fa-lock"></i></span>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                minLength="6"
                                title="La contraseña debe tener al menos 6 caracteres"
                            />
                            <label>Contraseña</label>
                        </div>
                        {error && <p className="error">{error}</p>}
                        <div className="remember-forgot">
                            <a href="#" onClick={handlePasswordReset}>¿Olvidaste tu contraseña?</a>
                        </div>
                        <button type='submit' className='btn' disabled={isLoading}>
                            {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
                        </button>
                        <div className="login-register">
                            <p>¿No tienes una cuenta?<a href="#" className='register-link'> Registrate</a></p>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="form-box register">
                    <h2>Registrarse</h2>
                    <form onSubmit={handleRegister}>
                        <div className="input-box">
                            <span className="icon"><i className="fa-solid fa-user"></i></span>
                            <input
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <label>Usuario</label>
                        </div>
                        <div className="input-box">
                            <span className="icon"><i className="fa-solid fa-envelope"></i></span>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                title="Por favor, introduce un email válido"
                            />
                            <label>Email</label>
                        </div>
                        <div className="input-box">
                            <span className="icon"><i className="fa-solid fa-lock"></i></span>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                minLength="6"
                                title="La contraseña debe tener al menos 6 caracteres"
                            />
                            <label>Contraseña</label>
                        </div>
                        {error && <p className="error">{error}</p>}
                        <button type='submit' className='btn' disabled={isLoading}>
                            {isLoading ? 'Cargando...' : 'Registrarse'}
                        </button>
                        <div className="login-register">
                            <p>¿Ya tienes una cuenta?<a href="#" className='login-link'> Ingresa</a></p>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Login;