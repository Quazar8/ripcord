import express, { Application } from 'express'
import passport from 'passport'
import { connectToDb } from './db/db.js'
import configurePassport from './passport-config.js'
import { errorHandler } from './middlewares.js'
import initializeWebpack from './webpack/webpackInitialize.js'
import establishRouteEndpoints from './routes/routes.js'

const app: Application = express()
const PORT: number = 8000

connectToDb()

app.use(express.json())
app.use(passport.initialize())
configurePassport()
app.use(errorHandler)

initializeWebpack(app)

establishRouteEndpoints(app)

app.listen(PORT, () => {
    console.log('\x1b[33m%s\x1b[0m',`Server listening at http://localhost:${PORT}`)
})