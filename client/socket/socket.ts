import { pushNotification } from '../store/globalActions'

export let socket: WebSocket = null

export const establishWS = (dispNotification: ReturnType<typeof pushNotification>) => {
    if (socket !== null && socket.readyState === socket.OPEN) {
        return
    }

    socket = new WebSocket('ws://localhost:8000')

    socket.onopen = (ev) => {
        console.log('socket connection is opened')
    }

    socket.onerror = (ev) => {
        console.log('Error connecting socket')
        dispNotification('error', 'Error connecting to the chat service')
        setTimeout(() => {
            establishWS(dispNotification)
        }, 2000)
    }

    socket.onmessage = (msg) => {
        console.log('received message', msg.data)
    }
}