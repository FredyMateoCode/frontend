import React from 'react';
import { Link } from 'react-router-dom';
import '../Estilos/Sidebar.css'; // Asegúrate de importar los estilos

function Sidebar() {
    return (
        <div className="sidebar">
            <h3>Menú</h3>
            <ul>
                <li>
                    <Link to="/dashboard/usuarios">Usuarios</Link>
                </li>
                <li>
                    <Link to="/dashboard/clientes">Clientes</Link>
                </li>
                <li>
                    <Link to="/dashboard/proveedores">Proveedores</Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
