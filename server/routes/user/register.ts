import { Request, Response } from 'express'
import { errorResponse, successResponse } from '../../responses.js'

const registerHandler = (req: Request, res: Response): void => {
    res.status(200).send(successResponse(null, 'Reached register endpoint'))
}

export default registerHandler