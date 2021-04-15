import ws from 'ws'
import { Server } from 'http'
import passport from 'passport'

export const websocketServer = (server: Server) => {
    const socketServer = new ws.Server({
        server: server
    })

    socketServer.once('listening', () => {
        console.log('ws server is listening')
    })

    socketServer.on('connection', (socket, req) => {
        console.log('ws cookie', req.headers.cookie)
        passport.authenticate('jwt', (err, user) => {
            console.log('ws user', err)
        })(req)
        socket.on('message', (msg) => {
            console.log('received message', msg)
        })
    })
}