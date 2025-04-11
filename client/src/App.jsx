import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Profile from './components/auth/profile';
import ApiStatus from './components/pages/apistatus';
import { setAuthToken } from './utils/auth';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Verifica se l'utente è autenticato al caricamento dell'app
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        setAuthToken(token);
        try {
          const res = await fetch('/api/auth/me');
          if (res.ok) {
            const userData = await res.json();
            setUser(userData);
            setIsAuthenticated(true);
          } else {
            // Token non valido o scaduto
            localStorage.removeItem('token');
            setAuthToken(null);
          }
        } catch (err) {
          console.error('Errore durante la verifica dell\'autenticazione:', err);
          localStorage.removeItem('token');
          setAuthToken(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Funzione per gestire il login
  const login = (token, userData) => {
    localStorage.setItem('token', token);
    setAuthToken(token);
    setUser(userData);
    setIsAuthenticated(true);
    navigate('/profile');
  };

  // Funzione per gestire il logout
  const logout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    setUser(null);
    setIsAuthenticated(false);
    navigate('/');
  };

  // Componente per le rotte protette
  const PrivateRoute = ({ children }) => {
    if (loading) return <div className="container">Caricamento...</div>;
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} logout={logout} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register login={login} />} />
          <Route path="/login" element={<Login login={login} />} />
          <Route path="/profile" element={
            <PrivateRoute>
              <Profile user={user} />
            </PrivateRoute>
          } />
          <Route path="/api-status" element={<ApiStatus />} />
        </Routes>
      </div>
    </>
  );
};

export default App;