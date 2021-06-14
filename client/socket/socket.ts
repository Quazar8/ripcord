import { Dispatch } from 'react'
import { pushNotification } from '../store/globalActions'
import { AppAction } from '../store/store'
import { WSDataType, WSMessage } from '../../server/types/WebsocketTypes'
import { addActiveChannelAction, incrementActiveChannelNewMsgAction, pushReceivedMsgAction, sentMsgResponseAction } from '../store/chat/chatActions'
import { addIncFriendRequestAction, incrementPendingNotif } from '../store/friends/friendsActions'
import { ActiveChannelInfo, ChatMessagePayload, ChatReceiverPayload } from '../../server/types/ChatTypes'
import { ClientActiveChannel } from '../types/ChatClientTypes'

export let socket: WebSocket = null

const handleNewActiveChannel = (dispatch: Dispatch<AppAction>, activeCh: ActiveChannelInfo) => {
    const clientActiveCh: ClientActiveChannel = {
        ...activeCh,
        newMsgs: 1
    }

    dispatch(addActiveChannelAction(clientActiveCh))
}

const handleChatMsgReceived = (dispatch: Dispatch<AppAction>, msg: ChatReceiverPayload) => {
    dispatch(pushReceivedMsgAction(msg))
    dispatch(incrementActiveChannelNewMsgAction(msg.channelId))
}

const handleMessage = (dataStr: string, dispatch: Dispatch<AppAction>) => {
    const data: WSMessage<any> = JSON.parse(dataStr)

    switch (data.type) {
        case WSDataType.FRIEND_REQUEST:
            dispatch(addIncFriendRequestAction(data.payload)); break;
        case WSDataType.CHAT_MESSAGE_STATUS:
            dispatch(sentMsgResponseAction(data.payload)); break;
        case WSDataType.CLIENT_RECEIVED_MSG:
            handleChatMsgReceived(dispatch, data.payload); break;
        case WSDataType.NEW_ACTIVE_CHANNEL:
            handleNewActiveChannel(dispatch, data.payload); break;
        default: break;
    }
}

export const establishWS = (dispatch: Dispatch<AppAction>) => {
    if (socket !== null && socket.readyState === socket.OPEN) {
        return
    }

    const dispNotification = pushNotification(dispatch)

    socket = new WebSocket('ws://localhost:8000')

    socket.onopen = (ev) => {
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