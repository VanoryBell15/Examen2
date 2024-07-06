import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'; 

function UnresolvedUserList() {
  const [pendientes, setPendientes] = useState([]);
  const [userId, setUserId] = useState(1); 
  const [userIds, setUserIds] = useState([]); 
  useEffect(() => {
  
    axios.get('http://localhost:8000/api/api/usuarios/')
      .then(res => {
        setUserIds(res.data.map(user => user.user_id));
      })
      .catch(err => {
        console.error('Error al obtener IDs de usuarios:', err);
      });
  }, []);

  useEffect(() => {

    axios.get(`http://localhost:8000/api/pendientes/user/${userId}/no-resueltos/`)
      .then(res => {
        setPendientes(res.data);
      })
      .catch(err => {
        console.error('Error al obtener pendientes no resueltos por usuario:', err);
      });
  }, [userId]);

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  return (
    <div className="resolved-list-container">
      <h1 className="resolved-list-title">Lista de Pendientes Sin Resolver por Usuario (ID y Título)</h1>
      
      <div className="select-container"> 
        <label htmlFor="userId">Seleccionar ID de Usuario:</label>
        <select id="userId" value={userId} onChange={handleUserIdChange}>
          {userIds.map(id => (
            <option key={id} value={id}>{id}</option>
          ))}
        </select>
      </div>

      <ul className="resolved-list">
        {pendientes.map(pendiente => (
          <li key={pendiente.id} className="resolved-list-item">
            <strong>ID:</strong> {pendiente.id}<br />
            <strong>Título:</strong> {pendiente.title}<br />
            <strong>Usuario:</strong> {pendiente.user_id}<br />
            <strong>Resuelto:</strong> {pendiente.resolved ? 'Sí' : 'No'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UnresolvedUserList;
