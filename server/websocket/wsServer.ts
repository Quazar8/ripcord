import ws from 'ws'
import { Server, IncomingMessage } from 'http'
import passport from 'passport'
import * as net from 'net'
import { onlineUsers } from './onlineUsers.js'
import messageHandler from './messageHandler.js'
import { getCookies, Cookies } from '../utils.js'
import { WSMessage } from '../types/WebsocketTypes.js'
import { UserDoc } from '../types/UserTypes.js'

type IncMessWCookies = IncomingMessage & {
    cookies: Cookies
}

export const websocketServer = (server: Server) => {
    const socketServer = new ws.Server({
        noServer: true
    })

    socketServer.on('connection', (socket: ws, req: IncMessWCookies, user: UserDoc) => {
        console.log('user connected', user)
        onlineUsers[user._id.toHexString()] = socket

        socket.on('message', (msg: string) => {
            let json: WSMessage<any> = JSON.parse(msg)
            messageHandler(json, user)
        })

        socket.onclose = (ev) => {
            console.log(`connection with ${user.username} is closed`)
            delete onlineUsers[user._id.toHexString()]
        }
    })

    server.on('upgrade', (req: IncMessWCookies, socket: net.Socket, head) => {
        req.cookies = getCookies(req.headers.cookie)
        passport.authenticate('jwt', (err, user: UserDoc) => {
            if (!user) {
                socket.write('HTTP/1.1 491 Unauthorized\r\n\r\n')
                socket.destroy()
                return
            }

            socketServer.handleUpgrade(req, socket, head, (doneSocket) => {
                socketServer.emit('connection', doneSocket, req, user)
            })
        })(req)
    })
}