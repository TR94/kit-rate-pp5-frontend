import React from 'react'
import { Navbar, Container, Nav} from "react-bootstrap"
import { NavLink } from "react-router-dom"
import logo from "../assets/kitrate_logo.png"
import styles from "../styles/NavBar.module.css"
import { useCurrentUser } from '../contexts/CurrentUserContext'

const NavBar = () => {
    const currentUser = useCurrentUser()
    const loggedInIcons = <>{currentUser?.username}</>
    const loggedOutIcons = <>
        <NavLink to="/signin"><i className='fas fa-sign-in-alt'></i>Sign-In</NavLink>
        <NavLink to="/signup"><i className='fas fa-user-plus'></i>Sign-Up</NavLink>
    </>

  return (
    // Based on React-Bootstrap NavBar component
        <Navbar className={styles.NavBar} expand="md" fixed="top">
            <Container>
                <NavLink to="/">
                    <Navbar.Brand>
                        <img src={logo} alt="logo" height="45"/>
                        KitRate
                    </Navbar.Brand>
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto text-right">
                        <NavLink exact to="/"><i className='fas fa-home'></i>Home</NavLink>
                        {currentUser ? loggedInIcons : loggedOutIcons}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
  )
}

export default NavBar