import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'; 

function UnresolvedList() {
  const [pendientes, setPendientes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/pendientes/no-resueltos/')
      .then(res => {
        setPendientes(res.data);
      })
      .catch(err => {
        console.error('Error al obtener pendientes no resueltos:', err);
      });
  }, []);

  return (
    <div className="resolved-list-container">
      <h1 className="resolved-list-title">Lista de Pendientes Sin Resolver (ID y Título)</h1>
      <ul className="resolved-list">
        {pendientes.map(pendiente => (
          <li key={pendiente.id} className="resolved-list-item">
            <strong>ID:</strong> {pendiente.id}<br />
            <strong>Título:</strong> {pendiente.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UnresolvedList;
