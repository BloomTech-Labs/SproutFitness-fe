import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
      <div>
        <header className="header-nav">
          <h1 className="logo-main"><span className="logo-color">Sprout</span> <span className="logo-color-end">Fitness</span></h1>
          <nav className="navbar">
          <ul className="nav-links">
            <li className="nav-item"><NavLink to="/contact" activeClassName="active">Contact</NavLink></li>
            <li className="nav-item"><NavLink to="/messenger" activeClassName="active">Messenger</NavLink></li>
            <li className="nav-item"><NavLink to="/calendar" activeClassName="active">Calendar</NavLink></li>
            <li className="nav-item"><NavLink to="/blogger" activeClassName="active">Blogger</NavLink></li>
            <li className="nav-item"><NavLink to="/analytics" activeClassName="active">Analytics</NavLink></li>
            <li className="nav-item"><NavLink to="/billing" activeClassName="active">Billing</NavLink></li>
          </ul>
          </nav>
        </header>
        <div>
          
        </div>
      </div>
    )
}

export default Navbar
