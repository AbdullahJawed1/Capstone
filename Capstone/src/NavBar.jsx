// components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav style={{ background: '#800080', padding: '10px', color: 'white' }}>
      <Link to="/" style={{ color: 'white', marginRight: '10px' }}>Home</Link>
      <Link to="/projects" style={{ color: 'white', marginRight: '10px' }}>Projects</Link>
      <Link to="/groups" style={{ color: 'white' }}>Groups</Link>
    </nav>
  );
};

export default NavBar;

// hello world
