// import React from 'react';
// import { NavLink } from 'react-router-dom';

// const Navbar = () => {
//     return (
//       <div>
//         <header className="header-nav">
//           <h1 className="logo-main"><span className="logo-color">Sprout</span> <span className="logo-color-end">Fitness</span></h1>
//           <nav className="navbar">
//           <ul className="nav-links">
//             <li className="nav-item"><NavLink to="/contact" activeClassName="active">Contact</NavLink></li>
//             <li className="nav-item"><NavLink to="/messenger" activeClassName="active">Messenger</NavLink></li>
//             <li className="nav-item"><NavLink to="/calendar" activeClassName="active">Calendar</NavLink></li>
//             <li className="nav-item"><NavLink to="/blogger" activeClassName="active">Blogger</NavLink></li>
//             <li className="nav-item"><NavLink to="/analytics" activeClassName="active">Analytics</NavLink></li>
//             <li className="nav-item"><NavLink to="/billing" activeClassName="active">Billing</NavLink></li>
//           </ul>
//           </nav>
//           <div className="button-wrapper">
//             <button type="button" id="hover-effect" className="btn btn-primary btn-large logout-btn">Logout</button>
//           </div>
//         </header>
//         <div>
          
//         </div>
//       </div>
//     )
// }

// export default Navbar

import React from 'react';
import { Fragment } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

export default class NavBar extends React.Component {

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
    return <Fragment>
      <Navbar color="light" light expand="md" className="header-nav">
        <NavbarBrand href="/" className="logo-main"><span className="logo-color">Sprout</span> <span className="logo-color-end">Fitness</span></NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar className="nav-links">
            <NavItem>
              <NavLink href="/components/" className="nav-item">Contact</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/messenger" className="nav-item">Messenger</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/calendar/" className="nav-item">Calendar</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/contact/" className="nav-item">Blogger</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/contact/" className="nav-item">Analytics</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/contact/" className="nav-item">Billing</NavLink>
            </NavItem>
          </Nav>
            <button className="btn btn-primary btn-large logout-btn">Logout</button>
        </Collapse>
      </Navbar>
    </Fragment>
  }
}
