//Obtiene los datos de la API y pasa a Clientes.js.
import axios from 'axios';

export const cargarClientes = async() =>{
	try{
		const response = await axios.get('http://192.168.1.6:4000/mostrarClientes/clientes');
		console.log("Clientes Cargados:", response.data);
		return response.data; // Devuelve los datos al componente
	}catch (error){
		console.log('Error al obtener los usuarios', error);
		throw error;  // Lanza el error para que sea capturado en Clientes.js
	}
};

export default cargarClientes;



