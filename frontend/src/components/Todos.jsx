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
    <div className="flex flex-wrap justify-evenly my-10">
      {todos.map((todo) => (
        <div className="flex flex-col bg-gray-200 hover:shadow-xl hover:shadow-violet-800 my-5 mx-4 p-4 rounded-lg border-2 border-solid" key={todo._id}>
          <p className="text-3xl text-center">{todo.title}</p>
          <hr className="my-2 border-t border-gray-500" />
          <h3 className="text-l">{todo.description}</h3>
          <button
            onClick={() => toggleComplete(todo._id)}
            className={`w-40 rounded-xl focus:outline-2 focus:outline-offset-2 text-center
          ${
            todo.completed
              ? "bg-green-500 hover:bg-green-600 focus:outline-green-500 active:bg-green-700"
              : "bg-red-500 hover:bg-red-600 focus:outline-red-500 active:bg-red-700"
          }
          p-2 mt-4`}>
            {todo.completed ? "Completed" : "Mark as Complete"}
          </button>
        </div>
      ))}
    </div>
  );
}
