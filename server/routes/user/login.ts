import { Request, Response } from 'express'
import { User, IUserDoc } from '../../db/models.js'
import { errorResponse, successResponse } from '../../responses.js'

const loginHandler = (req: Request, res: Response): void => {
    const { username, password } = req.body

    if (!username || !password) {
        res.status(400).send(errorResponse('Missing username or password'))
        return
    }

    User.findOne({ username }).then((user: IUserDoc) => {
        if (!user || user.password !== password) {
            res.status(400).send(errorResponse('Incorrect user or password'))
            return
        }

        res.status(200).send(successResponse({ user }, 'Reached login endpoint'))
    })
}

export default loginHandler