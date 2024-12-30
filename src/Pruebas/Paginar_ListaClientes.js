import React, { useState } from 'react';

const ListaClientes = ({ clientes, handleEditar, handleEliminar }) => {
    // Estados para el buscador y la paginación
    const [terminoBusqueda, setTerminoBusqueda] = useState('');
    const [paginaActual, setPaginaActual] = useState(1);
    const itemsPorPagina = 5;

    // Filtrar clientes según el término de búsqueda
    const clientesFiltrados = clientes.filter((cliente) =>
        cliente.nombres_clie.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
        cliente.apellidos_clie.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
        cliente.dni_clie.includes(terminoBusqueda)
    );

    // Cálculo de índices para paginación
    const indiceUltimoElemento = paginaActual * itemsPorPagina;
    const indicePrimerElemento = indiceUltimoElemento - itemsPorPagina;
    const datosPaginados = clientesFiltrados.slice(indicePrimerElemento, indiceUltimoElemento);

    // Calcular el total de páginas
    const totalPaginas = Math.ceil(clientesFiltrados.length / itemsPorPagina);

    // Manejadores de eventos
    const cambiarPagina = (nuevaPagina) => {
        if (nuevaPagina > 0 && nuevaPagina <= totalPaginas) {
            setPaginaActual(nuevaPagina);
        }
    };

    const manejarCambioBusqueda = (e) => {
        setTerminoBusqueda(e.target.value);
        setPaginaActual(1); // Reiniciar a la primera página al buscar
    };

    return (
        <div className="table-responsive">
            <h2 className="text-center">Lista de Clientes</h2>
            {/* Buscador */}
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar por nombre, apellido o DNI"
                    value={terminoBusqueda}
                    onChange={manejarCambioBusqueda}
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
                    {datosPaginados.map((cliente) => (
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
                                >
                                </button>
                            </td>
                            <td>
                                <button
                                    className="btn btn-danger bi bi-trash"
                                    onClick={() => handleEliminar(cliente)}
                                >
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Controles de paginación */}
            <div className="d-flex justify-content-center mt-3">
                <button
                    className="btn btn-primary mx-1"
                    onClick={() => cambiarPagina(paginaActual - 1)}
                    disabled={paginaActual === 1}
                >
                    Anterior
                </button>
                {[...Array(totalPaginas).keys()].map((numero) => (
                    <button
                        key={numero}
                        className={`btn mx-1 ${paginaActual === numero + 1 ? 'btn-secondary' : 'btn-outline-secondary'}`}
                        onClick={() => cambiarPagina(numero + 1)}
                    >
                        {numero + 1}
                    </button>
                ))}
                <button
                    className="btn btn-primary mx-1"
                    onClick={() => cambiarPagina(paginaActual + 1)}
                    disabled={paginaActual === totalPaginas}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default ListaClientes;