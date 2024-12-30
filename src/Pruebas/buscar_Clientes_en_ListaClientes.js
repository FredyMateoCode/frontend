import React, { useState } from 'react';

const ListaClientes = ({ clientes, handleEditar, handleEliminar }) => {
    const [terminoBusqueda, setTerminoBusqueda] = useState(''); // Estado para almacenar el término de búsqueda
    const [clientesFiltrados, setClientesFiltrados] = useState(clientes); // Estado para almacenar los clientes filtrados

    // Función que maneja el cambio en el input de búsqueda
    const manejarBusqueda = (e) => {
        const valorBusqueda = e.target.value;
        setTerminoBusqueda(valorBusqueda);

        // Filtrar los clientes que coincidan con el término de búsqueda en tiempo real
        const clientesFiltrados = clientes.filter(cliente => 
            cliente.nombres_clie.toLowerCase().includes(valorBusqueda.toLowerCase()) ||
            cliente.apellidos_clie.toLowerCase().includes(valorBusqueda.toLowerCase()) ||
            cliente.dni_clie.includes(valorBusqueda) // Puedes agregar más campos si lo necesitas
        );

        setClientesFiltrados(clientesFiltrados);
    };

    return (
        <div className="table-responsive">
            <h2 className="text-center">Lista de Clientes</h2>

            {/* Input de búsqueda */}
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar por nombre, apellido o DNI"
                    value={terminoBusqueda}
                    onChange={manejarBusqueda} // Llamada a la función para filtrar en tiempo real
                />
            </div>

            <table className="table table-striped">
                <thead className="text-center">
                    <tr>
                        <th>Id</th>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>DNI</th>
                        <th>Celular</th>
                        <th>Dirección</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {clientesFiltrados.length === 0 ? (
                        <tr>
                            <td colSpan="7">No se encontraron clientes</td>
                        </tr>
                    ) : (
                        clientesFiltrados.map(cliente => (
                            <tr key={cliente.id_clie}>
                                <td><b>{cliente.id_clie}</b></td>
                                <td>{cliente.nombres_clie}</td>
                                <td>{cliente.apellidos_clie}</td>
                                <td>{cliente.dni_clie}</td>
                                <td>{cliente.celular_clie}</td>
                                <td>{cliente.direccion_clie}</td>
                                <td>
                                    <button
                                        className="btn btn-success bi bi-pencil-fill"
                                        onClick={() => handleEditar(cliente.id_clie)}
                                    />
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger bi bi-trash"
                                        onClick={() => handleEliminar(cliente)}
                                    />
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ListaClientes;
