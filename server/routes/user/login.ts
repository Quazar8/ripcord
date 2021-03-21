import { Request, Response } from 'express'
import { errorResponse, successResponse } from '../../responses.js'

const loginHandler = (req: Request, res: Response): void => {
    const { username, password } = req.body

    if (!username || !password) {
        res.status(400).send(errorResponse('Missing username or password'))
        return
    }

    res.status(200).send(successResponse(null, 'Reached login endpoint'))
}

export default loginHandler