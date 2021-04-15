import ws from 'ws'
import { Server } from 'http'

export const websocketServer = (server: Server) => {
    const socketServer = new ws.Server({
        server: server
    })

    socketServer.once('listening', () => {
        console.log('ws server is listening')
    })

    socketServer.on('connection', (socket) => {
        socket.on('message', (msg) => {
            console.log('received message', msg)
        })
    })
}