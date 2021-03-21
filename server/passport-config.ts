import { Error } from 'mongoose'
import passport from 'passport'
import passportJWT, { StrategyOptions } from 'passport-jwt'
import { IUserModel, User, IUserDoc } from './db/models.js'

const { Strategy, ExtractJwt } = passportJWT

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret',
}

const configurePassport = (): void => {
    passport.use(new Strategy(opts, (payload, done) => {
        User.findOne({ _id: payload.sub }, (err: Error, user: IUserModel) => {
            if (err) return done(err, false)

            if (user) return done(null, user)
            else return done(null, false)
        })
    }))
}

export default configurePassport

