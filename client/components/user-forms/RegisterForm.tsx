import React from 'react'

const RegisterForm = () => {
    return (
        <form>
            <label>
                username:
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
        </form>
    )
}

export default RegisterForm