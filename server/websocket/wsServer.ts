import ws from 'ws'
import { Server } from 'http'
import passport from 'passport'

const cookieReader = () => {
    throw new Error('not incorporated')
}

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
            console.log('ws user', user)
        })(req)
        socket.on('message', (msg) => {
            console.log('received message', msg)
        })
    })
}