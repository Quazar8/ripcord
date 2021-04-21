import React from 'react'
import { Link } from 'react-router-dom'

const DefaultLinks = () => {
    return (
        <div className = "default-links-container">
            <Link to = "/login">
                Sign In
            </Link>
            <Link to = "/register">
                Sign Up
            </Link>
        </div>
    )
}

export default DefaultLinks