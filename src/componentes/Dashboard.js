import React, { useState } from 'react';
import { Link, Outlet, Navigate, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import GraficoDashboard from './GraficoDashboard';
import ProveedoresBarChart from './GraficoProveedores';

function Dashboard() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [showCards, setShowCards] = useState(true); // Estado para mostrar las cards o los registros

    if (!token) {
        return <Navigate to="/" />;
    }

    try {
        const decodedToken = jwtDecode(token);
        const { nombre_usuario, rol } = decodedToken;

        const handleLogout = () => {
            localStorage.removeItem('token');
            navigate('/');
        };

        const renderLinksByRole = () => {
            switch (rol) {
                case 'Administrador':
                    return (
                        <>
                            <li><Link className="dropdown-item" to="usuarios" onClick={() => setShowCards(false)}>Ver Usuarios</Link></li>
                            <li><Link className="dropdown-item" to="clientes" onClick={() => setShowCards(false)}>Ver Clientes</Link></li>
                            <li><Link className="dropdown-item" to="proveedores" onClick={() => setShowCards(false)}>Ver Proveedores</Link></li>
                        </>
                    );
                case 'Usuario':
                    return (
                        <>
                            <li><Link className="dropdown-item" to="clientes" onClick={() => setShowCards(false)}>Ver Clientes</Link></li>
                            <li><Link className="dropdown-item" to="proveedores" onClick={() => setShowCards(false)}>Ver Proveedores</Link></li>
                        </>
                    );
                case 'Registrador':
                    return (
                        <>
                            <li><Link className="dropdown-item" to="proveedores" onClick={() => setShowCards(false)}>Ver Proveedores</Link></li>
                        </>
                    );
                default:
                    return null;
            }
        };

        // Función para renderizar las cards según el rol
        const renderCardsByRole = () => {
            switch (rol) {
                case 'Administrador':
                    return (
                        <>
                            <div className="col-sm-6 mb-3 mb-sm-0">
                                <div className="card bg-secondary text-light">
                                    <div className="card-body">
                                        <h5 className="card-title">Usuarios</h5>
                                        <p className="card-text">Mostrar el total de usuarios.</p>
                                        <button className="btn btn-primary" onClick={() => { setShowCards(false); navigate('usuarios'); }}>Ver Usuarios</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="card bg-info text-light">
                                    <div className="card-body">
                                        <h5 className="card-title">Clientes</h5>
                                        <p className="card-text">Mostrar el total de clientes registrados.</p>
                                        <button className="btn btn-warning text-light" onClick={() => { setShowCards(false); navigate('clientes'); }}>Ver Clientes</button>
                                    </div>
                                </div>
                            </div>
                            <hr></hr>
                            <div className="col-sm-6 mb-3 mb-sm-0">
                                <div className="card bg-primary text-light">
                                    <div className="card-body">
                                        <h5 className="card-title">Proveedores</h5>
                                        <p className="card-text">Mostrar total de proveedores registrados.</p>
                                        <button className="btn btn-success" onClick={() => { setShowCards(false); navigate('proveedores'); }}>Ver Proveedores</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="card bg-warning">
                                    <div className="card-body">
                                        <h5 className="card-title">Información de la Empresa</h5>
                                        <p className="card-text">Mostrar contenido según corresponda.</p>
                                        <Link to="informacion" className="btn btn-secondary">Ver Contenido</Link>
                                    </div>
                                </div>
                            </div>
                        </>
                    );
                case 'Usuario':
                    return (
                        <>
                            <div className="col-sm-6 mb-3 mb-sm-0">
                                <div className="card bg-secondary text-light">
                                    <div className="card-body">
                                        <h5 className="card-title">Clientes</h5>
                                        <p className="card-text">Mostrar el total de clientes registrados.</p>
                                        <button className="btn btn-warning" onClick={() => { setShowCards(false); navigate('clientes'); }}>Ver Clientes</button>
                                    </div>
                                </div>
                            </div>
                            <hr></hr>
                            <div className="col-sm-6">
                                <div className="card bg-info text-light">
                                    <div className="card-body">
                                        <h5 className="card-title">Proveedores</h5>
                                        <p className="card-text">Mostrar total de proveedores registrados.</p>
                                        <button className="btn btn-success" onClick={() => { setShowCards(false); navigate('proveedores'); }}>Ver Proveedores</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    );
                case 'Registrador':
                    return (
                        <>
                            <div className="col-sm-6 mb-3 mb-sm-0">
                                <div className="card bg-primary text-light">
                                    <div className="card-body">
                                        <h5 className="card-title">Proveedores</h5>
                                        <p className="card-text">Mostrar total de proveedores registrados.</p>
                                        <button className="btn btn-success" onClick={() => { setShowCards(false); navigate('proveedores'); }}>Ver Proveedores</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    );
                default:
                    return null;
            }
        };

        const handleGoBack = () => {
            setShowCards(true); // Mostrar las cards nuevamente
            navigate('/dashboard'); // Regresar a la vista principal
        };

        return (
            <div>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Motos</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" to="#">Inicio</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Registros
                                    </Link>
                                    <ul className="dropdown-menu">
                                        {renderLinksByRole()}
                                    </ul>
                                </li>
                            </ul>
                            <form className="d-flex" role="search">
                                <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Buscar"></input>
                                <button className="btn btn-outline-success" type="submit">Buscar</button>
                            </form>
                        </div>
                    </div>
                </nav>

                <ul className="bg-secondary text-light text-end">
                    <p><strong>Usuario: </strong>{nombre_usuario || 'Usuario'} | <strong>Rol: </strong>{rol}</p>
                </ul>

                {/* Mostrar gráfico en el dashboard */}
                <div className="row">
                    {showCards ? (
                        <>
                            <div class="container text-center">
                              <div class="row">
                                <div class="col-md-6">
                                  <GraficoDashboard /> {/* Aquí se agrega el gráfico */}
                                </div>
                                <div class="col-md-6">
                                  <ProveedoresBarChart /> {/* Aquí se agrega el gráfico */}
                                </div>
                              </div>
                            </div>
                     
                            {renderCardsByRole()}
                        </>
                    ) : (
                        <div className="text-end">
                            <button className="btn btn-secondary" onClick={handleGoBack}>Volver</button>
                            <Outlet />
                        </div>
                    )}
                </div>
                <br></br>
                <div className="text-end">
                    <button className="btn btn-danger" onClick={handleLogout}><i class="bi bi-box-arrow-left"></i> Cerrar Sesión</button>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Error al decodificar el token:', error);
        return <Navigate to="/" />;
    }
}

export default Dashboard;
