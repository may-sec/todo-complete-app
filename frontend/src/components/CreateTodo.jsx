import { useState } from "react";
import axios from "axios";

export function CreateTodo({ onTodoAdded }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const API_URL = import.meta.env.PROD ? "" : "http://localhost:3000";

    const addTodo = async () => {
        try {
          await axios.post(`${API_URL}/todo`, {
            title,
            description,
          });

          alert("Todo added!!");
          setTitle("");
          setDescription("");
          
          // Refresh the todo list
          if (onTodoAdded) onTodoAdded();
        } catch (err) {
          console.error(err);
          alert("Failed to add todo");
        }
    };

    return (
      <div className="max-w-md w-[400px] flex flex-col bg-gray-400 p-[20px] my-[50px] rounded-2xl hover:shadow-xl hover:shadow-violet-400">
        <input className="border-2 border-gray-700 p-[10px] m-[5px] hover:border-violet-500 focus:border-violet-700 rounded-lg"
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />

        <input className="border-2 border-gray-700 p-[10px] m-[5px] hover:border-violet-500 focus:border-violet-700 rounded-lg"
          type="text"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />

        <button className="p-[10px] m-[5px] bg-violet-500 hover:bg-violet-600 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700 rounded-full"
          onClick={addTodo}>
          Add Todo
        </button>
      </div>
    );
}