import React, { useState, useEffect } from 'react'; //importamos los hooks de react

//Creamos la principal funcion y utilzamos los props enviados por Proveerores.js
const FormularioDeEdicionDeProveedor = ({id_prov, proveedor, handleCancelar, enviarDatosActualizados}) => {
	//Establecemos un estado inicial para el formulario
	const [proveedorForm, setproveedorForm] = useState ({
		id_prov: '',
		nombre_prov: '',
		ruc_prov: '',
		celular_prov: '',
		direccion_prov: ''
		//Falta definir atros valores de los registros.
	});

	//Usamos useEffect para llenar el formulario con los datos de proveedor pasado como prop desde Proveedores.js
	useEffect(() => {
		if(proveedor){
			console.log("Datos recibidos en el formulario", proveedor);// Verifica que los datos se pasen correctamente
			setproveedorForm({
				id_prov: proveedor.id_prov || '',
				nombre_prov: proveedor.nombre_prov || '',
				ruc_prov: proveedor.ruc_prov || '',
				celular_prov: proveedor.celular_prov || '',
				direccion_prov: proveedor.direccion_prov || ''//Verificar que cada campo sea correcto.

			});
		}
	}, [proveedor]);//Este efecto se ejecuta cada vez que el proveedor cambia.



	// Función para manejar el cambio de los campos del formulario cuando escribes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setproveedorForm({
            ...proveedorForm,
            [name]: value
        });
    };



	// Función que se ejecuta al hacer clic en "Guardar"
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos actualizados listos para enviar:", proveedorForm);
        // Llamamos al componente padre para enviar los datos actualizados
        enviarDatosActualizados(proveedorForm); // Aquí se envían los datos al componente padre

    };


	//Retornamos el foromulario con los datos obtenidos del Proveedor creados con useEffect.
	return (
		<div class="text-center">
		<h1>Editar Proveedor</h1>
			<form onSubmit={handleSubmit}>
	            <input
	                type="text"
	                className="form-control"
	                placeholder="Id del proveedor"
	                name="id_prov"
	                value={proveedorForm.id_prov} // Se obtiene del estado y antes tenemos que rellenar
	                onChange={handleChange}
	                readOnly
	            />
	            <br />
	            <input
	                type="text"
	                className="form-control"
	                placeholder="Nombre del proveedor"
	                name="nombre_prov"
	                maxlength={50}
	                value={proveedorForm.nombre_prov} // Se obtiene del estado y antes tenemos que rellenar
	                onChange={handleChange}
	            />
	            <br/>
	            <input
	            	type="text"
	            	className="form-control"
		            placeholder="Ruc del Proveedor"
		            name="ruc_prov"
		            maxlength={11}
		            value={proveedorForm.ruc_prov}// Se obtiene del estado y antes tenemos que rellenar
		            onChange={handleChange}		            
	            />
	            <br />
	            <input
	            	type="text"
	            	className="form-control"
		            placeholder="Celular del Proveedor"
		            maxlength={9}
		            name="celular_prov"
		            value={proveedorForm.celular_prov}// Se obtiene del estado y antes tenemos que rellenar
		            onChange={handleChange}
	            />
	            <br />
	            <input
	            	type="text"
	            	className="form-control"
		            placeholder="Dirección del Proveedor"
		            name="direccion_prov"
		            value={proveedorForm.direccion_prov}// Se obtiene del estado y antes tenemos que rellenar
		            onChange={handleChange}
	            />
	            <br />
	            <button type="submit" className="btn btn-success bi bi-floppy">Guardar</button>
	            <a> </a>
	            <button type="button" className="btn btn-danger bi bi-x-circle" onClick={handleCancelar}>Cancelar</button>
	        </form>
		</div>
	);
};

export default FormularioDeEdicionDeProveedor;