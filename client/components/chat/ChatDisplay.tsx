import React, { useRef, useEffect, KeyboardEvent } from 'react'
import { socket, socketIsClosed } from '../../socket/socket'
import { resHasError } from '../../api/utils'
import { getChannelInfo, getChannelInfoWId } from '../../api/chatApi'
import { ChatAppProps } from './ChatApp'

import { ChatMessagePayload, ChatMessageStatus } from '../../../server/types/ChatTypes'
import ChatMessage from './ChatMessage'
import { WSDataType, WSMessage } from '../../../server/types/WebsocketTypes'
import { ChatChannelInfoRes, ChatCHannelWIdRes } from '../../../server/types/ChatResponses'
import { PendingMsg } from '../../types/ChatClientTypes'

type Props = Pick<ChatAppProps, 'dispNotification'
        | 'recipientId' | 'user' | 'channelId'
        | 'updateChannelInfoFn' | 'channelInfo'
        | 'pushSentMsgToStoreFn'
        | 'markMsgAsFailedFn'
        | 'appendActiveChannelFn'>

const ChatDisplay = (props: Props) => {
    if (!props.recipientId && !props.channelId) 
        return (
            <h2>No open conversations</h2>
        )
    

    const messageInputRef = useRef<HTMLDivElement>(null)
    const chatMonitorRef = useRef<HTMLDivElement>()
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
        if (!info.channel || !content || !socket) {
            return
        }

        const payloadMsg: ChatMessagePayload = {
            content,
            channelId: info.channel.id,
            authorId: props.user.id,
            toId: info.recipient.id,
            temporaryId: info.channel.id + "_" + Date.now()
        }

        const msg: WSMessage<ChatMessagePayload> = {
            type: WSDataType.CHAT_MESSAGE,
            payload: payloadMsg
        }

        const pendingMsg: PendingMsg = {
            channelId: props.channelId,
            id: '',
            temporaryId: payloadMsg.temporaryId,
            status: ChatMessageStatus.PENDING,
            date: new Date(),
            authorId: payloadMsg.authorId,
            edited: false,
            content: payloadMsg.content
        }

        if (socketIsClosed()) {
            pendingMsg.status = ChatMessageStatus.FAILED
            props.pushSentMsgToStoreFn(pendingMsg)
        } else {
            props.pushSentMsgToStoreFn(pendingMsg)
            socket.send(JSON.stringify(msg))
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

    const messages = info.channel.messages.map((m, i) => {
        let authorname = info.recipient.username
        if (m.authorId !== info.recipient.id) {
            authorname = 'You' 
        }

        return (
            <ChatMessage 
                message = { m } 
                key = { i }
                authorName = { authorname }
            />
        )
    })

    return (
        <section className = "chat-display">
            <div className = "user-info">
                <h2>{ info.recipient.username }</h2>
                <h4>{ info.recipient.status }</h4>
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
                    ref = { messageInputRef }
                    onKeyDown = { handleInputKeyDown }
                >
                </div>
                <button onClick = { sendMsg }>
                    Send
                </button>
            </div>
        </section>
    )
}

export default ChatDisplay