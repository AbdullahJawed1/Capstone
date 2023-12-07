// components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="navbar">
      <Link className="navbar--home"to="/">Home</Link>
      <Link className="navbar--projects" to="/projects">Projects</Link>
      <Link className="navbar--groups" to="/groups">Groups</Link>
    </nav>
  );
};

