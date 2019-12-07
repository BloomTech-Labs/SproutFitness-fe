// import React from 'react';
// import { Fragment } from 'react';
// import { Redirect } from 'react-router'; 
// import {
//   Collapse,
//   Navbar,
//   NavbarToggler,
//   NavbarBrand,
//   Nav,
//   NavItem,
//   NavLink
// } from 'reactstrap';

// export default class NavBar extends React.Component {
//   state = {
//     navigate: false
//   }

//   constructor(props) {
//     super(props);

//     this.toggle = this.toggle.bind(this);
//     this.state = {
//       isOpen: false
//     };
//   }
//   toggle() {
//     this.setState({
//       isOpen: !this.state.isOpen
//     });
//   }

//   render() {
//     const { navigate } = this.state
//     if (navigate) {
//       return <Redirect to ="/login" push={true} />
//     }
//     return <Fragment>
//       <Navbar color="light" light expand="md" className="nav-bar">
//         <NavbarBrand href="/" className="logo-main"><span className="logo-color">Sprout</span> <span className="logo-color-end">Fitness</span></NavbarBrand>
//         <NavbarToggler onClick={this.toggle} />
//         <Collapse isOpen={this.state.isOpen} navbar>
//           <Nav className="ml-auto" navbar className="nav-links">
//             <NavItem>
//               <NavLink href="/components/" className="nav-item nav-li">Contact</NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink href="/messenger" className="nav-item nav-li">Messenger</NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink href="/calendar/" className="nav-item">Calendar</NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink href="/contact/" className="nav-item">Blogger</NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink href="/contact/" className="nav-item">Analytics</NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink href="/contact/" className="nav-item">Billing</NavLink>
//             </NavItem>
//           </Nav>
//             <button onClick={() => this.setState({ navigate: true })} className="btn btn-primary btn-large logout-btn">Logout</button>
//         </Collapse>
//       </Navbar>
//     </Fragment>
//   }
// }

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
    const { navigate, toggle, isOpen } = this.state
    if (navigate) {
      return <Redirect to ="/login" push={true} />
    }
    
    return (
      <div>
        <Navbar color="light" light expand="md" className="nav-bar">
          <NavbarBrand href="/" className="logo-main"><span className="logo-color">Sprout</span> <span className="logo-color-end">Fitness</span></NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto nav-links" navbar>
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
            </Nav>
              <button onClick={() => this.setState({ navigate: true })} className="btn btn-primary btn-large logout-btn">Logout</button>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}

export default NavBar;
