import React from 'react'
import { Link } from 'react-router-dom'

const Logo = () => {
    return (
        <div className = "logo-container">
            <Link to = "/">
                Ripcord
            </Link>
        </div>
    )
}

export default Logo