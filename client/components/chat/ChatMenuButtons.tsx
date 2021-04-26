import React from 'react'

type Props = {
    showFriendsWindowFn: () => void
}

const ChatMenuButtons = (props: Props) => {
    return (
        <div className = "chat-menu-buttons-container">
            <button onClick = { props.showFriendsWindowFn }>Friends (Not Implemented)</button>
        </div>
    )
}

export default ChatMenuButtons