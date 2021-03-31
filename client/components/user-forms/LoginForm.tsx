import React, { FormEvent, KeyboardEvent, useRef } from 'react'
import { loginServer } from '../../api/userApi' 
import { connect, MapDispatchFn } from '../../store/connect'
import { addNotification, Notification } from '../../store/globalActions'

const LoginFormView = () => {
    const usernameRef = useRef<HTMLInputElement>()
    const passwordRef = useRef<HTMLInputElement>()

    const loginUser = (e: FormEvent | null) => {
        e?.preventDefault()

        const data = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        }

        if (!data.username || !data.password) {
            return
        }

        loginServer(data).then(resp => {
            console.log(resp)
        })
    }

    const submitOnEnter = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            loginUser(null)
        }
    }

    return (
        <form 
            className = "user-form" 
            onSubmit = { loginUser }
            onKeyPress = { submitOnEnter }
        >
            <label>
                Username:
                <input ref = { usernameRef } type = "text" />
            </label> 
            <label>
                Password:
                <input ref = { passwordRef } type = "password" />
            </label>
            <input type = "submit" value = "Login"/>
        </form>
    )
}

const mapDispatch: MapDispatchFn = (dispatch) => ({
    pushNotification: (data: Notification) => {
        dispatch(addNotification(data))
    }
})

const LoginForm = connect(null, mapDispatch)(LoginFormView)

export default LoginForm