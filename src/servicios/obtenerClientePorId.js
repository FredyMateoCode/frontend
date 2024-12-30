import axios from 'axios';

const obtenerClientePorId = async (id_clie) => {
    try {
        const respuesta = await axios.get(`http://192.168.1.6:4000/api/clientes/${id_clie}`);
        return respuesta.data; // Devuelve los datos del cliente
    } catch (error) {
        throw new Error('Error al obtener el cliente: ' + error.message);
    }
};

export default obtenerClientePorId;
