import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCheck, faCaretUp, faCaretDown, faPlus } from '@fortawesome/free-solid-svg-icons';
// import User from "./User";



const ToDoList = () => {
  const [handleInputUser, setHandleInputUser] = useState("");
  const [listTask, setListTask] = useState([]);

  const createUserName = async () => {

    try {
      const response = await fetch(`https://playground.4geeks.com/todo/users/rubpercas`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
        }
      })

      if (!response.ok) {
        alert("Usuario existente");
      } else {
        alert("Usuario creado correctamente.")
        const result = await response.json();
        console.log(result);
      }

    } catch (error) {
      console.log(error);
    }
  };

  const getListToDos = async () => {
    try {
      const response = await fetch(`https://playground.4geeks.com/todo/users/rubpercas`);
      const result = await response.json()
      setListTask(result.todos)
      console.log(listTask);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getListToDos();
  }, [])

  return (
    <div className="container">
      <h1>PRUEBA</h1>
      <input
        value={handleInputUser}
        onChange={(event) => setHandleInputUser(event.target.value)}
        style={{ marginRight: "10px" }}
        placeholder="Usuario"
      />
      <button onClick={createUserName}
      >Guardar usuario
      </button>

      <ul>
        {listTask.map(task => (
          <div key={task.id}>
            <li>{task.label}</li>
            <button
              onClick={() => editTodo(task.id)}
            >Editar</button>
          </div>
        ))}
      </ul>

    </div>
  )
}

export default ToDoList;

