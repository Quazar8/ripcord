import { Request, Response } from "express"
import passport from 'passport'
import { errorResponse, ServerResponse, successResponse } from "../../responses.js"
import { UserInfo } from "../../types/UserTypes.js"

export type UserFromTokenResponse = ServerResponse<UserInfo>

export const userInfoFromToken = (req: Request, res: Response) => {
    passport.authenticate('jwt', (err, user: UserInfo) => {
        let response: UserFromTokenResponse = null
        let status: number = 200

        if (err) {
            response = errorResponse('Error authenticating user')
            res.status(500).send(response)
            return
        } 

        if (user) {
            response = successResponse(user, '')
        } else {
            response = successResponse(null, '')
        }

        res.status(status).send(response)
    })(req, res)
}