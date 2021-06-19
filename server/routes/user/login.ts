import { Request, Response } from 'express'
import { User } from '../../db/models/user.js'
import { errorResponse, ServerResponse, successResponse } from '../../responses.js'
import { UserClientInfo, LoginEntry, UserDoc } from '../../types/UserTypes'
import jwt from 'jsonwebtoken'
import { jwtKey, jwtCookieName } from '../../configVars.js'

export type LoginResponse = ServerResponse<UserClientInfo>

export const loginUser = (req: Request, res: Response, user: UserDoc) => {
    const userToLog = {
        id: user._id,
        username: user.username,
        registeredAt: user.registeredAt,
    }

    req.logIn(userToLog, { session: false }, (err) => {
        if (err) {
            res.status(500).send(errorResponse('Error logging you in'))
            return
        }

        const token = jwt.sign(userToLog, jwtKey)
        const tokenExpiration = new Date()
        tokenExpiration.setDate(tokenExpiration.getDate() + 30)

        res.cookie( jwtCookieName, token, {
            expires: tokenExpiration,
            sameSite: 'strict'
        })

        res.cookie('test', 'test token', {
            sameSite: 'lax'
        })

        const response: LoginResponse = successResponse({
            username: user.username,
            id: user._id.toHexString(),
            incFriendRequests: user.incFriendRequests,
            activeChannels: user.activeChannels,
            profilePic: user.profilePic
        }, 'Logged in')

        res.status(200).send(response)
    })
}

const loginHandler = (req: Request, res: Response): void => {
    const { username, password }: LoginEntry = req.body

    if (!username || !password) {
        res.status(400).send(errorResponse('Missing username or password'))
        return
    }

    User.findOne({ username }).then((user: UserDoc) => {
        if (!user || user.password !== password) {
            res.status(400).send(errorResponse('Incorrect username or password'))
            return
        }

        loginUser(req, res, user)
    })
}

export default loginHandler