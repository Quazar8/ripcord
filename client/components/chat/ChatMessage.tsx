import React from 'react'
import { ChatMessageStatus } from '../../../server/types/ChatTypes'
import { PendingMsg } from '../../types/ChatClientTypes'

type Props = {
    message: PendingMsg
    authorName: string
    isNewBlock: boolean
}

export const ChatMessage = ({ message, authorName, isNewBlock }: Props) => {
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
            {
                isNewBlock
                ? <h4>{ authorName }:</h4>
                : null
            }
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