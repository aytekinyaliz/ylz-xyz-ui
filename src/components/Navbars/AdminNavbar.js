/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media
} from "reactstrap";

class AdminNavbar extends React.Component {
  constructor(props){
    super(props)
    this.state={
      email:''
    }
  }
componentWillMount(){
const email = localStorage.getItem('email')
  this.setState({
    email:email
  })
}
handleLogout = e => {
  e.preventDefault();
  const token = localStorage.getItem("token");

  const url = process.env.REACT_APP_IAM_SERVICE_URI + "/api/users/signOut";
  try {
    console.log("object");
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    }).then(res => {
      if (res.status === 200) {
        console.log(res.status);
        localStorage.clear();
        this.props.history.push("/auth/login");
      } else {
        const error = new Error(res.error);
        throw error;
      }
    });
  } catch (err) {
    if (err.response.status === 500) {
      console.log("There was a problem with server");
    } else {
      console.log(err.response.data.message);
    }
  }
}; 
  render() {
    return (
      <>
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
          <Container fluid>
            <Link
              className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
              to="/"
            >
              {this.props.brandText}
            </Link>
            <Nav className="align-items-center d-none d-md-flex" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span >
                    <i className="ni ni-circle-08 ni-2x"></i>
                    </span>
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold">
                        {this.state.email}
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  
                  <DropdownItem href="#pablo" onClick={this.handleLogout}>
                    <i className="ni ni-user-run" />
                    <span>Logout</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default AdminNavbar;
