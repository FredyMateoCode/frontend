//Este componente maneja el estado y la lógica de autenticación:
import { useState } from 'react';//Maneja el estado y guarda username y password
import { useNavigate } from 'react-router-dom';//Permite dirigir al usuario a una nueva ruta:
import Swal from 'sweetalert2';//Importamos la dependencia para mostrar los mensajes.

function LoginUse() {
    //Inicializamos los dos estados
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    //Se ejecuta cuando el formulario envia los datos:
    const handleSubmit = async (e) => {
        e.preventDefault();//Evita que la página se recague.
        console.log('Datos enviados:', { username, password });
    
        // Validación de campos vacíos
        if (!username || !password) {
            // Mostrar mensaje de advertencia si alguno de los campos está vacío
            Swal.fire({
                icon: 'warning',
                title: 'Campos Vacíos',
                text: 'Por favor, Ingrese tanto el usuario y la contraseña.',
            });
            return; // Detener la ejecución si los campos están vacíos
        }
        

        try {
            //Se realiza la solicitud HTTP al servidor mediante la ruta:
            const response = await fetch('http://192.168.1.6:4000/autenticarUsuarios/login', {
                method: 'POST',
                //Especifica el formato de datos
                headers: { 'Content-Type': 'application/json' },
                //Convierte los datos del formulario en formatos JSON y lo envía en el cuerpo de la solicitud:
                body: JSON.stringify({ username, password }),
            });
            //Una vez obtenida la respuesta se convierte en forma javascript:
            const data = await response.json();
            console.log('Respuesta del backend:', data);

            //Primero se verifica si la respuesta fue exitosa: y guarda el tocke en localStorage
            if (response.ok && data.token) {
                localStorage.setItem('token', data.token);
                navigate('/dashboard');
                // Mostrar mensaje de éxito con SweetAlert2
                Swal.fire({
                    icon: 'success',
                    title: 'Bienvenido',
                    text: 'Inicio de Sesión Exitosa!',
                });
            } else {
                //alert(data.mensaje || 'Error de autenticación');
                Swal.fire({
                    icon: 'error',
                    title: 'Error de autenticación',
                    text: data.mensaje || 'Usuario o contraseña incorrectos.',
                });
            }
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            //alert('Error en el servidor');
            // Mostrar mensaje de error con SweetAlert2 si ocurre un error en la solicitud
            Swal.fire({
                icon: 'error',
                title: 'Error de conexión',
                text: 'No se pudo conectar con el servidor.',
            });
        }
    };

    //La funcion LoginUse devuelve un objeto con los estados, el cual podrá ser utilizado en cualquier componente:
    return { username, password, setUsername, setPassword, handleSubmit };
}

export default LoginUse;
