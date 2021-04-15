import { Error } from 'mongoose'
import passport from 'passport'
import passportJWT, { StrategyOptions } from 'passport-jwt'
import { IUserDoc, User } from './db/models/models.js'
import { UserInfo } from './routes/user/userTypes'
import { jwtKey, jwtCookieName } from './global-vars.js'
import { Request } from 'express'

const { Strategy, ExtractJwt } = passportJWT

const cookieExtractor: passportJWT.JwtFromRequestFunction = (req: Request): string => {
    if (req && req.cookies) {
        return req.cookies[jwtCookieName]
    }

    return null
}

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: jwtKey,
}

const configurePassport = (): void => {
    passport.use(new Strategy(opts, (payload, done) => {
        User.findOne({ _id: payload.id }, (err: Error, user: IUserDoc) => {
            if (err) return done(err, false)

            if (user) {
                const reqUser: UserInfo = {
                    username: user.username,
                    registeredAt: user.registeredAt
                }

                return done(null, reqUser)
            }
            else return done(null, false)
        })
    }))
}

export default configurePassport

