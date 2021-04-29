import ws from 'ws'
import { Server, IncomingMessage } from 'http'
import passport from 'passport'
import * as net from 'net'
import { getCookies, Cookies } from '../utils.js'
import { UserInfo } from '../routes/user/UserTypes'

type OnlineUsers = {
    [key: string]: ws
}

export const onlineUsers: OnlineUsers = {}

type IncMessWCookies = IncomingMessage & {
    cookies: Cookies
}

export const websocketServer = (server: Server) => {
    const socketServer = new ws.Server({
        noServer: true
    })

    socketServer.on('connection', (socket: ws, req: IncMessWCookies, user: UserInfo) => {
        console.log('user connected', user)
        onlineUsers[user.id.toHexString()] = socket

        socket.on('message', (msg) => {
            console.log('received message', msg)
        })
    })

    server.on('upgrade', (req: IncMessWCookies, socket: net.Socket, head) => {
        req.cookies = getCookies(req.headers.cookie)
        passport.authenticate('jwt', (err, user: UserInfo) => {
            if (!user) {
                socket.write('HTTP/1.1 491 Unauthorized\r\n\r\n')
                socket.destroy()
                return
            }

            socketServer.handleUpgrade(req, socket, head, (doneSocket) => {
                console.log('emiting connection event')
                socketServer.emit('connection', doneSocket, req, user)
            })
        })(req)
    })
}