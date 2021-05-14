import { Error } from 'mongoose'
import passport from 'passport'
import passportJWT, { StrategyOptions } from 'passport-jwt'
import { User } from './db/models/user.js'
import { jwtKey, jwtCookieName } from './configVars.js'
import { Request } from 'express'
import { UserDoc } from './types/UserTypes.js'

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
        User.findOne({ _id: payload.id }, (err: Error, user: UserDoc) => {
            if (err) return done(err, false)

            if (user) {
                // const reqUser: UserInfo = {
                //     id: user._id,
                //     username: user.username,
                //     registeredAt: user.registeredAt,
                //     friendsIds: user.friendsIds,
                //     incFriendRequests: user.incFriendRequests,
                //     outFriendRequests: user.outFriendRequests,
                //     channelIds: user.channelIds
                // }

                return done(null, user)
            }
            else return done(null, false)
        })
    }))
}

export default configurePassport

