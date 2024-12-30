import { jwtDecode } from 'jwt-decode';

const decodificarToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            return decodedToken.rol; // Devuelve el rol directamente
        } catch (error) {
            console.error('Error al decodificar el token:', error);
            return null;
        }
    }
    return null;
};

export default decodificarToken;
