import React from 'react'
import { Link } from 'react-router-dom'
import LogoSvg from '../svgs/LogoSvg'

const Logo = () => {
    return (
        <div className = "logo-container">
            <Link to = "/">
                <LogoSvg />
            </Link>
        </div>
    )
}

export default Logo