import React, { FormEvent, KeyboardEvent, useRef } from 'react'
import { loginServer } from '../../api/userApi' 
import { connect, MapDispatchFn } from '../../store/connect'
import {  pushNotification } from '../../store/globalActions'

type DispProps = {
    pushNotification: ReturnType<typeof pushNotification>
}

const LoginFormView = ({ pushNotification }: DispProps) => {
    const usernameRef = useRef<HTMLInputElement>()
    const passwordRef = useRef<HTMLInputElement>()

    const loginUser = async (e: FormEvent | null) => {
        e?.preventDefault()

        const data = {
            username: usernameRef.current.value.trim(),
            password: passwordRef.current.value.trim()
        }

        if (!data.username || !data.password) {
            pushNotification('error', 'Fields cannot be empty')
            return
        }

        try {
            const resp = await loginServer(data)
            
            if (resp.error) {
                pushNotification('error', resp.errorMsg)
            } else {
                pushNotification('success', 'Logged in successfully')
            }
        } catch (err) {
            pushNotification('error', 'There has been an error trying ' +
                'to get response from the server')
        }
     
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

const mapDispatch: MapDispatchFn<DispProps> = (dispatch) => ({
    pushNotification: pushNotification(dispatch)
})

const LoginForm = connect(null, mapDispatch)(LoginFormView)

export default LoginForm