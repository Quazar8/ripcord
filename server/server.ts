import http from 'http'
import express, { Application } from 'express'
import passport from 'passport'
import ws from 'ws'
import { connectToDb } from './db/db.js'
import configurePassport from './passport-config.js'
import { errorHandler } from './middlewares.js'
import initializeWebpack from './webpack/webpackInitialize.js'
import establishRouteEndpoints from './routes/routes.js'
import { isDev } from './utils.js'

if (!isDev()) {
    process.env.NODE_ENV = 'production'
}

const app: Application = express()
const PORT: number = 8000

connectToDb()

app.use(express.json())
app.use(passport.initialize())
configurePassport()
app.use(errorHandler)

initializeWebpack(app)

establishRouteEndpoints(app)

const server = http.createServer(app)

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

server.listen(PORT, () => {
    console.log('\x1b[33m%s\x1b[0m',`Server listening at http://localhost:${PORT}`)
})