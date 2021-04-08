import passport from 'passport'
import { Request, Response, NextFunction } from 'express'
import { errorResponse, successResponse } from './responses.js'

export const authenticateUser = 
    (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err) {
            res.status(500).send(errorResponse('Error authenticating user'))
            return
        }

        if (user) {
            req.user = user
            next(null)
        }
        else {
            res.status(400).send(errorResponse('User doesn\'t exist'))
        }
    })(req, res, next)
}

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send(errorResponse('Something went wrong :|'))
}