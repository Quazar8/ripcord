import React from 'react'
import { Subwindows } from './FriendsWindow'

type Props = {
    showCertainSubwindow: (name: Subwindows) => void
}

const FriendsMenuBar = ({ showCertainSubwindow }: Props) => {
    const showFriendsList = () => {
        showCertainSubwindow(Subwindows.FriendsList)
    }

    const showAddFriend = () => {
        showCertainSubwindow(Subwindows.AddFriend)
    }

    return (
        <nav className = "friends-menu-bar">
            <button onClick = { showFriendsList }>Friends</button>
            <button onClick = { showAddFriend }>Add</button>
        </nav>
    )
}

export default FriendsMenuBar