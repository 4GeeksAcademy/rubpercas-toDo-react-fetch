import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faFloppyDisk, faCircleXmark, faUser, faCircleCheck, faBan, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Login from './Login';


const ToDoList = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [handleInputUser, setHandleInputUser] = useState("");
  const [listTask, setListTask] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [inputChangeValue, setInputChangeValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const loginUser = localStorage.getItem("username");

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('username');
  };

  const createUserName = async () => {
    if (!handleInputUser) {
      swal({
        title: "Ingrese un nombre de usuario",
        icon: "warning",
        button: "Aceptar",
        timer: "3000",
      });
      return;
    }
    try {
      const response = await fetch(`https://playground.4geeks.com/todo/users/${handleInputUser}`, {
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
        setHandleInputUser("");
        console.log(result);
      }

    } catch (error) {
      console.log(error);
    }
  };

  const getListToDos = async () => {
    if (!isLoggedIn) return;
    try {
      const response = await fetch(`https://playground.4geeks.com/todo/users/rubpercas`);
      const result = await response.json()
      setListTask(result.todos)
    } catch (error) {
      console.log(error);
    }
  };

  const saveTask = async () => {
    try {
      const taskToSent = {
        "label": inputValue,
        "is_done": false
      }
      const response = await fetch(`https://playground.4geeks.com/todo/todos/rubpercas`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(taskToSent)
      })

      if (!response.ok) {
        swal({
          title: "Tarea creada",
          icon: "success",
          button: "Aceptar",
          timer: "3000"
        });
      }

      const result = await response.json();
      setListTask(prevListTaks => [...prevListTaks, result])
      setInputValue("")
    } catch (error) {
      console.log(error)
    }
  }

  const deleteTask = async (id) => {
    try {
      await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
        }
      })

      swal({
        title: "Tarea borrada con exito",
        icon: "success",
        button: "Aceptar"
      });

      setListTask((prevListTask) => prevListTask.filter((task) => task.id !== id));
    } catch (error) {
      console.log(error);

    }
  }

  const editTodo = async (id) => {
    try {
      const body = {
        "label": inputChangeValue,
        "is_done": true
      }

      const response = await fetch(`https://playground.4geeks.com/todo/todos/rubpercas`, {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      })

      if (!response.ok) {
        swal({
          title: "No se pudo actualizar la lista de tareas",
          icon: "warning",
          button: "Aceptar",
          timer: "3000"
        });
      }

      swal({
        title: "Lista actualizada",
        icon: "success",
        button: "Aceptar",
        timer: "3000"
      });

      setListTask(prevListTask =>
        prevListTask.map(task =>
          task.id === id ? { ...task, label: inputChangeValue } : task
        )
      );

      setInputChangeValue("");

    } catch (error) {
      console.log(error)
    }
  }

  const deleteListTask = () => {
    setListTask([])
  }

  useEffect(() => {   
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setHandleInputUser(storedUser);
      setIsLoggedIn(true);
    }
  }, []); 

  useEffect(() => {
    if (isLoggedIn) {
      getListToDos(); 
    }
  }, [isLoggedIn]); 


  return (
    <div className="w-100">
      {isLoggedIn ? (
        <>
          <nav className="navbar navbar-dark bg-black">
            <div className="container-fluid">
              <a className="navbar-brand">TO DO LIST</a>
              <div className="d-flex">
                <label>Do you want to create a new User?</label>
                <input
                  value={handleInputUser}
                  onChange={(event) => setHandleInputUser(event.target.value)}
                  style={{ marginRight: "10px" }}
                  placeholder="Usuario"
                />
                <button
                  title="Create new user"
                  onClick={createUserName}
                  className="component-button"
                ><FontAwesomeIcon icon={faUser} style={{ color: "#ffffff", }} />
                </button>
                <button
                  title="Logout"
                  onClick={handleLogout}
                  className="component-button"
                ><FontAwesomeIcon icon={faRightFromBracket} style={{ color: "#ffffff", }} />
                </button>
              </div>
            </div>
          </nav>
          <div className="container">
            <div className="title-component">
              <h1 className="text-center">Welcome {loginUser}!</h1>
              <div className="tasks-counter">
                <p>{listTask.length === 0
                  ? 'Congrats! Enjoy your free time!'
                  : `You have ${listTask.length} task(s) left`
                }</p>
              </div>
            </div>
            <input
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              style={{ marginRight: "10px" }}
              placeholder="Add new task..."
            />
            <button
              title="Save task"
              className="component-button"
              onClick={saveTask}
            ><FontAwesomeIcon icon={faFloppyDisk} style={{ color: "#ffffff", }} />
            </button>

            <input
              type="text"
              value={inputChangeValue}
              onChange={(event) => setInputChangeValue(event.target.value)}
              style={{ marginRight: "10px", display: isEditing ? 'block' : 'none' }}
              placeholder="Modificar tarea"
            />

            <ul className="mt-3 todo-list">
              {listTask.length > 0 ? (
                listTask.map(task => (
                  <li key={task.id} className="todo-item">{task.label}
                    <div className="button-group">
                      <button
                        title="Edit task"
                        className="component-button"
                        onClick={() => setIsEditing(true)}
                        style={{ display: isEditing ? 'none' : 'block' }}
                      ><FontAwesomeIcon icon={faPenToSquare} style={{ color: "#ffffff", }} />
                      </button>

                      <button
                        title="Accept edit"
                        className="component-button"
                        onClick={() => {
                          editTodo(task.id);
                          setIsEditing(false);
                        }}
                        style={{ display: isEditing ? 'block' : 'none' }}
                      ><FontAwesomeIcon icon={faCircleCheck} style={{ color: "#ffffff", }} />
                      </button>

                      <button
                        title="Cancel edit"
                        className="component-button"
                        onClick={() => setIsEditing(false)}
                        style={{ display: isEditing ? 'block' : 'none' }}
                      ><FontAwesomeIcon icon={faBan} style={{ color: "#ffffff", }} />
                      </button>

                      <button
                        title="Delete task"
                        className="component-button"
                        onClick={() => deleteTask(task.id)}
                        style={{ display: isEditing ? 'none' : 'block' }}
                      ><FontAwesomeIcon icon={faTrash} style={{ color: "#ffffff", }} />
                      </button>

                    </div>
                  </li>
                ))
              ) : (
                <h1 className="mt-5">NO HAY MAS TAREAS</h1>
              )}
            </ul>
            <div className="flex text-center">
              <button
                title="Reset task list"
                className="custom-button"
                onClick={deleteListTask}
              ><FontAwesomeIcon icon={faCircleXmark} style={{ color: "#ff0000", }} />
              </button>
            </div>
          </div>
        </>
      ) : (
        <Login />
      )}
    </div>

  )
}

  export default ToDoList;

//Como hago lo del nombre de usuario para que se registre y entre automaticamente?