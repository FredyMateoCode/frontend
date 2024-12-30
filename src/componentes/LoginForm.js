import React from 'react';
import '../Estilos/LoginForm.css';
//Definimos el componente con 5 props definidas en el componente Login.js:
//username: El valor del campo de entrada de usuario.
//password: El valor del campo de entrada de contraseña.
//setUsername: Una función para actualizar el estado del nombre de usuario.
//setPassword: Una función para actualizar el estado de la contraseña.
//onSubmit: Una función que se ejecuta cuando se envía el formulario.

//value={username}: Vincula el campo con el valor del estado username. Esto se conoce como componente controlado.
//onChange={(e) => setUsername(e.target.value)}: Cada vez que el usuario escribe, este evento actualiza el estado username llamando a setUsername con el nuevo valor.
function LoginForm({ username, password, setUsername, setPassword, onSubmit }) {
    return (
        <form onSubmit={onSubmit} className="login-form">
            <div>
                <h3>Iniciar Sesión</h3>
                <label htmlFor="username">Usuario:</label>
                <input
                    type="text"
                    id="username"
                    placeholder="Ingrese su Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Contraseña:</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Ingrese su Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit">Iniciar Sesión</button>
        </form>
    );
}

export default LoginForm;
