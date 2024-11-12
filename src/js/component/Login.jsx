import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRightToBracket } from '@fortawesome/free-solid-svg-icons';

function Login() {
    const [username, setUsername] = useState('');
    const [userList, setUserList] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('username', username);
        window.location.href = '/principal';
    };

    const getListUser = async () => {
        try {
            const response = await fetch("https://playground.4geeks.com/todo/users?offset=0&limit=100");
            const result = await response.json();
            const userNames = result.users.map(user => user.name);
            console.log(userNames);
            setUserList(userNames);
        } catch (error) {
            console.log(error);
        }
    };

    const createUserName = async () => {
        if (!username) {
            swal({
                title: "Ingrese un nombre de usuario",
                icon: "warning",
                button: "Aceptar",
                timer: "3000",
            });
            return;
        }
        try {
            const response = await fetch(`https://playground.4geeks.com/todo/users/${username}`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                }
            })

            if (!response.ok) {
                swal({
                    title: "Usuario existente.",
                    icon: "warning",
                    button: "Aceptar",
                    timer: "3000"
                });

            } else {
                swal({
                    title: "Usuario creado correctamente.",
                    icon: "success",
                    button: "Aceptar",
                    timer: "3000"
                });
                const result = await response.json();
                console.log(result);
            }

        } catch (error) {
            console.log(error);
        }
    };

    const userInUserList = () => {
        let count = 0;
        for (let i = 0; i < userList.length; i++) {
            if (userList[i] === username) {
                count++;
            }
        }
        if (count > 0) {
            swal({
                title: "Usuario encontrado",
                icon: "warning",
                button: "Aceptar",
                timer: "3000"
              });
      
        } else {
            swal({
                title: "Error y muerte",
                icon: "danger",
                button: "Aceptar",
                timer: "3000"
              });
            return;
        }
    };

    useEffect(() => {
        getListUser();
    }, []);

    return (
        <div className="mt-5 mb-2 pt-5">
        <h2 className="color-light text-center">Login / Create user</h2>
        <div className="login-container">
            <form onSubmit={handleSubmit}>

                <input
                    className="m-1 "
                    type="text"
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <button
                    title="Login"
                    className="component-button"
                    onClick={userInUserList}
                    type="submit"
                    ><FontAwesomeIcon icon={faRightToBracket} style={{ color: "#ffffff", }} />
                </button>
                <button
                    title="Create new user"
                    onClick={createUserName}
                    className="component-button"
                ><FontAwesomeIcon icon={faUser} style={{ color: "#ffffff", }} />
                </button>
            </form>
        </div>
        </div>
    );
}

export default Login;