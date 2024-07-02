import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../Contexts/UserContext';

export const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const { user } = useUser();

  const baseURL = 'http://localhost:3000';

  useEffect(() => {
    fetchTodos();
  }, [user]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${baseURL}/todos?userId=${user.id}`);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const createTodo = async () => {
    try {
      const response = await axios.post(`${baseURL}/todos`, {
        title: newTodoTitle,
        completed: false,
        userId: user.id
      });
      setTodos([...todos, response.data]);
      setNewTodoTitle('');
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  const updateTodo = async (id, newTitle, completed) => {
    try {
      const response = await axios.put(`${baseURL}/todos/${id}`, {
        title: newTitle,
        completed: completed,
        userId: user.id
      });
      setTodos(todos.map(todo => todo.id === id ? response.data : todo));
      setEditingTodo(null);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${baseURL}/todos/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const toggleTodo = async (id) => {
    const todo = todos.find(t => t.id === id);
    await updateTodo(id, todo.title, !todo.completed);
  };

  return (
    <div>
      <h2>Todos for {user.name}</h2>
      <div>
        <input
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder="New todo title"
        />
        <button onClick={createTodo}>Add Todo</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            {editingTodo === todo.id ? (
              <>
                <input
                  type="text"
                  value={todo.title}
                  onChange={(e) => setTodos(todos.map(t => t.id === todo.id ? {...t, title: e.target.value} : t))}
                />
                <button onClick={() => updateTodo(todo.id, todo.title, todo.completed)}>Save</button>
                <button onClick={() => setEditingTodo(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.title}</span>
                <button onClick={() => setEditingTodo(todo.id)}>Edit</button>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};