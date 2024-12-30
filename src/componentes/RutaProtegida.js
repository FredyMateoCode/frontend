import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Importa jwtDecode como un export nombrado para decodificar el tocken.

const RutaProtegida = ({ allowedRoles, children }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/" />;
    }

    try {
        const decodedToken = jwtDecode(token);
        const { rol, exp } = decodedToken;
            if (Date.now() >= exp * 1000) {
                localStorage.removeItem('token');
                return <Navigate to="/" />;
            }

        if (!allowedRoles.includes(rol)) {
            // Redirige si el rol del usuario no está permitido
            return <Navigate to="/dashboard" />;
        }

        return children; // Renderiza el componente si el rol está permitido
    } catch (error) {
        console.error('Error al verificar el token:', error);
        return <Navigate to="/" />;
    }
};

export default RutaProtegida;
