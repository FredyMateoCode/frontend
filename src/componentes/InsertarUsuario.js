import React, { useState } from 'react';

import Swal from 'sweetalert2';//Importamos la dependencia para mostrar los mensajes.

const InsertarUsuario = ({ volver, insertarUsuario }) => {
    const [usuario, setUsuario] = useState({
        usuario_nom: '',
        nombre_usuario: '',
        apellido_usuario: '',
        contrasenia: '',
        id_rol: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false); // Añadir estado para controlar el envío.

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSubmitting) return; // Evitar que el submit se ejecute más de una vez
        setIsSubmitting(true); // Desactivar el botón para evitar múltiples envíos

        insertarUsuario(usuario)
            .then(() => {
                //alert('Usuario insertado correctamente Frontend'); // Muestra el mensaje solo una vez
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Usuario Insertado Correctamente!',
                });
                volver(); // Regresa a la lista de usuarios
            })
            .catch((error) => {
                console.error('Error al insertar usuario:', error);
                alert('Error al insertar usuario');
            })
            .finally(() => {
                setIsSubmitting(false); // Vuelve a activar el botón
            });
    };

    return (
        <div>
            <h2>Insertar Usuario</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Usuario:</label>
                    <input
                        type="text"
                        name="usuario_nom"
                        value={usuario.usuario_nom}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="nombre_usuario"
                        value={usuario.nombre_usuario}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Apellido:</label>
                    <input
                        type="text"
                        name="apellido_usuario"
                        value={usuario.apellido_usuario}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        name="contrasenia"
                        value={usuario.contrasenia}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Rol:</label>
                    <input
                        type="number"
                        name="id_rol"
                        value={usuario.id_rol}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success" disabled={isSubmitting}>
                    Guardar
                </button>
                <button type="button" className="btn btn-secondary ms-2" onClick={volver}>
                    Cancelar
                </button>
            </form>
        </div>
    );
};

export default InsertarUsuario;
