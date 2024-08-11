import React, { useState } from 'react';
import './header.css';

function Header() {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <header className="header">
      <div className="logo">
        <a href="/home">MyLogo</a>
      </div>
      <nav className={`nav ${menuActive ? 'active' : ''}`}>
        <ul className={`nav-links ${menuActive ? 'active' : ''}`}>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">Produtos</a></li>
          <li><a href="#services">Usuarios</a></li>
          <li><a href="#contact">Sair</a></li>
        </ul>
      </nav>
      <div className="menu-icon" onClick={toggleMenu}>
        <span className="menu-icon-bar"></span>
        <span className="menu-icon-bar"></span>
        <span className="menu-icon-bar"></span>
      </div>
    </header>
  );
}

export default Header;
