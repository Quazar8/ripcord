import { Application, Request, Response } from 'express'
import path from 'path'
import enableUserRoutes from './user/UserRoutes.js'
import enableChatRoutes from './chat/ChatRoutes.js'
import enableUploadRoutes from './upload/UploadRoutes.js'
import { successResponse } from '../responses.js'
import { authenticateUser } from '../middlewares.js'
import { isDev } from '../utils.js'

const establishRouteEndpoints = (app: Application): void => {
    enableUserRoutes(app)

    enableChatRoutes(app)

    enableUploadRoutes(app)

    if (isDev()) {
        app.post('/test', authenticateUser, (req: Request, res: Response) => {
            res.send(successResponse({}, 'Test endpoint'))
        })
    }

    app.get('*', (req: Request, res: Response) => {
        res.sendFile(path.resolve('./build/client/index.html'))
    })
}

export default establishRouteEndpoints