import React from 'react'
import { Message } from '../../../server/types/ChatTypes'

type Props = {
    message: Message
    authorName: string
}

export const ChatMessage = ({ message, authorName }: Props) => {
    return (
        <div className = "message">
            <h4>{ authorName }:</h4>
            <p>{ message.content }</p>
        </div>
    )
}

export default ChatMessage