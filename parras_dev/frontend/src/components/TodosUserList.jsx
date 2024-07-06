import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'; 

function TodosUserList() {
  const [pendientes, setPendientes] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/pendientes/`)
      .then(res => {
        setPendientes(res.data);
      })
      .catch(err => {
        console.error('Error al obtener pendientes por usuario:', err);
      });
  }, []);

  return (
    <div className="resolved-list-container">
      <h1 className="resolved-list-title">Lista de Todos los Pendientes (IDs y Títulos)</h1>
      <ul className="resolved-list">
        {pendientes.map(pendiente => (
          <li key={pendiente.id} className="resolved-list-item">
            <strong>ID:</strong> {pendiente.id}<br />
            <strong>UserID:</strong> {pendiente.user_id}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodosUserList;
