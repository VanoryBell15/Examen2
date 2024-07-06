import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css'; 

const TodosList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/pendientes/');
        setTodos(response.data); 
      } catch (error) {
        console.error('Error al obtener pendientes:', error);
      }
    };

    fetchTodos();
  }, []); 

  return (
    <div className="resolved-list-container">
      <h1 className="resolved-list-title">Lista de todos los pendientes (Solo ID)</h1>
      <ul className="resolved-list">
        {todos.map(todo => (
          <li key={todo.id} className="resolved-list-item">
            <strong>ID:</strong> {todo.id} 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodosList;
