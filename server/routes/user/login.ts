import { Request, Response } from 'express'

const loginHandler = (req: Request, res: Response): void => {
    res.status(200).send('user login endpoint')
}

export default loginHandler