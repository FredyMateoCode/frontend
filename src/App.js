//Importamos los componentes y dependencia:
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; //Componente para el enrutamiento.
import Dashboard from './componentes/Dashboard';
import Usuarios from './componentes/Usuarios';
import Clientes from './componentes/Clientes';
import Proveedores from './componentes/Proveedores';
import Login from './componentes/Login';
import RutaProtegida from './componentes/RutaProtegida'; // Importa el componente
import EditarUsuario from './componentes/EditarUsuario'; // Importa EditarUsuario
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
    return (
        //Proporciona funcionalidades para el enrutamiento. y luego se Define el conjunto de rutas:
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />//Ruta inicial para usuarios no autenticados:
                <Route path="dashboard" element={<Dashboard />}>//Ruta inicial para usuarios autenticados:
                    <Route//Definición de rutas hijas estaran disponibles solo para UA y dependiendo del rol
                        //Si el usuario tiene el rol adecuado, se renderiza el componente
                        path="usuarios"
                        //Recibe un prop allowedRoles que especifica qué roles pueden acceder a esta ruta.
                        element={
                            <RutaProtegida allowedRoles={['Administrador']}>
                                <Usuarios />
                            </RutaProtegida>
                        }
                    />
                    <Route
                        path="usuarios/editar/:id"
                        element={
                            <RutaProtegida allowedRoles={['Administrador']}>
                                <EditarUsuario />
                            </RutaProtegida>
                        }
                    />
                    <Route
                        path="clientes"
                        element={
                            <RutaProtegida allowedRoles={['Administrador', 'Usuario']}>
                                <Clientes />
                            </RutaProtegida>
                        }
                    />
                    <Route
                        path="proveedores"
                        element={
                            <RutaProtegida allowedRoles={['Administrador', 'Usuario', 'Registrador']}>
                                <Proveedores />
                            </RutaProtegida>
                        }
                    />
                />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
