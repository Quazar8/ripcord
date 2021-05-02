import { Dispatch } from 'react'
import { pushNotification } from '../store/globalActions'
import { AppAction } from '../store/store'

export let socket: WebSocket = null

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
    }
}