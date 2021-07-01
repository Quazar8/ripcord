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
            <div className = "date">{ getChatDateStr(new Date(message.date)) }</div>
        </div>
    )
}

export default ChatMessage