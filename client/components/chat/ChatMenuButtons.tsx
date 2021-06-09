import React from 'react'

import NotifAttach from '../others/notifications/NotifAttach'
import { ChatMenuProps } from './ChatMenu'

type Props = Pick<ChatMenuProps, 'toggleFriendsWindowFn'
    | 'friendNotifications'>

const ChatMenuButtons = (props: Props) => {
    return (
        <div className = "chat-menu-buttons-container">
            <div className = "button-container">
                <button onClick = { props.toggleFriendsWindowFn }>Friends (Not Implemented)</button>
                <NotifAttach amount = { props.friendNotifications } />
            </div>
        </div>
    )
}

export default ChatMenuButtons