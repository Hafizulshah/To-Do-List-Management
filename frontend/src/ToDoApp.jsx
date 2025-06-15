import React from 'react';
import { useEffect, useState } from 'react';
import { BiCheckSquare, BiPlusCircle, BiSolidCaretDownCircle, BiPencil, BiTrash, BiSave, BiX} from 'react-icons/bi';
import axios from 'axios';
import './ToDoApp.css';


export default function ToDoApp() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editDueDate, setEditDueDate] = useState('');
  const [sortOption, setSortOption] = useState('created');

  const loadTodos = async () => {
    try {
      const res = await axios.get('/api/todo');
      let sorted = [...res.data];
      if (sortOption === 'created') {
        sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      } else if (sortOption === 'due') {
        sorted.sort((a, b) =>
          a.dueDate && b.dueDate
            ? new Date(a.dueDate) - new Date(b.dueDate)
            : !a.dueDate ? 1 : -1
        );
      }
      setTodos(sorted);
    } catch (err) {
      console.error('Failed to load todos:', err);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    loadTodos();
  }, [sortOption]);

  const handleAdd = async () => {
    if (!title.trim()) return alert('Title is required');

    try {
      await axios.post('/api/todo', {
        title,
        description,
        dueDate: dueDate || null,
      });

      setTitle('');
      setDescription('');
      setDueDate('');
      loadTodos();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const messages = Object.values(error.response.data.errors)
          .flat()
          .join('\n');
        alert(messages);
      } else {
        alert('Something went wrong.');
      }
    }
  };

  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setEditDueDate(todo.dueDate ? todo.dueDate.split('T')[0] : '');
  };

  const saveEdit = async () => {
    await axios.put(`/api/todo/${editingId}`, {
      id: editingId,
      title: editTitle,
      description: editDescription,
      dueDate: editDueDate || null,
      isCompleted: todos.find((t) => t.id === editingId)?.isCompleted,
      createdAt: todos.find((t) => t.id === editingId)?.createdAt,
    });

    setEditingId(null);
    setEditTitle('');
    setEditDescription('');
    setEditDueDate('');
    loadTodos();
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
    setEditDescription('');
    setEditDueDate('');
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/todo/${id}`);
    loadTodos();
  };

  const toggleComplete = async (todo) => {
    await axios.put(`/api/todo/${todo.id}`, {
      ...todo,
      isCompleted: !todo.isCompleted,
    });
    loadTodos();
  };

  return (
  <div className='page'>
    <div className='todo-container'>
      <h1>To-Do List <BiCheckSquare /></h1>

        {/* Add Todo */}
        <div className='todo-form'>
          <input
            type='text'
            placeholder='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder='Description (optional)'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type='date'
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <button onClick={handleAdd} className='btn btn-green'>
            Add <BiPlusCircle />
          </button>
        </div>

        {/* Sort Options */}
        <div className='sort-bar'>
          <label>Sort by:</label>
          <div className='sort-dropdown'>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value='created'>Created Date</option>
              <option value='due'>Due Date</option>
            </select>
            <BiSolidCaretDownCircle className='sort-icon' />
          </div>
        </div>

        {/* List */}
        {todos.map((todo) => (
          <div key={todo.id} className='todo-card'>
            {editingId === todo.id ? (
              <>
                <input
                  placeholder='Title'
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <textarea
                  placeholder='Description (Optional)'
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
                <input
                  type='date'
                  value={editDueDate}
                  onChange={(e) => setEditDueDate(e.target.value)}
                />
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={saveEdit} className='btn btn-green'>
                    Save <BiSave />
                  </button>
                  <button onClick={cancelEdit} className='btn btn-red'>
                    <BiX /> Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className='todo-row'>
                  <div className='todo-main'>
                    <div className='todo-title-section'>
                      <input
                        type='checkbox'
                        checked={todo.isCompleted}
                        onChange={() => toggleComplete(todo)}
                        style={{ marginRight: '0.5rem' }}
                      />
                      <strong className={`todo-title ${todo.isCompleted ? 'completed' : ''}`}>
                        {todo.title}
                      </strong>
                    </div>
                    <p>{todo.description}</p>
                    <p style={{ fontSize: '0.8rem', color: '#888' }}>
                      Created: {new Date(todo.createdAt).toLocaleDateString()}
                      {todo.dueDate && <> | Due: {new Date(todo.dueDate).toLocaleDateString()}</>}
                    </p>
                  </div>
                  <div className='todo-actions-vertical'>
                    <button onClick={() => startEditing(todo)} className='btn btn-blue'>
                      <BiPencil /> Edit
                    </button>
                    <button onClick={() => handleDelete(todo.id)} className='btn btn-red'>
                      <BiTrash /> Delete
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}