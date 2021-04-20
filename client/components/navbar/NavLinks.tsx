import React from 'react'
import { Link } from 'react-router-dom'
import { UserState } from '../../store/globalReducer'

type Props = {
    user: UserState
}

const NavLinks = ({ user }: Props) => {
    return (
        <div className = "nav-links-container">
            <Link to = "/login">
                Sign In
            </Link>
            <Link to = "/register">
                Sign Up
            </Link>
        </div>
    )
}

export default NavLinks