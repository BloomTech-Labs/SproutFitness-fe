import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../actions';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem
} from 'reactstrap';

const NavBarBox = () => {
  const [isOpen, setIsOpen] = useState(false)
  const history = useHistory();
  const dispatch = useDispatch();

  const toggle = () => {
    setIsOpen(!isOpen)
  }
  
  const logoutHandle = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("Uid")
    dispatch({ type: LOGOUT })
    history.push('/login') 
  }
  
  return (
    <Navbar color="light" light expand="md" className="nav-bar">
      <Link to={`/`} className="logo-main">
        <span className="logo-color">Sprout</span>
        <span className="logo-color-end">Fitness</span>
      </Link>
      {/* <NavbarBrand href="/" className="logo-main"><span className="logo-color">Sprout</span> <span className="logo-color-end">Fitness</span></NavbarBrand> */}
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto nav-links" navbar>
          <NavItem>
            <Link to={`/`} className="nav-item nav-li">Home</Link>
            {/* <NavLink href="/" className="nav-item nav-li">Home</NavLink> */}
          </NavItem>
          <NavItem>
            <Link to={`/profile`} className="nav-item nav-li">Account Profile</Link>
            {/* <NavLink href="/profile" className="nav-item nav-li">Account Profile</NavLink> */}
          </NavItem>
        </Nav>
          <button onClick={logoutHandle} className="btn btn-primary btn-large logout-btn">Logout</button>
      </Collapse>
    </Navbar>
  )
}

export default NavBarBox;