// src/components/Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';
import './navigationBar.css'; // Optional: if you want to style the navigation

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/create-blog">create Blog</Link>
        </li>
        {/* Add other links as necessary */}
      </ul>
    </nav>
  );
};

export default Navigation;