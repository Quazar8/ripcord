import React from 'react'
import Logo from './Logo'
import NavLinks from './NavLinks'

const Navbar = () => {
    return (
        <nav className = "main-navbar">
            <Logo />
            <NavLinks />
        </nav>
    )
}

export default Navbar