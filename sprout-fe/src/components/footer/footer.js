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
                <NavLink href="/components/" className="nav-item nav-li">Contact</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/messenger" className="nav-item nav-li">Messenger</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/calendar/" className="nav-item">Calendar</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/blogger/" className="nav-item">Blogger</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/analytics/" className="nav-item">Analytics</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/billing/" className="nav-item">Billing</NavLink>
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