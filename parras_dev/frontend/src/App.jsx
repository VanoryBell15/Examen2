import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TodosList from './components/TodosList';
import TodosTitlesList from './components/TodosTitlesList';
import UnresolvedList from './components/UnresolvedList';
import ResolvedList from './components/ResolvedList';
import TodosUserList from './components/TodosUserList';
import ResolvedUserList from './components/ResolvedUserList';
import UnresolvedUserList from './components/UnresolvedUserList';
import './App.css'; 

function App() {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [resolved, setResolved] = useState(false);
  const [showForm, setShowForm] = useState(false); 
  const [notification, setNotification] = useState(null); 

  const handleCreatePendiente = async () => {
    if (!title || !userId) {
      alert('Por favor completa todos los campos.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/pendientes/crear/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, user_id: userId, resolved })
      });

      if (!response.ok) {
        throw new Error('Error al crear el pendiente');
      }

      const data = await response.json();
      console.log('Nuevo pendiente creado:', data);

    
      setNotification('Pendiente creado correctamente.');

      
      setTimeout(() => {
        setNotification(null);
      }, 3000);

   
      setShowForm(false);
      
      setTitle('');
      setUserId('');
      setResolved(false);

    } catch (error) {
      console.error('Error al crear el pendiente:', error);
      alert('Error al crear el pendiente. Por favor intenta nuevamente.');
    }
  };

  const handleResolvedChange = (event) => {
    setResolved(event.target.checked);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <Router>
      <div className="main-content">
        <header>
          <nav>
            <div className="navbar-brand">Parra's Dev</div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-collapse collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/todos">Todos</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/todos-titles">Todos (Títulos)</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/sin-resolver">Sin Resolver</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/resueltos">Resueltos</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/todos-user">Todos (UserID)</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/resueltos-user">Resueltos (UserID)</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/sin-resolver-user">Sin Resolver (UserID)</Link>
                </li>
              </ul>
            </div>
          </nav>
        </header>
        <div className="create-pendiente">
          <button className="toggle-button" onClick={toggleForm}>
            {showForm ? 'Ocultar Formulario' : 'Crear Pendiente'}
          </button>
          {showForm && (
            <div className="form-container">
              <h2>Crear Pendiente</h2>
              <div className="form-group">
                <label htmlFor="title">Título:</label>
                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="form-input" />
              </div>
              <div className="form-group">
                <label htmlFor="userId">ID de Usuario:</label>
                <input type="number" id="userId" value={userId} onChange={(e) => setUserId(e.target.value)} required className="form-input" />
              </div>
              <div className="form-group">
                <label htmlFor="resolved">Resuelto:</label>
                <input type="checkbox" id="resolved" checked={resolved} onChange={handleResolvedChange} className="form-checkbox" />
              </div>
              <button className="create-button" onClick={handleCreatePendiente}>Crear Pendiente</button>
            </div>
          )}
          {notification && (
            <div className="notification">
              {notification}
            </div>
          )}
        </div>
        <div>
          <Routes>
            <Route path="/" element={<TodosList />} />
            <Route path="/todos" element={<TodosList />} />
            <Route path="/todos-titles" element={<TodosTitlesList />} />
            <Route path="/sin-resolver" element={<UnresolvedList />} />
            <Route path="/resueltos" element={<ResolvedList />} />
            <Route path="/todos-user" element={<TodosUserList />} />
            <Route path="/resueltos-user" element={<ResolvedUserList />} />
            <Route path="/sin-resolver-user" element={<UnresolvedUserList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
