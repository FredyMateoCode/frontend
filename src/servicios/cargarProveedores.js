//Primero obtenemos los datos desde la API backend.
import axios from 'axios';

export const cargarProveedores = async() =>{
	try{
		const response = await axios.get('http://192.168.1.6:4000/mostrarProveedores/proveedores');
		console.log("Proveedores Cargados:", response.data);
		return response.data; //Devuelve los datos al componente Proveedores.js
	}catch (error){
		console.log('Error ala obtener los usuarios', error);
		throw error;// Lanza el error para que sea capturado por el cliente.
	}
};

export default cargarProveedores;