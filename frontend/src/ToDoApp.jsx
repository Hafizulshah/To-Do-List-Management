import { useEffect, useState } from 'react'
import axios from 'axios'

export default function ToDoApp() {
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  // Fetch todos
  const loadTodos = async () => {
    const res = await axios.get('/api/todo')
    setTodos(res.data)
  }

  useEffect(() => {
    loadTodos()
  }, [])

  // Create new todo
  const handleAdd = async () => {
    if (!title.trim()) return alert('Title is required')
    await axios.post('/api/todo', {
      title,
      description,
    })
    setTitle('')
    setDescription('')
    loadTodos()
  }

  // Delete todo
  const handleDelete = async (id) => {
    await axios.delete(`/api/todo/${id}`)
    loadTodos()
  }

  // Toggle complete
  const toggleComplete = async (todo) => {
    await axios.put(`/api/todo/${todo.id}`, {
      ...todo,
      isCompleted: !todo.isCompleted,
    })
    loadTodos()
  }

  return (
    <div style={{ padding: '2rem', maxWidth: 600, margin: 'auto' }}>
      <h1>📝 To-Do List</h1>

      <div style={{ marginBottom: '1rem' }}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: '100%', padding: '0.5rem' }}
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
        />
        <button onClick={handleAdd} style={{ marginTop: '0.5rem' }}>
          ➕ Add To-Do
        </button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: '1rem' }}>
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => toggleComplete(todo)}
            />
            <strong style={{ marginLeft: '0.5rem' }}>
              {todo.title}
            </strong>
            {todo.description && (
              <p style={{ margin: '0.25rem 0' }}>{todo.description}</p>
            )}
            <button onClick={() => handleDelete(todo.id)}>🗑 Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}