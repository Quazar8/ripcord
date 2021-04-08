import { Error } from 'mongoose'
import passport from 'passport'
import passportJWT, { StrategyOptions } from 'passport-jwt'
import { IUserModel, User } from './db/models.js'
import { UserInfo } from './routes/user/userTypes'
import { jwtKey } from './global-vars.js'

const { Strategy, ExtractJwt } = passportJWT

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtKey,
}

const configurePassport = (): void => {
    passport.use(new Strategy(opts, (payload, done) => {
        User.findOne({ _id: payload.id }, (err: Error, user: IUserModel) => {
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

