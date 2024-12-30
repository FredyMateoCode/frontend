//Es el encargado de realizar la solicitud GET AL SERVIDOR MEDIANTE LA RUTA:
import axios from 'axios';

export const cargarUsuarios = async () => {
    try {
        const response = await axios.get('http://192.168.1.6:4000/mostrarUsuarios/usuarios2024');
        console.log("Usuarios cargados:", response.data); // Verificar que los usuarios se están recibiendo
        return response.data;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        return [];
    }
};

export default cargarUsuarios;


