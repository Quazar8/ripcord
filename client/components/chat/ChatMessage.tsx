import React from 'react'
import { MessageClient } from '../../../server/types/ChatTypes'

type Props = {
    message: MessageClient
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