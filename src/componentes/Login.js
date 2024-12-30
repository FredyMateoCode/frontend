import React from 'react';
import LoginUse from './LoginUse';
import LoginForm from './LoginForm';

function Login() {
    const { username, password, setUsername, setPassword, handleSubmit } = LoginUse();

    return (
        <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            onSubmit={handleSubmit}
        />
    );
}

export default Login;
