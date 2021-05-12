import React, { useRef, useEffect, useState, KeyboardEvent } from 'react'
import { resHasError } from '../../api/utils'
import { getChannelInfo } from '../../api/chatApi'
import { ChatAppProps } from './ChatApp'
import { ChannelClientInfo, RecipientInfo } from '../../../server/types/ChatTypes'

import ChatMessage from './ChatMessage'

type Props = Pick<ChatAppProps, 'dispNotification' |
                  'recipientId'>

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
            username: ''
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
        console.log(messageInputRef.current.innerText)
        props.dispNotification('info', 'Not implemented yet')
    }

    const handleInputKeyPress = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            sendMsg()
        }
    }

    const messages = info.channel.messages.map((m, i) => (
        <ChatMessage message = { m } key = { i } />
    ))

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
                    onKeyPress = { handleInputKeyPress }
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