import React from "react";
import ToDoList from "./ToDoList";
import App from "./User";


const Home = () => {
	return (
		<div className="d-flex align-items-center justify-content-center">
			<ToDoList />
			<App />
		</div>
	);
};

export default Home;