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
            <div className = "user-info">
                <h2>Test name</h2>
                <h4>Test status</h4>
            </div>
            <div className = "chat-monitor"></div>
            <div className = "user-field">
                <div 
                    className = "user-input"
                    contentEditable
                >
                </div>
                <button>
                    Send
                </button>
            </div>
        </section>
    )
}

export default ChatDisplay