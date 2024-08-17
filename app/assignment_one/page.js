'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch todos from the server
  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/todos');
      if (!res.ok) throw new Error('Failed to fetch todos');
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      setError('Failed to load todos');
    } finally {
      setLoading(false);
    }
  };

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  // Function to add a new todo
  const addTodo = async () => {
    if (text.trim() === '') return;

    setLoading(true);
    try {
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error('Failed to add todo');
      const newTodo = await res.json();
      setTodos([...todos, newTodo]);
      setText('');
    } catch (err) {
      setError('Failed to add todo');
    } finally {
      setLoading(false);
    }
  };

  // Function to delete a todo by ID
  const deleteTodo = async (id) => {
    setLoading(true);
    try {
      await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      setError('Failed to delete todo');
    } finally {
      setLoading(false);
    }
  };

  // Function to update a todo by ID
  const updateTodo = async () => {
    if (text.trim() === '' || !editId) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/todos/${editId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) throw new Error('Failed to update todo');

      // Refetch todos after update
      await fetchTodos();
      setText('');
      setEditId(null);
    } catch (err) {
      setError('Failed to update todo');
      console.error('Update error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Function to set the todo for editing
  const startEditing = (todo) => {
    setText(todo.text);
    setEditId(todo._id);
  };

  return (
    <div className="max-w-lg mx-auto p-4 md:p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-xl md:text-2xl font-bold mb-4">Todo List</h1>
      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={editId ? 'Update todo' : 'Enter a new todo'}
          aria-label={editId ? 'Update Todo' : 'New Todo'}
          className="flex-1 p-2 border border-gray-300 rounded-md text-sm md:text-base"
        />
        <button
          onClick={editId ? updateTodo : addTodo}
          disabled={loading}
          className={`mt-2 md:mt-0 px-4 py-2 rounded-md text-white ${
            editId ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
          } ${loading ? 'bg-gray-400 cursor-not-allowed' : ''}`}
        >
          {loading ? (editId ? 'Updating...' : 'Adding...') : (editId ? 'Update Todo' : 'Add Todo')}
        </button>
      </div>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      {loading && <p className="text-gray-500 mb-4 text-center">Loading...</p>}
      <ul className="list-none p-0">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="flex flex-col md:flex-row justify-between items-center p-2 border-b border-gray-200"
          >
            <span className="mb-2 md:mb-0">{todo.text}</span>
            <div className="flex gap-2">
              <button
                onClick={() => startEditing(todo)}
                className="px-2 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 text-sm md:text-base"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTodo(todo._id)}
                disabled={loading}
                className={`px-2 py-1 rounded-md text-white text-sm md:text-base ${
                  loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
                }`}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
