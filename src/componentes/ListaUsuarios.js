//Listamos los usuarios en una tabla y gestiona el rol de usuarios para determinadas acciones dependiendo del rol
import React from 'react';

const ListaUsuarios = ({ 
    //recibe las siguientes propiedades (props)
    usuarios,//Aqui esta almacenado todos los usuarios obtenidos del backend: 
    rol, 
    handleEdit, 
    eliminarUsuario, 
    navigate, 
    mostrarFormInsertarUsuario, 
    setMostrarFormulario 
}) => {
    return (
        <div>
            <h2 class="text-center">Lista de Usuarios</h2>
            {rol === 'Administrador' && (
                <button
                    className="btn btn-success mb-3"
                    onClick={() => mostrarFormInsertarUsuario(setMostrarFormulario)}  // Usamos la función importada
                >
                    Nuevo Usuario
                </button>
            )}
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Usuario</th>
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th>Rol</th>
                        {rol === 'Administrador' && <th>Acciones</th>}
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id_usuario}>
                            <td>{usuario.id_usuario}</td>
                            <td>{usuario.usuario}</td>
                            <td>{usuario.nombre_usuario}</td>
                            <td>{usuario.apellido_usuario}</td>
                            <td>{usuario.id_rol}</td>
                            {rol === 'Administrador' && (
                                <td>
                                    <button class="bg-success text-light"
                                        onClick={() => handleEdit(usuario.id_usuario, navigate)} // Usamos la función importada
                                    ><i class="bi bi-pencil-fill"></i>
                                    </button>
                                    <button class="bg-danger text-light"
                                        onClick={() => eliminarUsuario(usuario.id_usuario)} // Pasamos setUsuarios
                                    ><i class="bi bi-trash-fill"></i>
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListaUsuarios;
