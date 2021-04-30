import { pushNotification } from '../store/globalActions'

export let socket: WebSocket = null

export const establishWS = (dispNotification: ReturnType<typeof pushNotification>) => {
    if (socket !== null) {
        return
    }

    socket = new WebSocket('ws://localhost:8000')

    socket.onopen = (ev) => {
        console.log('socket connection is opened')
    }

        dispNotification('error', 'Error connecting to the chat service')
    socket.onerror = (ev) => {
        console.log('Error connecting socket')
        dispNotification('error', 'Error connecting to the chat service')
        // socket = establishWS()
    }

    socket.onmessage = (msg) => {
        console.log('received message', msg.data)
    }
}