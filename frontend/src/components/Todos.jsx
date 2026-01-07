/* todos = [
title: "go to gym",
description: "go to gym,
}
*/

import axios from "axios";

export function Todos({ todos, onTodoUpdate }) {

  const API_URL = import.meta.env.PROD ? "" : "http://localhost:3000";
  const toggleComplete = async (id) => {
    try {
      await axios.put(`${API_URL}/completed`, { id });
      console.log("Todo status toggled!");
      // Refresh the todo list
      if (onTodoUpdate) onTodoUpdate();
    } catch (err) {
      console.error(err);
      console.log("Failed to toggle todo status");
    }
  };

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo._id}>
          <h1>{todo.title}</h1>
          <h3>{todo.description}</h3>
          <button onClick={() => toggleComplete(todo._id)} 
          style={{ background: todo.completed ? "green" : "red" }}>
            {todo.completed ? "Completed" : "Mark as Complete"}
          </button>
        </div>
      ))}
    </div>
  );
}