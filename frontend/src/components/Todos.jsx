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

  const deleteTodo = async (id) => {
  try {
    await axios.delete(`${API_URL}/todo/${id}`);
    console.log("Todo deleted!");
    if (onTodoUpdate) onTodoUpdate();
  } catch (err) {
    console.error(err);
    console.log("Failed to delete todo");
  }
};


if (!todos || todos.length === 0) {
  return (
    <div className="flex justify-center items-center h-[55vh]">
      <div
        className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"
      ></div>
    </div>
  );
}
  
return (
  <div className="flex flex-wrap justify-evenly my-10 container">
    {todos.map((todo) => (
      <div
        className="flex flex-col justify-between bg-gray-200 hover:shadow-xl hover:shadow-violet-800 my-5 mx-4 p-4 rounded-lg border-2 border-solid w-80 break-words relative"
        key={todo._id}
      >
        <div>
        <button
          onClick={() => deleteTodo(todo._id)}
          className="absolute -top-3 -right-3 w-[30px] h-[30px] rounded-full bg-red-600 flex items-center justify-center font-bold hover:outline-2 hover:outline-offset-2 hover:bg-red-700 active:bg-red-800 hover:scale-120 transition" >
          ✕
        </button>
          <p className={`text-3xl text-center break-words ${todo.completed ? "line-through text-gray-400" : "text-black"}`}>{todo.title}</p>
          <hr className={`my-2 border-t border-gray-400`} />
          <h3 className={`text-l break-words ${todo.completed ? "line-through text-gray-500" : ""}`}>{todo.description}</h3>
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => toggleComplete(todo._id)}
            className={`w-40 rounded-xl focus:outline-2 focus:outline-offset-2 text-center
            ${
              todo.completed
                ? "bg-green-500 hover:bg-green-600 focus:outline-green-500 active:bg-green-700"
                : "bg-red-500 hover:bg-red-600 focus:outline-red-500 active:bg-red-700"
            }
            p-2 mt-4`}
          >
            {todo.completed ? "Completed" : "Mark as Complete"}
          </button>
        </div>
      </div>
    ))}
  </div>
);

}
