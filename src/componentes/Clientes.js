import React, { useEffect, useState } from 'react'; // Hooks para el manejo de estados.
import cargarClientes from '../servicios/cargarClientes'; // Función para cargar los clientes
import ListaClientes from './ListaClientes'; // Componente para presentar los clientes y los botones.
import FormularioDeEdicionDeCliente from '../ayudas/FormularioDeEdicionDeCliente'; // Formulario de edición de cliente
import obtenerClientePorId from '../servicios/obtenerClientePorId'; // Función para obtener un cliente por ID
import EnviarDatosAlBackend from '../servicios/EnviarDatosAlBackend'; // Importamos el componente que enviará los datos al backend
import FormularioDeInsercionDeCliente from '../ayudas/FormularioDeInsercionDeCliente'; //Importamos el formulario

import eliminarClienteServicio from '../servicios/eliminarClienteServicio';
import Swal from 'sweetalert2';


/*---DECLARACIÓN DE ESTADOS INICIALES---*/
//Declaracion de estados iniciales:
const Clientes = () => {
    const [clientes, setClientes] = useState([]); // Estado para cargar los clientes
    const [idSeleccionado, setIdSeleccionado] = useState(null); // Estado para el ID seleccionado
    const [mostrandoFormulario, setMostrandoFormulario] = useState(false); // Estado para alternar vistas
    const [clienteSeleccionado, setClienteSeleccionado] = useState(null); // Estado para almacenar los datos del cliente seleccionado
    const [datosActualizados, setDatosActualizados] = useState(null); // Para almacenar los datos actualizados
    const [mostrandoFormularioCliente, setMostrandoFormularioCliente] = useState(null); //Creamos el estado para mostrar u ocultar el formulario de INSERTAR CLIENTE



    /*---FUNCIONES INICIALES QUE CARGAN LOS DATOS DE LOS CLIENTES---*/

    // ► Usamos el hook useEffect para cargar los clientes desde la API
    useEffect(() => {
        const obtenerClientes = async () => {
            try {
                const data = await cargarClientes();
                setClientes(data); // Guarda los datos de los clientes en el estado
            } catch (error) {
                console.error('Error al cargar los clientes:', error);
            }
        };
        obtenerClientes();
    }, []);



    /*---FUNCIONES EXCLUSIVAS PARA EDITAR CLIENTE---*/

    // ► Función que se ejecuta al hacer click en el botón de editar
    const handleEditar = async (id_clie) => {
        console.log("ID del cliente seleccionado:", id_clie);
        setIdSeleccionado(id_clie); // Actualiza el estado con el ID seleccionado

        try {
            // Realizamos la petición para obtener el cliente por ID al backend
            const respuestadelbackend = await obtenerClientePorId(id_clie);//Aquí pasamos el id_clie a obtenerClientePorId
            console.log('Datos del cliente obtenidos:', respuestadelbackend);
            setClienteSeleccionado(respuestadelbackend); // Guarda los datos obtenidos
        } catch (error) {
            console.error('Error al obtener los datos del cliente:', error);
        }
        setMostrandoFormulario(true); // Cambiar a vista de formulario
    };

    // ► Función para RECIBIR los datos actualizados del CLIENTE desde el formulario
    const enviarDatosActualizados = (datosActualizados) => {
        console.log("Datos actualizados recibidos en el componente padre:", datosActualizados);
        //Pasamos los datos ractualizados al estado:
        setDatosActualizados(datosActualizados); // Guardamos los datos actualizados en el estado
        // Aquí puedes enviar los datos al backend o hacer otras acciones
    };

    // ► Función para cargar clientes desde el backend  despues de actualizar cliente?????
    const obtenerClientes = async () => {
        try {
            const data = await cargarClientes();
            setClientes(data);
        } catch (error) {
            console.error('Error al cargar los clientes:', error);
        }
    };

    // ► Cargar los clientes al inicio
    useEffect(() => {
        obtenerClientes();
    }, []);

    // ► Callback para actualizar clientes después de la confirmación
    const handleActualizacionExitosa = () => {
        obtenerClientes(); // Vuelve a cargar los clientes
        setDatosActualizados(null); // Limpia los datos actualizados
        setMostrandoFormulario(false); // Regresa a la vista de lista
        setMostrandoFormularioCliente(false);
    };



    /*---FUNCIONES EXCLUSIVAS PARA INSERTAR CLIENTE---*/

    // ► Creamos la funcion para cambiar el estado del FormularioCliente y mostrar el formulario.
    const handleNuevo = () => {
        setMostrandoFormularioCliente(true); // Limpia el ID seleccionado
    };

    // ► Función para manejar la inserción exitosa, se ejecutará despues de insertar CLIENTE.
    const handleInsercionExitosa = () => {
        // Aquí puedes actualizar la lista de clientes, por ejemplo:
        obtenerClientes(); // Recarga la lista de clientes
        console.log('Cliente insertado correctamente');
        // Si tienes una función para recargar la lista de clientes, la puedes llamar aquí
        setMostrandoFormularioCliente(false); // Regresa a la lista de clientes
    };


    /*--- FUNCIONES EXCLUSIVAS PARA ELIMINAR CLIENTE ---*/

    // ► 
    const handleEliminar = async (cliente) => {
    // Usamos SweetAlert2 para la confirmación
        const { isConfirmed } = await Swal.fire({
            title: `¿Estás seguro de que deseas eliminar a ${cliente.nombres_clie} ${cliente.apellidos_clie}?`,
            text: "Esta acción no se puede deshacer.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        });

        if (!isConfirmed) return;

        try {
            // Llamamos al servicio para eliminar el cliente
            const respuesta = await eliminarClienteServicio(cliente.id_clie);

            console.log(respuesta); // Imprime la respuesta para depuración

            // Verifica que la respuesta tenga el formato adecuado
            if (respuesta && respuesta.status === 200) {  
                // Usando SweetAlert2 para el mensaje de éxito
                Swal.fire({
                    title: '¡Éxito!',
                    text: 'Cliente eliminado con éxito',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });
                obtenerClientes(); // Actualiza la lista de clientes
            } else if (respuesta.status === 404) {
                // Si no se encontró el cliente
                Swal.fire({
                    title: 'Error',
                    text: 'Cliente no encontrado',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            } else {
                // Si hay algún otro error
                Swal.fire({
                    title: 'Error',
                    text: 'Hubo un problema al eliminar al cliente',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        } catch (error) {
            console.error('Error al eliminar el cliente:', error);
            Swal.fire({
                title: 'Error',
                text: 'Hubo un error al intentar eliminar el cliente',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };




    /*---FUNCIONES GENERALES---*/

    // Función que se ejecuta al hacer click en CANCELAR en el formulario
    const handleVolver = () => {
        setIdSeleccionado(null); // Limpia el ID seleccionado
        setMostrandoFormulario(false); // Cambiar a vista de tabla
    };



    /*---RETURN Y RENDERIZADO---*/
    // Renderizamos el componente ListaClientes o FormularioDeEdicionDeCliente dependiendo de la vista
    return (
        <div>
            {/* Botón para INSERTAR un nuevo cliente  y que desaparece al mostrar el formulario*/}
            <br></br>
            {!mostrandoFormularioCliente && (
                <button className="btn btn-primary mb-3" onClick={handleNuevo}>
                    Nuevo Cliente
                </button>
            )};

            {/* Renderizar lista de clientes o formulario dependiendo del estado */}
            {!mostrandoFormulario && !mostrandoFormularioCliente ? (
                <ListaClientes
                    clientes={clientes}
                    handleEditar={handleEditar}
                    handleEliminar={handleEliminar} /> // Muestra la lista de clientes           
            ) : mostrandoFormulario ? (
                //Pasamos los Props al formulario
                <FormularioDeEdicionDeCliente 
                    id_clie={idSeleccionado} 
                    cliente={clienteSeleccionado} 
                    handleVolver={handleVolver}
                    enviarDatosActualizados={enviarDatosActualizados} // Pasa la función al componente hijo
                /> // Muestra el formulario de edición
            ) : (
                <FormularioDeInsercionDeCliente
                    handleVolver={() => setMostrandoFormularioCliente(false)} // Volver a la lista
                    onInsercionExitosa={handleInsercionExitosa}
                />
            )}

            {/* Solo renderiza EnviarDatosAlBackend si hay datos actualizados */}
            {datosActualizados && (
                <EnviarDatosAlBackend
                    datos={datosActualizados}
                    onActualizacionExitosa={handleActualizacionExitosa} // Callback para actualizar lista
                />
            )}
        </div>
    );
};

export default Clientes;
