import React from "react";  
import './menu_card.css';
import { Link } from 'react-router-dom'

export default function MenuCard({ closeMenu }){
    return (
      <div className="menu_card">
        <Link className="menu_option" to="/" onClick={closeMenu}>
          Home
        </Link>
        <Link className="menu_option" to="/contact" onClick={closeMenu}>
          Contact
        </Link>
        <Link className="menu_option" to="/about" onClick={closeMenu}>
          About Me
        </Link>
        <Link className="menu_option" to="/admin" onClick={closeMenu}>
          Login
        </Link>
        <Link className="menu_option" to="/portfolio" onClick={closeMenu}>
          Portfolio
        </Link>
      </div>
    );
}