import React from 'react'
import { Navbar, Container, Nav} from "react-bootstrap"
import logo from "../assets/kitrate_logo.png"

const NavBar = () => {
  return (
    // Based on React-Bootstrap NavBar component
        <Navbar expand="md" fixed="top">
            <Container>
                <Navbar.Brand>
                    <img src={logo} alt="logo" height="45"/>
                    KitRate
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto text-right">
                        <Nav.Link><i className='fas fa-home'></i>Home</Nav.Link>
                        <Nav.Link><i className='fas fa-sign-in-alt'></i>Sign-In</Nav.Link>
                        <Nav.Link><i className='fas fa-user-plus'></i>Sign-Up</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
  )
}

export default NavBar