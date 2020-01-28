import React from "react";
import { Link } from 'react-router-dom';
import { NavItem } from 'reactstrap';
import './Footer.css';

const Footer = (props) => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        <ul className="footer-flex">
          <NavItem>
            <Link to={`/`} className="nav-item nav-li" id="home-link-footer">Home</Link>
          </NavItem>
          <NavItem>
            <Link to={`/profile`} className="nav-item nav-li" id="account-link-footer">Account Profile</Link>
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
