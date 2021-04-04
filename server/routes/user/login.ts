import { Request, Response } from 'express'
import { User, IUserDoc } from '../../db/models.js'
import { errorResponse, successResponse, SuccessResponseType } from '../../responses.js'
import { UserLoggedObj, LoginEntryObj } from './userTypes'
import jwt from 'jsonwebtoken'
import { jwtKey } from '../../global-vars.js'

const loginHandler = (req: Request, res: Response): void => {
    const { username, password }: LoginEntryObj = req.body

    if (!username || !password) {
        res.status(400).send(errorResponse('Missing username or password'))
        return
    }

    User.findOne({ username }).then((user: IUserDoc) => {
        if (!user || user.password !== password) {
            res.status(400).send(errorResponse('Incorrect user or password'))
            return
        }

        const userToLog = {
            id: user._id,
            username: user.username,
            registeredAt: user.registeredAt,
            loggingAt: Date.now()
        }

        req.logIn(userToLog, { session: false }, (err) => {
            if (err) {
                res.status(500).send(errorResponse('Error logging you in'))
                return
            }

            const token = jwt.sign(userToLog, jwtKey)
            res.cookie('token', token, {
                expires: new Date(Date.now() + 30*24*3600),
                secure: true
            })

            const responseObj: SuccessResponseType<UserLoggedObj>
                     = successResponse<UserLoggedObj>({
                username: user.username,
                registeredAt: user.registeredAt,
                token
            }, 'Logged in')

            res.status(200).send(responseObj)
        })
    })
}

export default loginHandler