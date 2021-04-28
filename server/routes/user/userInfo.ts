import { Request, Response } from "express"
import passport from 'passport'
import { successResponse } from "../../responses.js"
import { UserInfo } from "./UserTypes.js"

export const userInfoFromToken = (req: Request, res: Response) => {
    passport.authenticate('jwt', (err, user: UserInfo) => {
        if (err) {
            return
        } 

        if (user) {
            res.status(200).send(successResponse(user, ''))
            return
        }

        res.status(200).send(successResponse({}, 'No user'))
    })(req, res)
}