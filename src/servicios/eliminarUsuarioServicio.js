// servicios/eliminarUsuarioServicio.js

import axios from 'axios';
import cargarUsuarios from './cargarUsuarios'; // Asegúrate de importar cargarUsuarios
import Swal from 'sweetalert2'; // Importamos la dependencia para mostrar los mensajes

const eliminarUsuario = async (id_usuario, setUsuarios) => {
    try {
        // Usamos SweetAlert2 para la confirmación
        const result = await Swal.fire({
            title: '¿Estás seguro de eliminar este usuario?',
            text: "¡Esta acción no se puede deshacer!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true // Opcional, invierte los botones
        });

        // Si el usuario hace clic en "Sí, eliminar"
        if (result.isConfirmed) {
            // Envía la solicitud para eliminar
            await axios.delete(`http://192.168.1.6:4000/api/eliminarUsuario/${id_usuario}`);
            
            // Muestra el mensaje de éxito
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Registro Eliminado!'
            });

            // Actualiza la lista de usuarios
            const nuevosUsuarios = await cargarUsuarios(); // Llama a cargarUsuarios para actualizar la lista
            setUsuarios(nuevosUsuarios); // Actualiza el estado con la nueva lista
        } else {
            // Si el usuario cancela
            Swal.fire({
                icon: 'info',
                title: 'Operación cancelada',
                text: 'No se eliminó ningún usuario'
            });
        }
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al eliminar el usuario. Intenta de nuevo.'
        });
    }
};

export default eliminarUsuario;
