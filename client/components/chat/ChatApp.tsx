import React from 'react'

import ChatDisplay from './ChatDisplay'
import ChatMenu from './ChatMenu'

const ChatApp = () => {
    return (
        <section className = "chat-app">
            <ChatMenu />
            <ChatDisplay />
        </section>
    )
}

export default ChatApp