import { Request, Response } from 'express'
import { errorResponse, successResponse } from '../../responses.js'

const loginHandler = (req: Request, res: Response): void => {
    res.status(200).send(successResponse(null, 'Reached login endpoint'))
}

export default loginHandler