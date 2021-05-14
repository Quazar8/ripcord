import React, { useRef, useEffect, useState, KeyboardEvent } from 'react'
import { socket } from '../../socket/socket'
import { resHasError } from '../../api/utils'
import { getChannelInfo } from '../../api/chatApi'
import { ChatAppProps } from './ChatApp'

import { ChannelClientInfo, RecipientInfo, ChatMessagePayload } from '../../../server/types/ChatTypes'
import ChatMessage from './ChatMessage'
import { UserStatus } from '../../../server/types/UserTypes'
import { WSDataType, WSMessage } from '../../../server/types/WebsocketTypes'

type Props = Pick<ChatAppProps, 'dispNotification' |
                  'recipientId' | 'user'>

const ChatDisplay = (props: Props) => {
    if (!props.recipientId) return (
        <h2>No open conversations</h2>
    )

    const [info, setInfo] = useState<{
        recipient: RecipientInfo,
        channel: ChannelClientInfo
    }>({
        recipient: {
            id: null,
            username: '',
            status: UserStatus.Offline
        },
        channel: {
            id: null,
            messages: [],
            participantOne: null,
            participantTwo: null
        }
    })
    
    const fetchInfo = async () => {
        const res = await getChannelInfo(props.recipientId)
        if (resHasError(res)) {
            console.error(res.errorMsg)
            return
        }

        setInfo(res.data)
    }

    useEffect(() => {
        fetchInfo()
    }, [props.recipientId])
    

    const messageInputRef = useRef<HTMLDivElement>(null)
    
    const sendMsg = () => {
        const content = messageInputRef.current.innerText
        if (!info.channel || !content || !socket) {
            return
        }

        const msg: WSMessage<ChatMessagePayload> = {
            type: WSDataType.CHAT_MESSAGE,
            payload: {
                content,
                channelId: info.channel.id,
                authorId: props.user.id
            }
        }

        socket.send(JSON.stringify(msg))
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
                <h4></h4>
            </div>
            <div className = "chat-monitor">
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