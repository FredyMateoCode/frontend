//Presenta los datos en una tabla, despues de recibirlos desde Proveedores.js 
//Recibe los datos de Proveedores como un prop.
//Utilizamos useState para la paginación y la búsqueda.
import React, {useState} from 'react';

const ListaProveedores = ({proveedores, handleEditar, handleEliminar}) => {
    // ESTADOS iniciales para el buscador y la paginación
    const [terminoBusqueda, setTerminoBusqueda] = useState('');
    const [paginaActual, setPaginaActual] = useState(1);
    const itemsPorPagina = 5;

    // Filtrar PROVEEDORES según el término de búsqueda
    const proveedoresFiltrados = proveedores.filter((proveedores) =>
        proveedores.nombre_prov.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
        proveedores.ruc_prov.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
        proveedores.celular_prov.includes(terminoBusqueda)
    );

    // Cálculo de índices para PAGINACIÓN
    const indiceUltimoElemento = paginaActual * itemsPorPagina;
    const indicePrimerElemento = indiceUltimoElemento - itemsPorPagina;
    const datosPaginados = proveedoresFiltrados.slice(indicePrimerElemento, indiceUltimoElemento);

    // Calcular el total de páginas para PAGINACIÓN
    const totalPaginas = Math.ceil(proveedoresFiltrados.length / itemsPorPagina);

    // Manejadores de eventos
    const cambiarPagina = (nuevaPagina) => {
        if (nuevaPagina > 0 && nuevaPagina <= totalPaginas) {
            setPaginaActual(nuevaPagina);
        }
    };

    //Maneja la la Paginación
    const manejarCambioBusqueda = (e) => {
        setTerminoBusqueda(e.target.value);
        setPaginaActual(1); // Reiniciar a la primera página al buscar
    };




	return (
		<div class="table-responsive">
            <h2 class="text-center">Lista de Proveedores</h2>
            {/* Input de Buscador */}
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar por nombre, ruc o celular"
                    value={terminoBusqueda}
                    onChange={manejarCambioBusqueda}
                />
            </div>
            <table className="table table table-striped">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombres</th>
                        <th>RUC</th>
                        <th>Celular</th>
                        <th>Direccion</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {datosPaginados.map(proveedor => (
                        <tr key={proveedor.id_prov}>
                            <td>{proveedor.id_prov}</td>
                            <td>{proveedor.nombre_prov}</td>
                            <td>{proveedor.ruc_prov}</td>
                            <td>{proveedor.celular_prov}</td>
                            <td>{proveedor.direccion_prov}</td>
                            <td>
                                {/*Boton para llamar a la funcion "onEditar" con los datos del proveedor*/}
                                <button className="btn btn-success bi bi-pencil-fill" 
                                onClick={()=> handleEditar(proveedor.id_prov)}
                                >
                                </button>
                            </td>
                            <td>
                                {/*Boton para eliminar registros*/}
                                <button
                                    className="btn btn-danger bi bi-trash"
                                    onClick={() => handleEliminar(proveedor)}
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

export default ListaProveedores;