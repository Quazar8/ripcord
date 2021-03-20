import { Request, Response } from 'express'
import { errorResponse, successResponse } from '../../responses.js'

const registerHandler = (req: Request, res: Response): void => {
    const { username, password, confirmPassword } = req.body 
    if (!username || !password) {
        res.status(400).send(errorResponse('Missing username or password'))
        return
    }
    
    res.status(200).send(successResponse(null, 'Reached register endpoint'))
}

export default registerHandler