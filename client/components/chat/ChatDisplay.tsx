import React, { useRef } from 'react'
import { ChatAppProps } from './ChatApp'

type Props = Pick<ChatAppProps, 'dispNotification' |
                  'recipientId'>

const ChatDisplay = (props: Props) => {
    if (!props.recipientId) return (
        <h2>No open conversations</h2>
    )

    const sendInputRef = useRef<HTMLInputElement>(null)
    
    const sendMsg = () => {
        props.dispNotification('info', 'Not implemented yet')
    }

    return (
        <section className = "chat-display">
            <div className = "chat-monitor"></div>
            <input ref = { sendInputRef } placeholder = "send a message" type = "text" />
            <button onClick = { sendMsg } >Send</button>
        </section>
    )
}

export default ChatDisplay