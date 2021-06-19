import React, { useContext } from 'react'
import { Subwindows } from './FriendsWindow'

import NotifAttach from '../../../others/notifications/NotifAttach'
import { RightWindowContext } from '../../RightWindow/RightWindow'

type Props = {
    showCertainSubwindow: (name: Subwindows) => void
}

const FriendsMenuBar = ({ showCertainSubwindow }: Props) => {
    const context = useContext(RightWindowContext)

    const showFriendsList = () => {
        showCertainSubwindow(Subwindows.FriendsList)
    }

    const showAddFriend = () => {
        showCertainSubwindow(Subwindows.AddFriend)
    }

    const showPending = () => {
        showCertainSubwindow(Subwindows.Pending)
        context.clearPendingButtonNotifFn()
    }

    return (
        <nav className = "friends-menu-bar">
            <button onClick = { showFriendsList }>Friends</button>
            <button onClick = { showAddFriend }>Add</button>
            <div className = "button-container">
                <NotifAttach 
                    amount = { context.pendingRequests }
                />
                <button onClick = { showPending }>Pending</button>
            </div>
        </nav>
    )
}

export default FriendsMenuBar