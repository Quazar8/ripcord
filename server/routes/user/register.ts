import { Request, Response } from 'express'

const registerHandler = (req: Request, res: Response): void => {
    res.status(200).send('user register endpoint')
}

export default registerHandler