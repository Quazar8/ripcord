import { Request, Response } from "express";
import { successResponse, errorResponse } from '../../responses.js'
import { jwtCookieName } from '../../configVars.js'

export const logoutHandler = (req: Request, res: Response) => {
    if (req.user) {
        res.clearCookie(jwtCookieName)
        res.status(200).send(successResponse({}, 'User has logged out'))
        return
    }

    res.send(500).send(errorResponse('Error logging user out'))
}