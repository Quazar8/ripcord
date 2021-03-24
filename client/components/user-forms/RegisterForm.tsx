import React from 'react'

const RegisterForm = () => {
    return (
        <form className = "user-form">
            <label>
                Username:
                <input type = "text" />
            </label>
            <label>
                Password:
                <input type = "password" />
            </label>
            <label>
                Confirm Password:
                <input type = "password" />
            </label>
            <input type = "submit" value = "Register"/>
        </form>
    )
}

export default RegisterForm