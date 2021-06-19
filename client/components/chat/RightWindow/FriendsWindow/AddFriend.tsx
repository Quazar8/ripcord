import React, { useRef, useState, FormEvent } from 'react'
import { resHasError } from '../../../../api/utils'
import { addFriend } from '../../../../api/userApi'
import { pushNotification } from '../../../../store/globalActions'

type Props = {
    dispNotification: ReturnType<typeof pushNotification>
}

const AddFriend = (props: Props) => {
    const findUserRef = useRef<HTMLInputElement>()
    const [notiificationMsg, setNotificationMsg] = useState('')

    const handleFindFriendSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const username = findUserRef.current.value
        if (!username) return

        const res = await addFriend(username)
        if (resHasError(res)) {
            props.dispNotification('error', res.errorMsg)
        } else if (res.data.sentRequest) {
            setNotificationMsg('Friend request sent')
        } else if (!res.data.found) {
            setNotificationMsg('No such user found')
        }
    }

    return (
        <div className = "add-friend">
            <form className = "add-friend-form" onSubmit = { handleFindFriendSubmit }>
                <input ref = { findUserRef } type = "search" placeholder = "Enter user's name"/>
                <input type = "submit" value = "Add User" />
            </form>
            {
                notiificationMsg 
                ? <div className = "notification">
                    { notiificationMsg }
                  </div>
                : null
            }
        </div>
    )
}

export default AddFriend
