import React from 'react'
import { PendingMsg, PendingMsgStatus } from '../../types/ChatClientTypes'

type Props = {
    message: PendingMsg
    authorName: string
}

export const ChatMessage = ({ message, authorName }: Props) => {
    let auxClass = ''
    if (message.status) {
        if (message.status === PendingMsgStatus.Pending) {
            auxClass = 'pending'
        } else if (message.status === PendingMsgStatus.Failed) {
            auxClass = 'failed'
        }
    }

    return (
        <div className = { "message" + " " + auxClass }>
            <h4>{ authorName }:</h4>
            <p>{ message.content }</p>
        </div>
    )
}

export default ChatMessage