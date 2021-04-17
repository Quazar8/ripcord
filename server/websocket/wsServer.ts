import ws from 'ws'
import { Server, IncomingMessage } from 'http'
import passport from 'passport'
import * as net from 'net'
import { getCookies, Cookies } from '../utils.js'

type IncMessWCookies = IncomingMessage & {
    cookies: Cookies
}

export const websocketServer = (server: Server) => {
    const socketServer = new ws.Server({
        noServer: true
    })

    socketServer.once('listening', () => {
        console.log('ws server is listening')
    })

    socketServer.on('connection', (socket, req: IncMessWCookies) => {
      
        socket.on('message', (msg) => {
            console.log('received message', msg)
        })
    })

    server.on('upgrade', (req: IncMessWCookies, socket: net.Socket, head) => {
        console.log('ws cookie', req.headers.cookie)
        console.log('ws parsed cookie', getCookies(req.headers.cookie))
        req.cookies = getCookies(req.headers.cookie)
        passport.authenticate('jwt', (err, user) => {
            if (!user) {
                socket.write('HTTP/1.1 491 Unauthorized\r\n\r\n')
                socket.destroy()
                return
            }

            socketServer.handleUpgrade(req, socket, head, (doneSocket) => {
                console.log('emiting connection event')
                socketServer.emit('connection', doneSocket, req)
            })
        })(req)
    })
}