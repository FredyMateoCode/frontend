import axios from 'axios';

const eliminarClienteServicio = async (id) => {
    try {
        const respuesta = await axios.delete(`http://192.168.1.6:4000/api/eliminarCliente/${id}`);
        return respuesta;  // Retorna la respuesta completa para que el frontend la maneje
    } catch (error) {
        console.error('Error al eliminar el cliente:', error);
        throw error;  // Lanza el error para que sea manejado en el frontend
    }
};

export default eliminarClienteServicio;
