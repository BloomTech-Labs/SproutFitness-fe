import React from "react";
import { Link } from 'react-router-dom';
import { NavItem } from 'reactstrap';

const Footer = (props) => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        <ul className="footer-flex">
          <NavItem>
            <Link to={`/`} className="nav-item nav-li">Home</Link>
            {/* <NavLink href="/" className="nav-item nav-li">Home</NavLink> */}
          </NavItem>
          <NavItem>
            <Link to={`/profile`} className="nav-item nav-li">Account Profile</Link>
            {/* <NavLink href="/profile" className="nav-item nav-li">Account Profile</NavLink> */}
          </NavItem>
        </ul>
        <div className="footer-copyright">
          <p>&copy; 2019 Sprout Fitness</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;