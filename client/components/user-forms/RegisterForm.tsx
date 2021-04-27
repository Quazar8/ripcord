import React, { FormEvent, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { connect, MapDispatchFn } from '../../store/store'
import { pushNotification, recordUserAction } from '../../store/globalActions'

import { registerUser } from '../../api/userApi'
import { resHasError } from '../../api/utils'
import { UserState } from '../../store/globalReducer'

type DispProps = {
    dispNotification: ReturnType<typeof pushNotification>
    recordUser: (user: UserState) => void
}

const RegisterFormView = (props: DispProps) => {
    const usernameRef = useRef<HTMLInputElement>()
    const passwordRef = useRef<HTMLInputElement>()

    const history = useHistory()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        
        const data = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        }

        if (!data.username || !data.password) {
            return
        }

        const res = await registerUser(data)
        if (resHasError(res)) {
            props.dispNotification('error', res.errorMsg)
        } else {
            props.dispNotification('success', 'Successfully registered')
            props.recordUser(res.data)
            history.push('/')
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

const mapDispatch: MapDispatchFn<DispProps> = (dispatch) => ({
    dispNotification: pushNotification(dispatch),
    recordUser: (user: UserState) => {
        dispatch(recordUserAction(user))
    }
})

const RegisterForm = connect(null, mapDispatch)(RegisterFormView)

export default RegisterForm