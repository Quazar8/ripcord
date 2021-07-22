import React, { MutableRefObject, KeyboardEvent, useRef, useEffect } from 'react'
import { PendingMsg } from '../../../types/ChatClientTypes'
import { getDateDiffInMin } from '../../../utils/utils'
import ProfilePic from '../../user/ProfilePic'
import ReceivingCallBlock from './callComponents/ReceivingCallBlock'
import { ChatDisplayProps } from './ChatDisplay'
import ChatMessage from './ChatMessage'

type Props = {
    channelInfo: ChatDisplayProps['channelInfo']
    callState: ChatDisplayProps['callState']
    user: ChatDisplayProps['user']
    channelId: ChatDisplayProps['channelId']
    recipientId: ChatDisplayProps['recipientId']
    callButtonRef: MutableRefObject<HTMLButtonElement>
    messageInputRef: MutableRefObject<HTMLDivElement>
    handleCallClick: () => void
    sendMsg: () => void
}

const Messenger = (props: Props) => {
    if (!props.recipientId && !props.channelId) {
        return (
            <h2 className = "no-conversations">No open conversations</h2>
        )
    }
    
    const chatMonitorRef = useRef<HTMLDivElement>()
    
    const scrollMonitorToBottom = () => {
        const div = chatMonitorRef.current
        div.scrollTo(0, div.scrollHeight)
    }
    
    const handleInputKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            props.sendMsg()
        }
    }

    const determineIFNewBlock = (messages: PendingMsg[], index: number) => {
        if (index < 1) return true
        
        const prevMsg = messages[index - 1]
        const currentMsg = messages[index]
        if (prevMsg.authorId !== currentMsg.authorId) return true

        const diffInMin = getDateDiffInMin(new Date(currentMsg.date), new Date(prevMsg.date))
        if (diffInMin >= 60) return true
        
        return false
    }
    
    const messages = props.channelInfo.channel.messages.map((m, i) => {
        let authorname = props.channelInfo.recipient.username
        let authorPic = props.channelInfo.recipient.profilePic

        if (!m.authorId) {
            authorname = 'Ripcord System'
            authorPic = ''
        } else if (m.authorId !== props.channelInfo.recipient.id) {
            authorname = 'You'
            authorPic = props.user.profilePic
        }

        return (
            <ChatMessage 
                message = { m } 
                key = { i }
                authorName = { authorname }
                isNewBlock = { determineIFNewBlock(props.channelInfo.channel.messages, i) }
                authorPic = { authorPic }
            />
        )
    })

    useEffect(() => {
        scrollMonitorToBottom()
    }, [props.channelInfo.channel.messages.length])

    return (
        <div className = "messenger">
            <div className = "user-info">
                <ProfilePic picNameOrJson = { props.channelInfo.recipient.profilePic }/>
                <div className = "text-block">
                    <h2>{ props.channelInfo.recipient.username }</h2>
                    <h4>{ props.channelInfo.recipient.status }</h4>
                </div>
                <div className = "button-container">
                    <button 
                        ref = { props.callButtonRef }
                        onClick = { props.handleCallClick }
                    >
                        &#9990;
                    </button>
                </div>
            </div>
            <div ref = { chatMonitorRef } className = "chat-monitor">
                { 
                    messages.length > 0
                    ? messages
                    : <h2>No chat history as of yet</h2>
                }
            </div>
            <div className = "user-field">
                <div 
                    className = "user-input"
                    contentEditable
                    ref = { props.messageInputRef }
                    onKeyDown = { handleInputKeyDown }
                >
                </div>
                <button onClick = { props.sendMsg }>
                    Send
                </button>
            </div>
            <ReceivingCallBlock 
                receivingCall = { props.callState.receivingCallInfo }
            />
        </div>
    )
}

export default Messenger