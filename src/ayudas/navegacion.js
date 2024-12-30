// src/helpers/navigation.js
//Definición de la función para editar usuario que redirige a la página de edición, pasando el id_usuario en la URL.
export const handleEdit = (id_usuario, navigate) => {
    navigate(`/dashboard/usuarios/editar/${id_usuario}`);
};
