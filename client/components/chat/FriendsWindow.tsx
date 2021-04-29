import React, { FormEvent } from 'react'

const FriendsWindow = () => {
    const handleFindFriendSubmit = (e: FormEvent) => {
        e.preventDefault()
    }

    return (
        <div className = "friends-window">
            <form className = "add-friend-form" onSubmit = { handleFindFriendSubmit }>
                <input type = "search" />
                <input type = "submit" value = "Find user" />
            </form>
        </div>
    )
}

export default FriendsWindow