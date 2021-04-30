import React from 'react'

import NotifAttach from '../others/notifications/NotifAttach'

type Props = {
    toggleFriendsWindowFn: () => void
}

const ChatMenuButtons = (props: Props) => {
    return (
        <div className = "chat-menu-buttons-container">
            <div className = "button-container">
                <button onClick = { props.toggleFriendsWindowFn }>Friends (Not Implemented)</button>
                <NotifAttach amount = { 2 } />
            </div>
        </div>
    )
}

export default ChatMenuButtons