import React, { FormEvent, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { loginServer } from '../../api/userApi' 
import {  pushNotification, recordUserAction } from '../../store/globalActions'
import { resHasError } from '../../api/utils'
import { connect, MapDispatchFn } from '../../store/store'
import { UserState } from '../../store/globalReducer'
import { incrementPendingNotif } from '../../store/friends/friendsActions'


type DispProps = {
    pushNotification: ReturnType<typeof pushNotification>
    recordUser: (user: UserState) => void
    setPendingNotifsAmount: (amount: number) => void
}

const LoginFormView = ({ pushNotification, recordUser, setPendingNotifsAmount }: DispProps) => {
    const usernameRef = useRef<HTMLInputElement>()
    const passwordRef = useRef<HTMLInputElement>()

    const history = useHistory()

    const loginUser = async () => {
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
            if (resHasError(resp)) {
                pushNotification('error', resp.errorMsg)
            } else {
                recordUser(resp.data)
                setPendingNotifsAmount(resp.data.incFriendRequests.length)
                history.push('/')
                pushNotification('success', 'Logged in successfully')
            }
            
        } catch (err) {
            pushNotification('error', 'There has been an error trying ' +
                'to get response from the server')
        }

    }

    const submitForm = (e: FormEvent) => {
        e.preventDefault()
        loginUser()
    }

    return (
        <form 
            className = "user-form" 
            onSubmit = { submitForm }
            autoComplete = "off"
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
    pushNotification: pushNotification(dispatch),
    recordUser: (user: UserState) => {
        dispatch(recordUserAction(user))
    },
    setPendingNotifsAmount: (amount: number) => {
        dispatch(incrementPendingNotif(amount))
    }
})

const LoginForm = connect(null, mapDispatch)(LoginFormView)

export default LoginForm