
// import './App.css'
import { useState } from 'react'
import TodoCard from './components/Card'
import Input from './components/Input'

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (task) => {
    setTodos([...todos, { title: task, status: "pending" }]);
  };

  const updateStatus = (index) => {
    const updated = [...todos];
    updated[index].status = updated[index].status === "Pending" ? "Completed" : "Pending";

    setTodos(updated);
  }

  const removeTodo = (index) => {
    setTodos(todos.filter((__, i) => i !== index));
  }

  return (
    <div
      className='min-h-screen 
      px-6 py-10 bg-gradient-to-b   from-purple-800 to-purple-900 text-white'
    >
      <Input addTodo={addTodo} />

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>

        {todos.map((todo, index) => (
          <TodoCard
            key={index}
            index={index}
            todo={todo}
            updateStatus={updateStatus}
            removeTodo={removeTodo}

          />
        ))}
      </div>

    </div>
  )
}

export default App
