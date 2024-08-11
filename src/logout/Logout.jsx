import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogOut = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove o token do localStorage
    navigate('/'); // Redireciona para a página de login
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Sair
    </button>
  );
};

export default LogOut;
