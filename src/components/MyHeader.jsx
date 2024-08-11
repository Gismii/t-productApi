import React, { useState } from 'react';
import LogOut from '../logout/Logout'; 
import './header.css';

function Header() {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <header className="header">
      <div className="logo">
        <a href="/home">t-alpha</a>
      </div>
      <nav className={`nav ${menuActive ? 'active' : ''}`}>
        <ul className={`nav-links ${menuActive ? 'active' : ''}`}>
          <li><LogOut /></li> {/* Substitua o link de "Sair" pelo componente LogOut */}
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
