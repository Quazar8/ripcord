import http from 'http'
import path from 'path'
import express, { Application } from 'express'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import { connectToDb } from './db/db.js'
import configurePassport from './passport-config.js'
import { errorHandler } from './middlewares.js'
import initializeWebpack from './webpack/webpackInitialize.js'
import establishRouteEndpoints from './routes/routes.js'
import { websocketServer } from './websocket/wsServer.js'
import { isDev } from './methods/utils.js'

if (!isDev()) {
    process.env.NODE_ENV = 'production'
}

const app: Application = express()
const PORT: number = 8000

connectToDb()

app.use(express.json())
app.use(cookieParser())
app.use(passport.initialize())
configurePassport()
app.use(errorHandler)
app.use('/static', express.static(path.resolve('./server/static')))

initializeWebpack(app)

establishRouteEndpoints(app)

const server = http.createServer(app)

websocketServer(server)

server.listen(PORT, () => {
    console.log('\x1b[33m%s\x1b[0m',`Server listening at http://localhost:${PORT}`)
})