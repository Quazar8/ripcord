import React from 'react'
import { ChatMessageStatus } from '../../../server/types/ChatTypes'
import { PendingMsg } from '../../types/ChatClientTypes'

type Props = {
    message: PendingMsg
    authorName: string
}

export const ChatMessage = ({ message, authorName }: Props) => {
    let auxClass = ''
    if (message.status) {
        if (message.status === ChatMessageStatus.PENDING) {
            auxClass = 'pending'
        } else if (message.status === ChatMessageStatus.FAILED) {
            auxClass = 'failed'
        }
    }

    return (
        <div className = { "message" + " " + auxClass }>
            <h4>{ authorName }:</h4>
            <p>{ message.content }</p>
            {
                message.status === ChatMessageStatus.FAILED
                ? <div className = "error"> Failed to deliver the message</div>
                : null
            }
        </div>
    )
}

export default ChatMessage