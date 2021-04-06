import path from 'path'
import express, { Application } from 'express'
import webpack, { Configuration } from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from './webpack.config.js'

const initializeWebpack = (app: Application) => {
    const config: Configuration = {
        ...webpackConfig,
        mode: 'development'
    }

    const compiler = webpack(config)

    console.log('\x1b[35m%s\x1b[33m%s\x1b[0m','Environment: ', process.env.NODE_ENV)
    if (process.env.NODE_ENV?.trim() === 'development') {
        app.use(webpackDevMiddleware(compiler, {
            publicPath: '/'
        }))

        app.use(webpackHotMiddleware(compiler))
    } else {
        compiler.run((err, stats) => {
            if (err || stats.hasErrors()) {
                console.log('Error compiling webpack')
            } else {
                console.log('Webpack compiled')
            }
        })

        app.use(express.static(path.join(path.dirname(''), '/build/client')))
    }
}

export default initializeWebpack