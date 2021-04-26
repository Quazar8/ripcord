import React from 'react'

type Props = {
    toggleFriendsWindowFn: () => void
}

const ChatMenuButtons = (props: Props) => {
    return (
        <div className = "chat-menu-buttons-container">
            <button onClick = { props.toggleFriendsWindowFn }>Friends (Not Implemented)</button>
        </div>
    )
}

export default ChatMenuButtons