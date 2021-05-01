import React, { useRef, FormEvent } from 'react'
import { addFriend } from '../../api/userApi'
import { resHasError } from '../../api/utils'
import { pushNotification } from '../../store/globalActions'

type Props = {
    dispNotification: ReturnType<typeof pushNotification>
}

const FriendsWindow = (props: Props) => {
    const findUserRef = useRef<HTMLInputElement>()

    const handleFindFriendSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const username = findUserRef.current.value
        if (!username) return

        const res = await addFriend(username)
        if (resHasError(res)) {
            props.dispNotification('error', 'Error trying to add friend')
        }
    }

    return (
        <div className = "friends-window">
            <form className = "add-friend-form" onSubmit = { handleFindFriendSubmit }>
                <input ref = { findUserRef } type = "search" />
                <input type = "submit" value = "Add User" />
            </form>
        </div>
    )
}

export default FriendsWindow