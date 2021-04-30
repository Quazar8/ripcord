import { pushNotification } from '../store/globalActions'

export let socket: WebSocket = null

export const establishWS = () => {
    if (socket !== null) {
        return
    }

    socket = new WebSocket('ws://localhost:8000')

    socket.onopen = (ev) => {
        console.log('socket connection is opened')
    }

    socket.onerror = (ev) => {
        console.log('Error connecting socket')
        // socket = establishWS()
    }

    socket.onmessage = (msg) => {
        console.log('received message', msg.data)
    }
}