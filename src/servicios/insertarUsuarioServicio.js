//Esta funcion es la que interactua directamente con el servidor
// services/usuarioService.js
import axios from 'axios';
import { cargarUsuarios } from './cargarUsuarios'; // Asegúrate de importar cargarUsuarios desde su archivo

// Función para insertar un nuevo usuario
export const insertarUsuario = async (usuario, setUsuarios, handleVolver) => {
    try {
        // Envía el usuario al backend y usuario tiene´los datos del usuario desde el formulario.
        await axios.post('http://192.168.1.6:4000/api/insertarUsuario', usuario);
        //alert('Usuario insertado correctamente SERVICIOS');
        
        // Cargar la lista de usuarios actualizada
        const nuevosUsuarios = await cargarUsuarios(); 
        setUsuarios(nuevosUsuarios); // Actualizar el estado con la nueva lista de usuarios
        handleVolver(); // Cierra el formulario y vuelve a la vista de lista
    } catch (error) {
        console.error('Error al insertar usuario:', error);
    }
};
