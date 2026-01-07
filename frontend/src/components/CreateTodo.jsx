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

          console.log("Todo added!!");
          setTitle("");
          setDescription("");
          
          // Refresh the todo list
          if (onTodoAdded) onTodoAdded();
        } catch (err) {
          console.error(err);
          console.log("Failed to add todo");
        }
    };

    return (
      <div>
        <input
          style={{ padding: "10px", margin: "5px" }}
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />

        <input
          style={{ padding: "10px", margin: "5px" }}
          type="text"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />

        <button
          style={{ padding: "10px", margin: "5px" }}
          onClick={addTodo}>
          Add Todo
        </button>
      </div>
    );
}