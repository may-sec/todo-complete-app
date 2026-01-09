import { useState } from "react";
import axios from "axios";

export function CreateTodo({ onTodoAdded }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const API_URL = import.meta.env.PROD ? "" : "http://localhost:3000";

    const addTodo = async () => {
      if (!title || !description) return;

      try {
        setLoading(true);

        await axios.post(`${API_URL}/todo`, {
          title,
          description,
        });

        alert("Todo added!!");
        setTitle("");
        setDescription("");

        if (onTodoAdded) onTodoAdded();
      } catch (err) {
        console.error(err);
        alert("!! Failed to add Todo !!");
      } finally {
        setLoading(false);
      }
    };


    return (
      <div className="max-w-md w-[400px] flex flex-col bg-gray-400 p-[20px] my-[50px] rounded-2xl hover:shadow-xl hover:shadow-violet-400">
        <input className="border-2 border-gray-700 p-[10px] m-[5px] hover:border-violet-500 focus:border-violet-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
          required
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />

        <input className="border-2 border-gray-700 p-[10px] m-[5px] hover:border-violet-500 focus:border-violet-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
          required
          type="text"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />

        <button className={`p-[10px] m-[5px] bg-violet-500 hover:bg-violet-600 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700 rounded-full 
        ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-violet-500 hover:bg-violet-600"}`}
          onClick={addTodo}>
          {loading ? "Adding..." : "Add Todo"}
        </button>

      </div>
    );
}