import { Dispatch } from 'react'
import { pushNotification } from '../store/globalActions'
import { AppAction } from '../store/store'
import { CallAcceptedPayload, ReceivingCallPayload, WSDataType, WSMessage } from '../../server/types/WebsocketTypes'
import { addActiveChannelAction, incrementActiveChannelNewMsgAction, moveChannelToTopAction, pushReceivedMsgAction, receivingCallAction, sentMsgResponseAction } from '../store/chat/chatActions'
import { addIncFriendRequestAction } from '../store/friends/friendsActions'
import { ChatMessageStatusPayload, ChatReceiverPayload, NewActiveChannelPayload } from '../../server/types/ChatTypes'
import { triggerFrReqSound, triggerMsgSound } from '../tone/tone'
import { PendingFriendInfo } from '../../server/types/UserTypes'
import { handleIncAnswerCallDetails, RTCsetupAndCallOffer } from '../call/callClientHandler'

let socket: WebSocket = null

type SocketHandler<P> = (dispatch: Dispatch<AppAction>, msgPayload: P) => void

const handleNewActiveChannel: SocketHandler<NewActiveChannelPayload> = (dispatch, activeCh) => {
    dispatch(addActiveChannelAction(activeCh))
}

const handleChatMsgReceived: SocketHandler<ChatReceiverPayload> = (dispatch, msg) => {
    dispatch(pushReceivedMsgAction(msg))

    if (msg.newActiveChannel) {
        dispatch(addActiveChannelAction(msg.newActiveChannel))
    } else {
        dispatch(incrementActiveChannelNewMsgAction(msg.channelId))
        dispatch(moveChannelToTopAction(msg.channelId))
    }

    triggerMsgSound()
}

const handleChatMessageStatus: SocketHandler<ChatMessageStatusPayload> = (dispatch, payload) => {
    dispatch(sentMsgResponseAction(payload))

    if (payload.newActiveChannel) {
        dispatch(addActiveChannelAction(payload.newActiveChannel))
    } else {
        dispatch(moveChannelToTopAction(payload.channelId))
    }
}

const handleIncFriendRequest: SocketHandler<PendingFriendInfo> = (dispatch, pendingReq) => {
    dispatch(addIncFriendRequestAction(pendingReq))
    triggerFrReqSound()
}

const handleReceivingCall: SocketHandler<ReceivingCallPayload> = (dispatch, payload) => {
    dispatch(receivingCallAction(payload))
}

const handleAcceptedCall: SocketHandler<CallAcceptedPayload> = (_dispatch, msgPayload: CallAcceptedPayload) => {
    RTCsetupAndCallOffer(msgPayload)
}

const handleMessage = (dataStr: string, dispatch: Dispatch<AppAction>) => {
    const data: WSMessage<any> = JSON.parse(dataStr)

    switch (data.type) {
        case WSDataType.FRIEND_REQUEST:
            handleIncFriendRequest(dispatch, data.payload); break;
        case WSDataType.CHAT_MESSAGE_STATUS:
            handleChatMessageStatus(dispatch, data.payload); break;
        case WSDataType.CLIENT_RECEIVED_MSG:
            handleChatMsgReceived(dispatch, data.payload); break;
        case WSDataType.NEW_ACTIVE_CHANNEL:
            handleNewActiveChannel(dispatch, data.payload); break;
        case WSDataType.RECEIVING_CALL:
            handleReceivingCall(dispatch, data.payload); break;
        case WSDataType.CALL_ACCEPTED:
            handleAcceptedCall(dispatch, data.payload); break;
        case WSDataType.CALL_ANSWER_DETAILS:
            handleIncAnswerCallDetails(data.payload); break;
        default: break;
    }
}

export const establishWS = (dispatch: Dispatch<AppAction>) => {
    if (socket !== null && socket.readyState === socket.OPEN) {
        return
    }

    const dispNotification = pushNotification(dispatch)

    socket = new WebSocket('ws://localhost:8000')

    socket.onopen = (_ev) => {
        console.log('socket connection is opened')
    }

    socket.onerror = (ev) => {
        console.log('Error connecting socket')
        dispNotification('error', 'Error connecting to the chat service')
        setTimeout(() => {
            establishWS(dispatch)
        }, 2000)
    }

    socket.onmessage = (msg) => {
        console.log('received message', msg.data)
        handleMessage(msg.data, dispatch)
    }
}

export const socketIsClosed = (): boolean => {
    if (!socket) return true
    
    return socket.readyState === socket.CLOSED
}

export const closeSocketConnection = () => {
    socket.close()
}

export const sendSocketMessage = (msg: WSMessage<any>) => {
    socket.send(JSON.stringify(msg))
}