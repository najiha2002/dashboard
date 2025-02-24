// src/App.jsx
import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation,
  Navigate
} from 'react-router-dom';

import './css/style.css';
import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

// Protected Route Component
const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
