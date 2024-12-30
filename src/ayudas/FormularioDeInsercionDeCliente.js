import React, { useState } from 'react';
import Swal from 'sweetalert2';
const FormularioDeInsercionDeCliente = ({ handleVolver, onInsercionExitosa }) => {
    const [nuevoCliente, setNuevoCliente] = useState({
        nombres: '',
        apellidos: '',
        dni: '',
        celular: '',
        direccion: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevoCliente({
            ...nuevoCliente,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://192.168.1.6:4000/api/insertar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevoCliente),
            });
            if (response.ok) {
                Swal.fire({
                        title: '¡Éxito!',
                        text: 'Cliente Registado Correctamente',
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                onInsercionExitosa(); // Notifica al componente padre
            } else {
                Swal.fire({
                        title: '¡Error!',
                        text: 'Error al insertar Cliente',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    });
            }
        } catch (error) {
            console.error('Error al insertar cliente:', error);
        }
    };

    return (
        <div className="container-responsive">
            <div className="text-center">
                <form onSubmit={handleSubmit}>
                    <h2>Nuevo Cliente</h2>
                    <input
                        className="form-control"
                        type="text"
                        name="nombres"
                        placeholder="Nombres"
                        value={nuevoCliente.nombres}
                        onChange={handleChange}
                        required
                    />
                    <br></br>
                    <input
                        className="form-control"
                        type="text"
                        name="apellidos"
                        placeholder="Apellidos"
                        value={nuevoCliente.apellidos}
                        onChange={handleChange}
                        required
                    />
                    <br></br>
                    <input
                        className="form-control"
                        type="text"
                        name="dni"
                        placeholder="DNI"
                        value={nuevoCliente.dni}
                        onChange={handleChange}
                        required
                    />
                    <br></br>
                    <input
                        className="form-control"
                        type="text"
                        name="celular"
                        placeholder="Celular"
                        value={nuevoCliente.celular}
                        onChange={handleChange}
                        required
                    />
                    <br></br>
                    <input
                        className="form-control"
                        type="text"
                        name="direccion"
                        placeholder="Dirección"
                        value={nuevoCliente.direccion}
                        onChange={handleChange}
                        required
                    />
                    <br></br>
                    <button type="submit" className="btn btn-success">Guardar</button>
                    <a>   </a>
                    <button type="button" className="btn btn-danger" onClick={handleVolver}>
                        Cancelar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FormularioDeInsercionDeCliente;
