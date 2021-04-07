import { Application, Request, Response } from 'express'
import path from 'path'
import enableUserRoutes from './user/UserRoutes.js'
import { successResponse } from '../responses.js'
import { isDev } from '../utils.js'

const establishRouteEndpoints = (app: Application): void => {
    enableUserRoutes(app)

    if (isDev()) {
        app.post('/test', (req: Request, res: Response) => {
            res.send(successResponse({}, 'Test endpoint'))
        })
    }

    app.get('*', (req: Request, res: Response) => {
        res.sendFile(path.resolve('./build/client/index.html'))
    })
}

export default establishRouteEndpoints