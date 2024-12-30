import React, { useState, useEffect } from 'react';//Importamos los hooks de react.

//Creamos la funcio principal y pasamos utilizamos los props enviados por Clientes.js
const FormularioDeEdicionDeCliente = ({ id_clie, cliente, handleVolver, enviarDatosActualizados}) => {
    // Establecemos un estado inicial para el formulario
    const [clienteForm, setClienteForm] = useState({
        id_clie: '', // inicializa el id_clie con un valor vacío
        nombres_clie: '',
        apellidos_clie: '',
        dni_clie: '',
        celular_clie: '',
        direccion_clie: '' // Asegúrate de incluir todos los campos aquí segun los datos obtenidos del backend
    });

    // Usamos useEffect para llenar el formulario con los datos del cliente cuando 'cliente' cambia
    useEffect(() => {
        if (cliente) {
            console.log("Datos recibidos en el formulario:", cliente); // Verifica que los datos se pasen correctamente
            setClienteForm({
                id_clie: cliente.id_clie || '', // Asegúrate de incluir el id_clie
                nombres_clie: cliente.nombres_clie || '',
                apellidos_clie: cliente.apellidos_clie || '',
                dni_clie: cliente.dni_clie || '',
                celular_clie: cliente.celular_clie || '',
                direccion_clie: cliente.direccion_clie || '' // Asegúrate de que cada campo sea correcto
            });
        }
    }, [cliente]); // Este efecto se ejecuta cada vez que 'cliente' cambia



    // Función para manejar el cambio de los campos del formulario cuando escribes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setClienteForm({
            ...clienteForm,
            [name]: value
        });
    };


    // Función que se ejecuta al hacer clic en "Guardar"
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos actualizados listos para enviar:", clienteForm);
        // Llamamos al componente padre para enviar los datos actualizados
        enviarDatosActualizados(clienteForm); // Aquí se envían los datos al componente padre

    };

    return (
        <div class="container text-center">
          <div class="row">
            <div class="col">
            </div>
            <div class="col-lg-8 sm-6 ">
              <h3>Editar Cliente</h3>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Id del cliente"
                                name="id_clie"
                                value={clienteForm.id_clie} // Se obtiene del estado
                                onChange={handleChange}
                                readOnly
                            />
                            <br />
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombres del cliente"
                                name="nombres_clie" // Asegúrate de que el name coincida con la propiedad del estado
                                value={clienteForm.nombres_clie} // Vincula el valor al estado
                                onChange={handleChange} // Asegúrate de que la función handleChange esté manejando la actualización
                            />
                            <br />
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Apellidos del cliente"
                                name="apellidos_clie"
                                value={clienteForm.apellidos_clie}
                                onChange={handleChange}
                            />
                            <br />
                            <input
                                type="text"
                                className="form-control"
                                placeholder="DNI del cliente"
                                name="dni_clie"
                                value={clienteForm.dni_clie}
                                onChange={handleChange}
                            />
                            <br />
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Celular del cliente"
                                name="celular_clie"
                                value={clienteForm.celular_clie}
                                onChange={handleChange}
                            />
                            <br />
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Dirección del cliente"
                                name="direccion_clie"
                                value={clienteForm.direccion_clie}
                                onChange={handleChange}
                            />
                            <br />
                            <button type="submit" className="btn btn-success bi bi-floppy">Guardar</button>
                            <a> </a>
                            <button type="button" className="btn btn-danger bi bi-x-circle" onClick={handleVolver}>Cancelar</button>
                        </form>
            </div>
            <div class="col">
            </div>
          </div>
        </div>








    
        
     
                        

       
    );
};

export default FormularioDeEdicionDeCliente;
