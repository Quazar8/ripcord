import { Request, Response } from 'express'
import { User } from '../../db/models/user.js'
import { errorResponse, ServerResponse, successResponse } from '../../responses.js'
import { UserClientInfo, LoginEntry, UserDoc, UserStatus } from '../../types/UserTypes'
import jwt from 'jsonwebtoken'
import { jwtKey, jwtCookieName } from '../../configVars.js'
import { Types } from 'mongoose'
import { StatusChangePayload, WSDataType, WSMessage } from '../../types/WebsocketTypes.js'
import { sendMultipleSocket } from '../../websocket/onlineUsers.js'

export type LoginResponse = ServerResponse<UserClientInfo>

export const loginUser = (req: Request, res: Response, user: UserDoc) => {
    const userToLog = {
        id: user._id,
        username: user.username,
        registeredAt: user.registeredAt,
    }

    const notifyFriendsUserOnline = (userInfo: Pick<UserDoc, 'id' | 'friendsIds' | 'onlineStatus'>) => {
        if (userInfo.friendsIds.length < 1) return

        const socketMsg: WSMessage<StatusChangePayload> = {
            type: WSDataType.FRIEND_STATUS_CHANGE,
            payload: {
                userId: userInfo.id,
                status: userInfo.onlineStatus
            }
        }

        sendMultipleSocket(userInfo.friendsIds, socketMsg)
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

        const response: LoginResponse = successResponse({
            username: user.username,
            id: user._id.toHexString(),
            incFriendRequests: user.incFriendRequests,
            activeChannels: user.activeChannels,
            profilePic: user.profilePic
        }, 'Logged in')

        res.status(200).send(response)
        notifyFriendsUserOnline({
            id: user._id,
            friendsIds: user.friendsIds,
            onlineStatus: user.onlineStatus
        })
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