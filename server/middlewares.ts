import passport from 'passport'
import { Request, Response, NextFunction } from 'express'
import { errorResponse } from './responses.js'

export const isLogged = 
    (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', { session: false },(err, user) => {
        if (err) {
            res.status(500).send(errorResponse('Error authenticating user'))
            return
        }

        if (user) next(null)
        else {
            res.status(400).send('User doesn\'t exist')
        }
    })
}

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send(errorResponse('Something went wrong :|'))
}