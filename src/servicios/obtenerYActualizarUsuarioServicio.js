//SE ENCARGA DE INTERACTUAR CON EL BACKEND PARA OBTENER LOS DATOS DEL USUARIO Y ACTUALIZARLOS:
// servicios/obtenerYActualizarUsuarioServicio.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useObtenerYActualizarUsuario = (id) => {
    const [usuario, setUsuario] = useState({
        usuario:'',
        nombre_usuario: '',
        apellido_usuario: '',
        id_rol: '',
    });

    useEffect(() => {
        // Obtener los datos del usuario desde la API
        axios
            .get(`http://192.168.1.6:4000/api/mostrarUsuario/${id}`)
            .then((response) => {
                setUsuario(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener los datos del usuario:', error);
            });
    }, [id]);

    const actualizarUsuario = (usuario) => {
        return axios.put(`http://192.168.1.6:4000/api/actualizarUsuario/${id}`, usuario);
    };

    return { usuario, setUsuario, actualizarUsuario };
};

export default useObtenerYActualizarUsuario;
