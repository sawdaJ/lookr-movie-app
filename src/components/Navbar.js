import React, { useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import lightLogo from '../assets/light-logo.png';
import darkLogo from '../assets/dark-logo.png';
import '../App.css'

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleModeChange = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode');
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Perform search logic with searchQuery
    console.log('Searching for:', searchQuery);
    setSearchQuery('');
  };

  return (
    <nav className={isDarkMode ? 'dark-mode' : 'light-mode'}>
      <div className="navbar-content">
        <div className="logo-container">
          <img
            className="logo"
            src={isDarkMode ? darkLogo : lightLogo}
            alt="Logo"
          />
        </div>
        <div className="right-content">
          <div className="mode-switch" onClick={handleModeChange}>
            {isDarkMode ? <FiSun /> : <FiMoon />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
