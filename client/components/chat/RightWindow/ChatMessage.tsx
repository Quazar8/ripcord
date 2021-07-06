import React from 'react'
import { ChatMessageStatus } from '../../../../server/types/ChatTypes'
import { PendingMsg } from '../../../types/ChatClientTypes'
import { getChatDateStr } from '../../../utils/utils'
import LogoSvg from '../../svgs/LogoSvg'
import ProfilePic from '../../user/ProfilePic'

type Props = {
    message: PendingMsg
    authorName: string
    isNewBlock: boolean
    authorPic: string
}

export const ChatMessage = ({ message, authorName, isNewBlock, authorPic }: Props) => {
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

    const getProfileComponent = (message: PendingMsg, authorPic: string, needsPic: boolean) => {
        if (!message.authorId) return (
            <div className = "logo-svg-container">
                <LogoSvg />
            </div>
        )

        if (!needsPic) return null

        return <ProfilePic picNameOrJson = { authorPic } />
    }

    return (
        <div className = { "message" + " " + getAuxClassname(message) }>
            <div className = "left-section">
                {
                   getProfileComponent(message, authorPic, isNewBlock)
                }
            </div>
            <div className = "middle-section">
                {
                    isNewBlock
                    ? <h4>{ authorName }:</h4>
                    : null
                }
                <p>{ message.content }</p>
            </div>
            <div className = "date">{ getChatDateStr(new Date(message.date)) }</div>
        </div>
    )
}

export default ChatMessage