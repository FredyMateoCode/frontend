// componentes/EditarUsuario.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useObtenerYActualizarUsuario from '../servicios/obtenerYActualizarUsuarioServicio';
import FormularioDeEdicionDeUsuario from '../ayudas/formularioDeEdicionDeUsuarioAyuda';

import Swal from 'sweetalert2';//Importamos la dependencia para mostrar los mensajes.

const EditarUsuario = () => {
    const { id } = useParams(); // Obtener el ID del usuario desde la URL
    const navigate = useNavigate();
    const { usuario, setUsuario, actualizarUsuario } = useObtenerYActualizarUsuario(id);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        actualizarUsuario(usuario)
            .then(() => {
                //alert('Usuario actualizado correctamente');
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Registro Actualizada!',
                });
                navigate('/dashboard/usuarios');
            })
            .catch((error) => console.error('Error al actualizar el usuario:', error));
    };

    return (
        <div>
            <h2>Editar Usuario</h2>
            <FormularioDeEdicionDeUsuario
                usuario={usuario}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
        </div>
    );
};

export default EditarUsuario;
