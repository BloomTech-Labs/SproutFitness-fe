import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

const NavBarBox = () => {
  const [isOpen, setIsOpen] = useState(false)
  const history = useHistory();

  const toggle = () => {
    setIsOpen(!isOpen)
  }
  
  const logoutHandle = () => {
    localStorage.removeItem("token")
    history.push('/login')
  }
  
  return (
    <Navbar color="light" light expand="md" className="nav-bar">
      <NavbarBrand href="/" className="logo-main"><span className="logo-color">Sprout</span> <span className="logo-color-end">Fitness</span></NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto nav-links" navbar>
          <NavItem>
            <NavLink href="/" className="nav-item nav-li">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/profile" className="nav-item nav-li">Account Profile</NavLink>
          </NavItem>
        </Nav>
          <button onClick={logoutHandle} className="btn btn-primary btn-large logout-btn">Logout</button>
      </Collapse>
    </Navbar>
  )
}

export default NavBarBox;