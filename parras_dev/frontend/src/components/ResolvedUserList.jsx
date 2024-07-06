import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'; 

function ResolvedUserList() {
  const [pendientes, setPendientes] = useState([]);
  const [userId, setUserId] = useState(1); 

  useEffect(() => {
    
    const fetchResolvedPendientes = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/pendientes/user/${userId}/resueltos/`);
        setPendientes(response.data); 
      } catch (error) {
        console.error('Error al obtener pendientes resueltos por usuario:', error);
      }
    };

    fetchResolvedPendientes();
  }, [userId]); 

  const handleUserIdChange = (event) => {
    setUserId(event.target.value); 
  };

  return (
    <div className="resolved-list-container">
      <h1 className="resolved-list-title">Lista de Pendientes Resueltos por Usuario (ID y Título)</h1>
      {/* Selector de ID de usuario */}
      <div className="select-container">
        <label htmlFor="userId">Seleccionar ID de Usuario:</label>
        <select id="userId" value={userId} onChange={handleUserIdChange}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          
        </select>
      </div>

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

export default ResolvedUserList;
