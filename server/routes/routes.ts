import { Application, Request, Response } from 'express'

const establishRouteEndpoints = (app: Application): void => {
    app.post('/user/login', (req: Request, res: Response) => {
        res.status(200).send('user login endpoint')
    })
}

export default establishRouteEndpoints