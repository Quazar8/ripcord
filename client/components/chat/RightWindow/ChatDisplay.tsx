import React, { useRef, useEffect, useContext } from 'react'
import { sendSocketMessage, socketIsClosed } from '../../../socket/socket'
import { resHasError } from '../../../api/utils'
import { getChannelInfo, getChannelInfoWId } from '../../../api/chatApi'

import { ChatMessagePayload, ChatMessageStatus } from '../../../../server/types/ChatTypes'
import { WSDataType, WSMessage } from '../../../../server/types/WebsocketTypes'
import { ChatChannelInfoRes, ChatCHannelWIdRes } from '../../../../server/types/ChatResponses'
import { PendingMsg } from '../../../types/ChatClientTypes'
import { RightWindowContext, RightWindowProps } from './RightWindow'
import CallWindow from './callComponents/CallWindow'
import { RTChangUpCall, startCall } from '../../../call/callClientHandler'
import Messenger from './Messenger'

export type ChatDisplayProps = Pick<RightWindowProps, 'dispNotification'
        | 'recipientId' | 'user' | 'channelId'
        | 'updateChannelInfoFn' | 'channelInfo'
        | 'pushSentMsgToStoreFn' | 'markMsgAsFailedFn'
        | 'appendActiveChannelFn' | 'activeChannels'
        | 'moveActiveChToTopFn' | 'callState'>

const ChatDisplay = (props: ChatDisplayProps) => {
    const messageInputRef = useRef<HTMLDivElement>()
    const callButtonRef = useRef<HTMLButtonElement>()
    const localVideoRef = useRef<HTMLVideoElement>()
    const remoteVideoRef = useRef<HTMLVideoElement>()

    const context = useContext(RightWindowContext)

    const fetchInfo = async () => {
        let res: ChatChannelInfoRes | ChatCHannelWIdRes = null

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
        if (props.recipientId || props.channelId) {
            fetchInfo()
        }
    }, [props.recipientId, props.channelId])

    const sendMsg = async () => {
        const content = messageInputRef.current.innerText
        if (!props.channelInfo.channel || !content || socketIsClosed()) {
            return
        }

        const channelId = props.channelInfo.channel.id

        const payloadMsg: ChatMessagePayload = {
            content,
            channelId,
            authorId: props.user.id,
            recipientId: props.channelInfo.recipient.id,
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

    const handleCallClick = () => {
        context.callFns.addCallInfo(props.channelInfo.recipient.id)
    }

    const snedCallDetalls = () => {
        const startCallArgs: Parameters<typeof startCall>[0] = {
            isVideoCall: false,
            thisUserId: props.user.id,
            otherUserId: props.channelInfo.recipient.id,
            otherVideoEl: remoteVideoRef.current,
            thisVideoEl: localVideoRef.current,
            callButtonEl: callButtonRef.current,
        }

        startCall(startCallArgs)
    }

    const hangUpCallWindow = () => {
        if (props.callState.callInfo) {
            RTChangUpCall(props.callState.callInfo.otherUserId, props.user.id)
            context.callFns.removeCallInfoStore()
        } 

        callButtonRef.current.disabled = false
    }

    return (
        <section className = "chat-display">
            <Messenger 
                channelInfo = { props.channelInfo }
                callState = { props.callState }
                user = { props.user }
                channelId = { props.channelId }
                recipientId = { props.recipientId }
                callButtonRef = { callButtonRef }
                messageInputRef = { messageInputRef }
                handleCallClick = { handleCallClick }
                sendMsg = { sendMsg }
            />
            {
                props.callState.callInfo
                ? <CallWindow 
                    thisUserProfilePic = { props.user.profilePic }
                    remoteUserProfilePic = { props.channelInfo.recipient.profilePic }
                    hangUpCall = { hangUpCallWindow }
                    sendCallDetails = { snedCallDetalls }
                    localVideoRef = { localVideoRef }
                    remoteVideoRef = { remoteVideoRef }
                    isVideoCall = { false }
                />
                : null
            }
        </section>
    )
}

export default ChatDisplay