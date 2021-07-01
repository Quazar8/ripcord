import React from 'react'
import { ChatMessageStatus } from '../../../../server/types/ChatTypes'
import { PendingMsg } from '../../../types/ChatClientTypes'
import { getChatDateStr } from '../../../utils/utils'

type Props = {
    message: PendingMsg
    authorName: string
    isNewBlock: boolean
}

export const ChatMessage = ({ message, authorName, isNewBlock }: Props) => {
    const getAuxClassname = (message: PendingMsg) => {
        if (!message.authorId) {
            return "system-message"
        }

        if (message.status) {
            switch(message.status) {
                case ChatMessageStatus.PENDING: return 'pending'
                case ChatMessageStatus.FAILED: return 'failed'
                default: break;
            }
        }

        return ''
    }

    return (
        <div className = { "message" + " " + getAuxClassname(message) }>
            {
                isNewBlock
                ? <h4>{ authorName }:</h4>
                : null
            }
            <p>{ message.content }</p>
            <div className = "date">{ getChatDateStr(new Date(message.date)) }</div>
        </div>
    )
}

export default ChatMessage