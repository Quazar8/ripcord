import React, { FormEvent, useRef } from 'react'

// import { registerUser } from '../../api/userApi'

const RegisterForm = () => {
    const usernameRef = useRef<HTMLInputElement>()
    const passwordRef = useRef<HTMLInputElement>()

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        
        const data = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        }

        if (!data.username || !data.password) {
            return
        }
    }

    return (
        <form className = "user-form" onSubmit = { handleSubmit }>
            <label>
                Username:
                <input ref = { usernameRef } type = "text" />
            </label>
            <label>
                Password:
                <input ref = { passwordRef } type = "password" />
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