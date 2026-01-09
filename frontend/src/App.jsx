import { useState, useEffect } from 'react'
import axios from "axios";
import { CreateTodo } from './components/CreateTodo'
import { Todos } from './components/Todos'

function App() {
  const [todos, setTodos] = useState([]);

  const API_URL = import.meta.env.PROD ? "" : "http://localhost:3000";
  const fetchTodos = () => {
    axios
      .get(`${API_URL}/todos`)
      .then((res) => {
        setTodos(res.data.todos);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="flex items-center justify-center bg-gray-200 flex-col">
      <CreateTodo onTodoAdded={fetchTodos} />
      <hr className="h-px w-full bg-black border-1" />
      <Todos todos={todos} onTodoUpdate={fetchTodos} />
    </div>
  )
}

export default App