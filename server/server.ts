import express, { Application } from 'express'
import passport from 'passport'
import path from 'path'
import webpack, { Configuration } from 'webpack'
import webpackConfig from './webpack.config.js'
import { connectToDb } from './db/db.js'
import configurePassport from './passport-config.js'
import { errorHandler } from './middlewares.js'

import establishRouteEndpoints from './routes/routes.js'

const app: Application = express()
const PORT: number = 8000

connectToDb()


app.use(express.json())
app.use(passport.initialize())
app.use(express.static(path.join(path.dirname(''), '/build/client')))
app.use(errorHandler)

configurePassport()

establishRouteEndpoints(app)

const config: Configuration = {
    ...webpackConfig,
    mode: 'development'
}

webpack(config, (err, state) => {
    if (err || state.hasErrors()) {
        console.log('Error compiling webpack')
        return
    }

    console.log('Webpack compiled')
})


app.listen(PORT, () => {
    console.log('\x1b[33m%s\x1b[0m',`Server listening at http://localhost:${PORT}`)
})