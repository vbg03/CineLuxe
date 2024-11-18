import React, { useState } from 'react';
import './MiniPerfil.css'; // Asegúrate de que este archivo incluya los estilos actualizados

const MiniPerfil = ({ user, onLogout }) => {
    const [isVisible, setIsVisible] = useState(true); // Estado para controlar la visibilidad del componente

    if (!user || !isVisible) {
        return null; // Si el usuario no está autenticado o el perfil está cerrado, no renderiza nada
    }

    const handleClose = () => {
        setIsVisible(false); // Oculta el perfil
    };

    return (
        <div className="mini-perfil active-popup">
            <span
                className="icon-close"
                onClick={handleClose} // Llama a la función que cierra el perfil
            >
                <i className="fa-solid fa-x"></i>
            </span>
            <div className="perfil-header">
                {/* Icono de foto de perfil */}
                <div className="foto-perfil">
                    {user.photoURL ? (
                        <img src={user.photoURL} alt="Foto de perfil" />
                    ) : (
                        <i className="fa-solid fa-user-circle"></i>
                    )}
                </div>
                <h2>Perfil del Usuario</h2>
            </div>
            <p><strong>Nombre:</strong> {user.displayName || 'Sin nombre'}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <button className="btn-logout" onClick={onLogout}>
                Cerrar Sesión
            </button>
        </div>
    );
};

export default MiniPerfil;
