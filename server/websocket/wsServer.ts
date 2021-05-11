import ws from 'ws'
import { Server, IncomingMessage } from 'http'
import passport from 'passport'
import * as net from 'net'
import { getCookies, Cookies } from '../utils.js'
import { UserInfo } from '../types/UserTypes'
import { onlineUsers } from './onlineUsers.js'
import { IUserDoc } from '../db/models/user.js'

type IncMessWCookies = IncomingMessage & {
    cookies: Cookies
}

export const websocketServer = (server: Server) => {
    const socketServer = new ws.Server({
        noServer: true
    })

    socketServer.on('connection', (socket: ws, req: IncMessWCookies, user: IUserDoc) => {
        console.log('user connected', user)
        onlineUsers[user._id] = socket

        socket.on('message', (msg) => {
            console.log('received message', msg)
        })

        socket.onclose = (ev) => {
            console.log(`connection with ${user.username} is closed`)
            delete onlineUsers[user._id]
        }
    })

    server.on('upgrade', (req: IncMessWCookies, socket: net.Socket, head) => {
        req.cookies = getCookies(req.headers.cookie)
        passport.authenticate('jwt', (err, user: IUserDoc) => {
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