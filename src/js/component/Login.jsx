import React, { useState } from 'react';

function Login() {
    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
            localStorage.setItem('username', username);
            window.location.href = '/principal';
    };

    return (
        <div className="login-container">
            <h2 className="color-light">Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre de usuario:
                    <input
                        className="m-1"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>

                <button 
                className="component-button"
                type="submit">Iniciar sesión</button>
            </form>
        </div>
    );
}

export default Login;