import ws from 'ws'
import {Server, IncomingMessage} from 'http'
import passport from 'passport'
import { getCookies, Cookies } from '../utils.js'

type IncMessWCookies = IncomingMessage & {
    cookies: Cookies
}

export const websocketServer = (server: Server) => {
    const socketServer = new ws.Server({
        server: server
    })

    socketServer.once('listening', () => {
        console.log('ws server is listening')
    })

    socketServer.on('connection', (socket, req: IncMessWCookies) => {
        console.log('ws cookie', req.headers.cookie)
        console.log('ws parsed cookie', getCookies(req.headers.cookie))
        req.cookies = getCookies(req.headers.cookie)
        passport.authenticate('jwt', (err, user) => {
            console.log('ws user', user)
        })(req)
        socket.on('message', (msg) => {
            console.log('received message', msg)
        })
    })
}