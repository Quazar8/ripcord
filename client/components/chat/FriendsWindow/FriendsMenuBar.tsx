import React from 'react'
import { Subwindows } from './FriendsWindow'

import NotifAttach from '../../others/notifications/NotifAttach'

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
            <div className = "button-container">
                <NotifAttach 
                    amount = { 2 }
                />
                <button onClick = { showPending }>Pending</button>
            </div>
        </nav>
    )
}

export default FriendsMenuBar