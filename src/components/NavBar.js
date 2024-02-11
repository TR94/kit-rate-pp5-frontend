import React from 'react'
import { Navbar, Container, Nav} from "react-bootstrap"
import { NavLink } from "react-router-dom"
import logo from "../assets/kitrate_logo.png"
import styles from "../styles/NavBar.module.css"
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext'
import Avatar from './Avatar'
import axios from 'axios'
import useClickOutsideToggle from '../hooks/useClickOutsideToggle'

const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    // custom hook to make the mobile navbar (burger menu) automatically collapse on clicking
    const {expanded, setExpanded, ref} = useClickOutsideToggle()

    const addProductIcon = (
        <NavLink to="/products/create"><i className='far fa-plus-square'></i>Add Product</NavLink>
    )

    const handleSignOut = async () => {
        try{
            await axios.post("dj-rest-auth/logout/");
            setCurrentUser(null);
        } catch (err) {
            console.log(err)
        }
    }

    const loggedInIcons = <>
        <NavLink to="/feed"><i className='fas fa-stream'></i>Feed</NavLink>
        <NavLink to="/favourites"><i className='fas fa-heart'></i>Favourites</NavLink>
        <NavLink 
            to="/"
            onClick={handleSignOut}
        ><i className='fas fa-sign-out-alt'></i>Sign-Out</NavLink>
        <NavLink 
            to={`/profiles/${currentUser?.profile_id}`}
        ><Avatar src={currentUser?.profile_image} text={currentUser?.username} height={40}/></NavLink>
        {/* fix the profile_username - see issue in project board */}
    </>

    const loggedOutIcons = <>
        <NavLink to="/signin"><i className='fas fa-sign-in-alt'></i>Sign-In</NavLink>
        <NavLink to="/signup"><i className='fas fa-user-plus'></i>Sign-Up</NavLink>
    </>

  return (
    // Based on React-Bootstrap NavBar component
        <Navbar 
            expanded={expanded}    
            className={styles.NavBar} 
            expand="md" 
            fixed="top">
            <Container>
                <NavLink to="/">
                    <Navbar.Brand>
                        <img src={logo} alt="logo" height="45"/>
                        KitRate
                    </Navbar.Brand>
                </NavLink>
                {currentUser && addProductIcon}
                <Navbar.Toggle 
                    ref={ref} 
                    onClick={() => setExpanded(!expanded)}
                    aria-controls="basic-navbar-nav" 
                />
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