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

    const showPending = () => {
        showCertainSubwindow(Subwindows.Pending)
    }

    return (
        <nav className = "friends-menu-bar">
            <button onClick = { showFriendsList }>Friends</button>
            <button onClick = { showAddFriend }>Add</button>
            <button onClick = { showPending }>Pending</button>
        </nav>
    )
}

export default FriendsMenuBar