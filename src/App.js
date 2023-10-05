import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import { useAuth } from './AuthContext';

const App = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Router>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;

