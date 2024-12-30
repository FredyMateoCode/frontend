import React, { useState } from 'react';
import Swal from 'sweetalert2'
const FormularioDeInsercionDeProveedor = ({ handleCancelar, onInsercionExitosa }) => {
    const [nuevoProveedor, setNuevoProveedor] = useState({
        nombre: '',
        ruc: '',
        celular: '',
        direccion: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevoProveedor({
            ...nuevoProveedor,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://192.168.1.6:4000/api/insertar_proveedor', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevoProveedor),
            });
            if (response.ok) {
                Swal.fire({
                        title: '¡Éxito!',
                        text: 'Proveedor Registado Correctamente',
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                onInsercionExitosa(); // Notifica al componente padre
                
            } else {
                Swal.fire({
                        title: '¡Error!',
                        text: 'Error al insertar Proveedor',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    });
            }
        } catch (error) {
            console.error('Error al insertar Proveedor:', error);
        }
    };

    return (
        <div className="container-responsive">
            <div className="text-center">
                <form onSubmit={handleSubmit}>
                    <h2>Nuevo Proveedor</h2>
                    <input
                        className="form-control"
                        type="text"
                        name="nombre"
                        placeholder="Nombre"
                        value={nuevoProveedor.nombre}
                        onChange={handleChange}
                        required
                    />
                    <br></br>
                    <input
                        className="form-control"
                        type="text"
                        name="ruc"
                        placeholder="ruc"
                        value={nuevoProveedor.ruc}
                        onChange={handleChange}
                        required
                    />
                    <br></br>
                    <input
                        className="form-control"
                        type="text"
                        name="celular"
                        placeholder="celular"
                        value={nuevoProveedor.celular}
                        onChange={handleChange}
                        required
                    />
                    <br></br>
                    <input
                        className="form-control"
                        type="text"
                        name="direccion"
                        placeholder="Dirección"
                        value={nuevoProveedor.direccion}
                        onChange={handleChange}
                        required
                    />
                    <br></br>
                    <button type="submit" className="btn btn-success">Guardar</button>
                    <a>   </a>
                    <button type="button" className="btn btn-danger" onClick={handleCancelar}>
                        Cancelar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FormularioDeInsercionDeProveedor;
