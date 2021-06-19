import React from 'react'

import NotifAttach from '../../others/notifications/NotifAttach'
import { ChatMenuProps } from './ChatMenu'

type Props = Pick<ChatMenuProps, 'toggleFriendsWindowFn'
    | 'friendNotifications'
    | 'clearFriendButtonNotifFn'>

const ChatMenuButtons = (props: Props) => {
    const handleFriendButtonClick = () => {
        props.toggleFriendsWindowFn()
        props.clearFriendButtonNotifFn()
    }


    return (
        <div className = "chat-menu-buttons-container">
            <div className = "button-container">
                <button onClick = { handleFriendButtonClick }>Friends (Not Implemented)</button>
                <NotifAttach amount = { props.friendNotifications } />
            </div>
        </div>
    )
}

export default ChatMenuButtons