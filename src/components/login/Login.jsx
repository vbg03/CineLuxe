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
            awa