import React from "react";
import {
  NavItem,
  NavLink
} from 'reactstrap';

const Footer = (props) => {
  return (
    <footer className="footer-section">
      <div class="footer-container">
        <ul class="footer-flex">
          <NavItem>
            <NavLink href="/" className="nav-item nav-li">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/profile" className="nav-item nav-li">Account Profile</NavLink>
          </NavItem>
        </ul>
        <div class="footer-copyright">
          <p>&copy; 2019 Sprout Fitness</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;