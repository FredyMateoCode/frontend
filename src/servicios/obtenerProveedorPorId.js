import axios from 'axios'; //Se encarga de realizar las solicitudes HTTP al servidor (GET, POST...);

const obtenerProveedorPorId = async (id_prov) => {
	try{
		const respuesta = await axios.get(`http://192.168.1.6:4000/api/proveedores/${id_prov}`);
		return respuesta.data;//Devuelve los datos del cliente.
	}catch (error){
		throw new Error('Error al  obtener el proveedor: ' + error.message);
	}
};

export default obtenerProveedorPorId;

