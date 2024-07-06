import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'; 

function ResolvedList() {
  const [pendientes, setPendientes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/pendientes/resueltos/')
      .then(res => {
        setPendientes(res.data);
      })
      .catch(err => {
        console.error('Error al obtener pendientes resueltos:', err);
      });
  }, []);

  return (
    <div className="resolved-list-container">
      <h1 className="resolved-list-title">Lista de Pendientes Resueltos (ID y Título)</h1>
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

export default ResolvedList;
