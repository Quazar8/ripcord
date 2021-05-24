import { Dispatch } from 'react'
import { pushNotification, friendNotificationAction } from '../store/globalActions'
import { AppAction } from '../store/store'
import { WSDataType, WSMessage } from '../../server/types/WebsocketTypes'
import { pushReceivedMsgAction, sentMsgResponseAction } from '../store/chat/chatActions'

export let socket: WebSocket = null

const handleMessage = (dataStr: string, dispatch: Dispatch<AppAction>) => {
    const data: WSMessage<any> = JSON.parse(dataStr)

    switch (data.type) {
        case WSDataType.FRIEND_REQUEST:
            dispatch(friendNotificationAction()); break;
        case WSDataType.CHAT_MESSAGE_STATUS:
            dispatch(sentMsgResponseAction(data.payload)); break;
        case WSDataType.CLIENT_RECEIVED_MSG:
            dispatch(pushReceivedMsgAction(data.payload))
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