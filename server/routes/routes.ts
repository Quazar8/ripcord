import { Application, Request, Response } from 'express'
import path from 'path'
import enableUserRoutes from './user/UserRoutes.js'

const establishRouteEndpoints = (app: Application): void => {
    enableUserRoutes(app)

    app.get('*', (req: Request, res: Response) => {
        res.sendFile(path.resolve('./build/client/index.html'))
    })
}

export default establishRouteEndpoints