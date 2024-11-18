import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';

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
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const wrapper = document.querySelector('.wrapper');
    const loginLink = document.querySelector('.login-link');
    const registerLink = document.querySelector('.register-link');
    const btnPopup = document.querySelector('.btnLogin-popup');
    const iconClose = document.querySelector('.icon-close');

    registerLink &&
      registerLink.addEventListener('click', () => {
        wrapper.classList.add('active');
        setIsRegistering(true);
        resetForm();
      });

    loginLink &&
      loginLink.addEventListener('click', () => {
        wrapper.classList.remove('active');
        setIsRegistering(false);
        resetForm();
      });

    btnPopup &&
      btnPopup.addEventListener('click', () => {
        wrapper.classList.add('active-popup');
      });

    iconClose &&
      iconClose.addEventListener('click', () => {
        wrapper.classList.remove('active-popup');
      });

    return () => {
      registerLink &&
        registerLink.removeEventListener('click', () => wrapper.classList.add('active'));
      loginLink &&
        loginLink.removeEventListener('click', () => wrapper.classList.remove('active'));
      btnPopup &&
        btnPopup.removeEventListener('click', () => wrapper.classList.add('active-popup'));
      iconClose &&
        iconClose.removeEventListener('click', () => wrapper.classList.remove('active-popup'));
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
            setIsRegistering(false);
          }}
        >
          Volver a Iniciar Sesión
        </button>
      </div>
    );
  }

  if (isLoggedIn && showWelcome) {
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
          <button className="btn btn-green" onClick={() => setShowWelcome(false)}>
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

  return (
    <div className="wrapper">
      <span
        className="icon-close"
        onClick={() => {
          document.querySelector('.wrapper').classList.remove('active-popup');
          setIsRegistering(false);
          resetForm();
        }}
      >
        <i className="fa-solid fa-x"></i>
      </span>
      <div className="form-box">
        <h2>{isRegistering ? 'Registrarse' : 'Ingresar'}</h2>
        <form onSubmit={isRegistering ? handleRegister : handleLogin}>
          {isRegistering && (
            <div className="input-box">
              <span className="icon"><i className="fa-solid fa-user"></i></span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label>Nombre de usuario</label>
            </div>
          )}
          <div className="input-box">
            <span className="icon"><i className="fa-solid fa-envelope"></i></span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Correo electrónico</label>
          </div>
          <div className="input-box">
            <span className="icon"><i className="fa-solid fa-lock"></i></span>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Contraseña</label>
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: 'pointer' }}
            >
              {showPassword ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
            </span>
          </div>
          {error && <p className="error">{error}</p>}
          {!isRegistering && (
            <div className="remember-forgot">
              <a href="#" onClick={handlePasswordReset}>¿Olvidaste tu contraseña?</a>
            </div>
          )}
          <button type="submit" className="btn" disabled={isLoading}>
            {isLoading ? 'Cargando...' : isRegistering ? 'Registrarse' : 'Iniciar Sesión'}
          </button>
        </form>
        <div className="login-register">
          <p>
            {isRegistering ? '¿Ya tienes una cuenta?' : '¿No tienes una cuenta?'}
            <a
              href="#"
              onClick={() => {
                setIsRegistering(!isRegistering);
                resetForm();
              }}
            >
              {isRegistering ? ' Ingresa' : ' Regístrate'}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
