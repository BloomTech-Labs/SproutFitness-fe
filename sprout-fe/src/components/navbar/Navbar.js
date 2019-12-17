import React from 'react';
import { Redirect } from 'react-router';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

class NavBar extends React.Component {
  state = {
    navigate: false
  }

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { navigate, isOpen } = this.state
    if (navigate) {
      return <Redirect to ="/login" push={true} />
    }
    
    return (
      <div>
        <Navbar color="light" light expand="md" className="nav-bar">
          <NavbarBrand href="/" className="logo-main"><span className="logo-color">Sprout</span> <span className="logo-color-end">Fitness</span></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto nav-links" navbar>
              <NavItem>
                <NavLink href="/" className="nav-item nav-li">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/profile" className="nav-item nav-li">Account Profile</NavLink>
              </NavItem>
            </Nav>
              <button onClick={() => this.setState({ navigate: true })} className="btn btn-primary btn-large logout-btn">Logout</button>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}

export default NavBar;