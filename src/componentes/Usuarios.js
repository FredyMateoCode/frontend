//FUNCION QUE MUESTRA LOS USUARIOS
//IMPORTAMOS LIBRERIAS Y COMPONENTES HIJOS
import React, { useEffect, useState } from 'react';//Importamos React y algunas funcionalidades.
import axios from 'axios';// Importamos para facilitar solicitudes HTTP como PUT, GET, POST, DELETE.
import { jwtDecode } from 'jwt-decode'; //Libreria descifrar el tocken.
import { useNavigate } from 'react-router-dom'; //Libreria Para navegar entre rutas
import  decodificarToken   from '../ayudas/decodificarToken'; // Componente
import cargarUsuarios from '../servicios/cargarUsuarios'; // Componente Importa la función desde servicios.
import ListaUsuarios from './ListaUsuarios'; // Componente
import InsertarUsuario from './InsertarUsuario'; //Componente para insertar usuario(formulario).
import { insertarUsuario } from '../servicios/insertarUsuarioServicio'; // Componente
import { mostrarFormInsertarUsuario } from '../ayudas/mostrarFormInsertarUsuario';//Componente
import { handleEdit } from '../ayudas/navegacion'; //Componente
import eliminarUsuario from '../servicios/eliminarUsuarioServicio'; // Componente

//Definimos el componente:
const Usuarios = () => {
    //Estado que almacena la lista de usuarios obtenida del backend.
    const [usuarios, setUsuarios] = useState([]);
    //Estado que guarda el rol del usuario actual (por ejemplo, "Administrador").
    const [rol, setRol] = useState('');
    //Estado que controla si se muestra el formulario o la lista de usuarios.
    const [mostrarFormulario, setMostrarFormulario] = useState(false); // Estado para alternar vistas
    //Creamos una instancia de navegación para redirigir al usuario.
    const navigate = useNavigate();


    //Llama a la función cargar los usuarios desde servicios:
    useEffect(() => {
         const rolUsuario = decodificarToken();
    if (rolUsuario) {
        setRol(rolUsuario);
    }
        cargarUsuarios()
            .then((data) => setUsuarios(data))
            .catch((error) => console.error(error));
    }, []);

    //Función para ocultar formulario y mostrar los usuarios:
    const handleVolver = () => {
        setMostrarFormulario(false); // Vuelve a la lista de usuarios
        cargarUsuarios() // Recarga la lista de usuarios después de la inserción
            .then((data) => setUsuarios(data))
            .catch((error) => console.error(error));
    };

    //Alternancia de vistas: Mostrar usuarios y formulario de insertar usuario.
    return (
        <div>
            {!mostrarFormulario ? (
                <ListaUsuarios
                    usuarios={usuarios}
                    rol={rol}
                    handleEdit={handleEdit}
                    eliminarUsuario={(id) => eliminarUsuario(id, setUsuarios)}
                    navigate={navigate}
                    mostrarFormInsertarUsuario={mostrarFormInsertarUsuario}
                    setMostrarFormulario={setMostrarFormulario}
                />
            ) : (
                <InsertarUsuario volver={handleVolver} insertarUsuario={insertarUsuario} />
            )}
        </div>
    );
};

export default Usuarios;
