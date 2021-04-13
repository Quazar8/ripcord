import React from 'react'

const ChatDisplay = () => {
    return (
        <section className="chat-display">
            <div className="chat-monitor"></div>
            <input placeholder="send a message" type="text" />
            <button>Send</button>
        </section>
    )
}

export default ChatDisplay