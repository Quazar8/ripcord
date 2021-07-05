import { Request, Response } from "express"
import passport from 'passport'
import { notifyFriendsUserOnline } from "../../methods/userMethods.js"
import { errorResponse, ServerResponse, successResponse } from "../../responses.js"
import { UserClientInfo, UserDoc } from "../../types/UserTypes.js"

export type UserFromTokenResponse = ServerResponse<UserClientInfo | null>

export const userInfoFromToken = (req: Request, res: Response) => {
    passport.authenticate('jwt', (err, user: UserDoc) => {
        let response: UserFromTokenResponse = null
        let status: number = 200

        if (err) {
            response = errorResponse('Error authenticating user')
            res.status(500).send(response)
            return
        } 

        if (user) {
            const userInfo: UserClientInfo = {
                id: user.id,
                activeChannels: user.activeChannels,
                username: user.username,
                incFriendRequests: user.incFriendRequests,
                profilePic: user.profilePic
            }

            response = successResponse(userInfo, '')
        } else {
            response = successResponse(null, '')
        }

        res.status(status).send(response)

        notifyFriendsUserOnline({
            id: user._id,
            friendsIds: user.friendsIds,
            onlineStatus: user.onlineStatus
        })
    })(req, res)
}