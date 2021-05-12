import React from 'react'
import { Message } from '../../../server/types/ChatTypes'

type Props = {
    message: Message
}

export const ChatMessage = ({ message }: Props) => {
    return (
        <div className = "message">
            <h4>{ message.authorName }</h4>
            <p>{ message.content }</p>
        </div>
    )
}

export default ChatMessage