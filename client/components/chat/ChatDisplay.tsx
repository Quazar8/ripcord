import React, { useRef, useEffect, useState } from 'react'
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
    

    const sendInputRef = useRef<HTMLInputElement>(null)
    
    const sendMsg = () => {
        props.dispNotification('info', 'Not implemented yet')
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
                { messages }
            </div>
            <div className = "user-field">
                <div 
                    className = "user-input"
                    contentEditable
                >
                </div>
                <button>
                    Send
                </button>
            </div>
        </section>
    )
}

export default ChatDisplay