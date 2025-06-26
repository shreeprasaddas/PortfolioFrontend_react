import React from "react";  
import './menu_card.css';
import { Link } from 'react-router-dom'

export default function MenuCard(){
    return (
      <div className="menu_card">
        <Link className="menu_option" to="/">
          Home
        </Link>
        <Link className="menu_option" to="/contact">
          Contact
        </Link>
        <Link className="menu_option" to="/about">
          About Me
        </Link>
        <Link className="menu_option" to="/login">
          Login
        </Link>
        <Link className="menu_option" to="/portfolio">
          Portfolio
        </Link>
      </div>
    );
}