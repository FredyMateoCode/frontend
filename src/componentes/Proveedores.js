// src/componentes/Usuarios.js
import React, { useEffect, useState } from 'react';
import cargarProveedores from '../servicios/cargarProveedores'; //Servicio que obtenine los usuarios
import ListaProveedores from './ListaProveedores'//Se carga la presentacion de los registros.
import obtenerProveedorPorId from '../servicios/obtenerProveedorPorId';
import FormularioDeEdicionDeProveedor from '../ayudas/FormularioDeEdicionDeProveedor';
import EnviarDatosAlBackend from '../servicios/actualizarProveedorServicio';
import FormularioDeInsercionDeProveedor from '../ayudas/FormularioDeInsercionDeProveedor';//Importamos el formulario y asignamos un identificador.

import eliminarProveedorServicio from '../servicios/eliminarProveedorServicio';
import Swal from 'sweetalert2';



/*---DECLARACIÓN DE ESTADOS INICIALES---*/
const Proveedores = () => {
    //Declaración de estados iniciales:
    const [proveedores, setProveedores] = useState([]); //Estado para cargar los clientes.
    const [idSeleccionado, setIdSeleccionado] = useState(null); //Estado para capturar el Id del proveedor seleeccionado.
    const [mostrandoFormulario, setMostrandoFormulario] = useState(null);//Estado para mostrar el formulario.
    const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null);//Estado para guardar datos del proveedor seleccionado.
    const [datosActualizados, setDatosActualizados] = useState(null); // Para almacenar los datos actualizados
    const [mostrandoFormularioProveedor, setMostrandoFormularioProveedor] = useState(null); //Creamos el estado inicial para mostrar el formulario de insertar nuevo proveedor



    /*---FUNCIONES INICIALES QUE CARGAN LOS DATOS DE LOS PROVEEDORES---*/

    //► Utilizamo el hook de react para cargar los proveedores desde la API. al inicio
    useEffect(() => {
        const obtenerPoveedores = async () => {
            try {
                const data = await cargarProveedores(); //LLama a la API cargarProveedores.
                setProveedores(data); //Guarda los datos en el estado.
            }catch (error){
                console.error('Error al cargar los datos: ', error);
            }
        };
        obtenerPoveedores();
    }, []);



    /*---FUNCIONES EXCLUSIVAS PARA EDITAR---*/

    // ► Funcion que se ejecuta al hacer click en el boton de EDITAR(handleEdit):
    const handleEditar = async (id_prov) => {
        console.log("Se ha seleccionado el Id del proveedor:", id_prov);
        setIdSeleccionado(id_prov);//Actualiza el estado idSeleccionado con el id obtenido.

        try {
            //Realizamos la solicitud al backend para obtener los demas datos del proveedor a partir del id_prov.
            const respuestadelbackend = await obtenerProveedorPorId(id_prov);//Aqui pasamos el id a obtenerProveedorPorId.
            console.log('Datos Obtenidos del Proveedor: ', respuestadelbackend);
            setProveedorSeleccionado(respuestadelbackend); // Guarda los datos obtenidos
        }catch (error){
            console.log('Error al obtener los datos del Proveedor');
        }
        setMostrandoFormulario(true);//Mostramos el formulario cambiando el estado de null a true.
    };

    // ► Función para RECIBIR los datos ACTUALIZADO del PROVEEDOR desde el formulario
    const enviarDatosActualizados = (datosActualizados) => {
        console.log("Datos actualizados recibidos en el componente padre:", datosActualizados);//Mustra los datos Reciidos
        //Pasamos los datos ractualizados al estado:
        setDatosActualizados(datosActualizados); // Guardamos los datos actualizados en el estado
        // Aquí puedes enviar los datos al backend o hacer otras acciones
    };

    // ► Función para cargar proveedores desde el backend  despues de actualizar proveedor
    const obtenerProveedores = async () => {
        try {
            const data = await cargarProveedores();
            setProveedores(data);
        } catch (error) {
            console.error('Error al cargar los clientes:', error);
        }
    };

    // ► Cargar los clientes al inicio se utiliza para obtener los usuarios actualizados
    useEffect(() => {
        obtenerProveedores();
    }, []);

    // ► Callback para actualizar clientes después de la confirmación
    const handleActualizacionExitosa = () => {
        obtenerProveedores(); // Vuelve a cargar los clientes
        setDatosActualizados(null); // Limpia los datos actualizados
        setMostrandoFormulario(false); // Regresa a la vista de lista
        setMostrandoFormularioProveedor(false);
    };



    /*---FUNCIONES EXCLUSIVAS PARA INSERTAR PROVEEDOR---*/

    // ► Creamos la funcion para cambiar el estado del FormularioProveedor y mostrar el formulario de INSERTAR.
    const handleNuevo = () => {
        setMostrandoFormularioProveedor(true); // Limpia el ID seleccionado
    };

    // ► Función para manejar la inserción exitosa, se ejecutará despues de insertar CLIENTE.
    const handleInsercionExitosa = () => {
        // Aquí puedes actualizar la lista de clientes, por ejemplo:
        obtenerProveedores(); // Recarga la lista de clientes
        console.log('Cliente insertado correctamente');
        // Si tienes una función para recargar la lista de clientes, la puedes llamar aquí
        setMostrandoFormularioProveedor(false); // Regresa a la lista de clientes
    };




    /*--- FUNCIONES EXCLUSIVAS PARA ELIMINAR PROVEEDORES ---*/

    // ►
    const handleEliminar = async (proveedor) => {
        // Usamos SweetAlert2 para la confirmación
            const { isConfirmed } = await Swal.fire({
                title: `¿Estás seguro de que deseas eliminar a ${proveedor.nombre_prov} ${proveedor.ruc_prov}?`,
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
                const respuesta = await eliminarProveedorServicio(proveedor.id_prov);

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
                    obtenerProveedores(); // Actualiza la lista de clientes
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

    /*Función que se ejcuta al hacer click en CANCELAR dentro de LOS FORMULARIOS.
    ► Es pasado com un PROPS en la renderizacion.
    */
    const handleCancelar = () => {
        setIdSeleccionado(null);
        setMostrandoFormulario(false);
    };



    /*---RETURN Y RENDERIZADO---*/

    // ► Pasamos los prop y renderizamos los resultados obtenidos.
    return (
        <div>
            {/*Boton para mostrar nuevo proveedor, y que desaparce al mostrar el formulario*/}
            {!mostrandoFormularioProveedor && (
                <button className="btn btn-primary mb-3" onClick={handleNuevo}>
                    Nuevo Proveedor
                </button>
            )}

            {/* Renderizar lista de clientes o formulario dependiendo del estado */}
            {!mostrandoFormulario && !mostrandoFormularioProveedor ? (
                <ListaProveedores proveedores={proveedores}
                    handleEditar={handleEditar}
                    handleEliminar={handleEliminar}
                    />
            ) : mostrandoFormulario ? (
                //Pasamos los Props al formulario
                <FormularioDeEdicionDeProveedor
                    id_prov={idSeleccionado}
                    proveedor={proveedorSeleccionado}
                    handleCancelar={handleCancelar}
                    enviarDatosActualizados={enviarDatosActualizados} // Pasa la función al componente hijo
                />
            ) : (
                <FormularioDeInsercionDeProveedor
                handleCancelar={() => setMostrandoFormularioProveedor(false)}
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

export default Proveedores;