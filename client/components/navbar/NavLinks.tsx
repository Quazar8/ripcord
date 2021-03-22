import React from 'react'
import { Link } from 'react-router-dom'

const NavLinks = () => {
    return (
        <div className = "nav-links-container">
            <Link to = "">
                Sign In
            </Link>
            <Link to = "">
                Sign Up
            </Link>
        </div>
    )
}

export default NavLinks