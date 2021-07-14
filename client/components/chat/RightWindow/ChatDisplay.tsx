import React, { useRef, useEffect, KeyboardEvent, useState, useContext } from 'react'
import { sendSocketMessage, socketIsClosed } from '../../../socket/socket'
import { resHasError } from '../../../api/utils'
import { getChannelInfo, getChannelInfoWId } from '../../../api/chatApi'

import { ChatMessagePayload, ChatMessageStatus } from '../../../../server/types/ChatTypes'
import ChatMessage from './ChatMessage'
import { WSDataType, WSMessage } from '../../../../server/types/WebsocketTypes'
import { ChatChannelInfoRes, ChatCHannelWIdRes } from '../../../../server/types/ChatResponses'
import { PendingMsg } from '../../../types/ChatClientTypes'
import { RightWindowContext, RightWindowProps } from './RightWindow'
import ProfilePic from '../../user/ProfilePic'
import { getDateDiffInMin } from '../../../utils/utils'
import CallWindow from './call/CallWindow'
import { sendHangUpMsg, startCall } from './call/callHandler'
import ReceivingCallBlock from './call/ReceivingCallBlock'

export type ChatDisplayProps = Pick<RightWindowProps, 'dispNotification'
        | 'recipientId' | 'user' | 'channelId'
        | 'updateChannelInfoFn' | 'channelInfo'
        | 'pushSentMsgToStoreFn' | 'markMsgAsFailedFn'
        | 'appendActiveChannelFn' | 'activeChannels'
        | 'moveActiveChToTopFn' | 'callState'>

const ChatDisplay = (props: ChatDisplayProps) => {
    if (!props.recipientId && !props.channelId) 
        return (
            <h2 className = "no-conversations">No open conversations</h2>
        )

    const messageInputRef = useRef<HTMLDivElement>()
    const chatMonitorRef = useRef<HTMLDivElement>()
    const callButtonRef = useRef<HTMLButtonElement>()

    const [showCallWindow, setShowCallWindow] = useState(false)
    const context = useContext(RightWindowContext)

    const info = props.channelInfo

    const scrollMonitorToBottom = () => {
        const div = chatMonitorRef.current
        div.scrollTo(0, div.scrollHeight)
    }
    
    const fetchInfo = async () => {
        let res: ChatChannelInfoRes | ChatCHannelWIdRes;

        if (props.recipientId)
            res = await getChannelInfo(props.recipientId)
        else if (props.channelId)
            res = await getChannelInfoWId(props.channelId)

        if (resHasError(res)) {
            console.error(res.errorMsg)
            return
        }
        console.log('hcannel info fetch', res.data)
        props.updateChannelInfoFn(res.data)
    }

    useEffect(() => {
        fetchInfo().then(() => {
            scrollMonitorToBottom()
        })
    }, [props.recipientId, props.channelId])

    useEffect(() => {
        scrollMonitorToBottom()
    }, [props.channelInfo.channel.messages.length])
    
    const sendMsg = async () => {
        const content = messageInputRef.current.innerText
        if (!info.channel || !content || socketIsClosed()) {
            return
        }

        const channelId = info.channel.id

        const payloadMsg: ChatMessagePayload = {
            content,
            channelId,
            authorId: props.user.id,
            recipientId: info.recipient.id,
            temporaryId: channelId + "_" + Date.now()
        }

        const socketMsg: WSMessage<ChatMessagePayload> = {
            type: WSDataType.CHAT_MESSAGE,
            payload: payloadMsg
        }

        const pendingMsg: PendingMsg = {
            channelId: channelId,
            id: '',
            temporaryId: payloadMsg.temporaryId,
            status: ChatMessageStatus.PENDING,
            date: new Date(),
            authorId: payloadMsg.authorId,
            edited: false,
            content: payloadMsg.content.trim()
        }

        if (socketIsClosed()) {
            pendingMsg.status = ChatMessageStatus.FAILED
            props.pushSentMsgToStoreFn(pendingMsg)
        } else {
            props.pushSentMsgToStoreFn(pendingMsg)
            sendSocketMessage(socketMsg)

            setTimeout(() => {
                props.markMsgAsFailedFn(pendingMsg.temporaryId)
            }, 10000)
        }

        messageInputRef.current.innerText = ''
    }

    const handleInputKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            sendMsg()
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

    const messages = info.channel.messages.map((m, i) => {
        let authorname = info.recipient.username
        let authorPic = info.recipient.profilePic

        if (!m.authorId) {
            authorname = 'Ripcord System'
            authorPic = ''
        } else if (m.authorId !== info.recipient.id) {
            authorname = 'You'
            authorPic = props.user.profilePic
        }

        return (
            <ChatMessage 
                message = { m } 
                key = { i }
                authorName = { authorname }
                isNewBlock = { determineIFNewBlock(info.channel.messages, i) }
                authorPic = { authorPic }
            />
        )
    })

    const handleCallClick = () => {
        setShowCallWindow(true)
        startCall(props.channelInfo.recipient.id, callButtonRef.current)
    }

    const hangUpCall = () => {
        setShowCallWindow(false)
        sendHangUpMsg(props.callState.callInfo.otherUserId  , props.user.id)
        context.callFns.removeCallInfoStore()
    }

    return (
        <section className = "chat-display">
            <div className = "user-info">
                <ProfilePic picNameOrJson = { info.recipient.profilePic }/>
                <div className = "text-block">
                    <h2>{ info.recipient.username }</h2>
                    <h4>{ info.recipient.status }</h4>
                </div>
                <div className = "button-container">
                    <button 
                        ref = { callButtonRef }
                        onClick = { handleCallClick }
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
            {
                showCallWindow
                ? <CallWindow 
                    thisUserProfilePic = { props.user.profilePic }
                    remoteUserProfilePic = { props.channelInfo.recipient.profilePic }
                    hangUpCall = { hangUpCall }
                />
                : null
            }
            <div className = "user-field">
                <div 
                    className = "user-input"
                    contentEditable
                    ref = { messageInputRef }
                    onKeyDown = { handleInputKeyDown }
                >
                </div>
                <button onClick = { sendMsg }>
                    Send
                </button>
            </div>
            <ReceivingCallBlock 
                receivingCall = { props.callState.callInfo }
            />
        </section>
    )
}

export default ChatDisplay