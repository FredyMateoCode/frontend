// ayudas/formularioDeEdicionDeUsuarioAyuda.js
import React from 'react';
import Swal from 'sweetalert2';

const FormularioDeEdicionDeUsuario = ({ usuario, onChange, onSubmit }) => {
    
    // Nueva función para manejar el envío con validación
    const handleFormSubmit = (e) => {
        e.preventDefault(); // Detiene el envío del formulario por defecto

        // Validar si el campo de contraseña está vacío
        if (!usuario.contrasenia || usuario.contrasenia.trim() === '') {
            Swal.fire({
                icon: 'error',
                title: 'Campo vacío',
                text: 'El campo de contraseña no puede estar vacío',
            });
            return; // No llama a onSubmit si la validación falla
        }

        // Si todo está bien, llamar a la función onSubmit del padre
        onSubmit(e);
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
                <label>Nombre de Usuario:</label>
                <input
                    type="text"
                    name="usuario"
                    value={usuario.usuario}
                    onChange={onChange}
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
                    onChange={onChange}
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
                    onChange={onChange}
                    className="form-control"
                    required
                />
            </div>
            <div className="mb-3">
                <label>Contraseña:</label>
                <input
                    type="password"
                    name="contrasenia"
                    placeholder="Ingrese Contraseña Actual o Una Nueva Contraseña"
                    value={usuario.contrasenia}
                    onChange={onChange}
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label>Rol:</label>
                <input
                    type="text"
                    name="id_rol"
                    value={usuario.id_rol}
                    onChange={onChange}
                    className="form-control"
                />
            </div>
            <button type="submit" className="btn btn-success">
                Guardar
            </button>
        </form>
    );
};

export default FormularioDeEdicionDeUsuario;

