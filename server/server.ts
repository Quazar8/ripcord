import http from 'http'
import express, { Application } from 'express'
import passport from 'passport'
import * as SocketIO from 'socket.io'
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
const SIO = SocketIO.listen
console.log(SIO)

// io.onconnection((socket: SocketIO.Server) => {
//     console.log('socket connected')
// })

server.listen(PORT, () => {
    console.log('\x1b[33m%s\x1b[0m',`Server listening at http://localhost:${PORT}`)
})