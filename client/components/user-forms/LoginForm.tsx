import React from 'react'

const LoginForm = () => {
    return (
        <form>
            <h2>Sign In:</h2>
            <label>
                username:
                <input type = "text" />
            </label> 
            <label>
                Password:
                <input type = "password" />
            </label>
        </form>
    )
}

export default LoginForm