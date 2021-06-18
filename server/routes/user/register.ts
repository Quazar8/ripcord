import { Request, Response } from 'express'
import { User, IUserModel } from '../../db/models/user.js'
import { errorResponse } from '../../responses.js'
import { UserDoc } from '../../types/UserTypes.js'
import { LoginResponse, loginUser } from './login.js'

export type RegisterResponse = LoginResponse

const registerHandler = (req: Request, res: Response): void => {
    const { username, password, confirmPassword } = req.body 
    if (!username || !password) {
        res.status(400).send(errorResponse('Missing username or password'))
        return
    }

    const saveUser = () => {
        const userCandidate: IUserModel = {
            username,
            password,
            registeredAt: new Date(),
            friendsIds: [],
            outFriendRequests: [],
            incFriendRequests: [],
            channels: {},
            activeChannels: [],
            profilePic: ''
        }

        const user = new User(userCandidate)
        user.save().then((user: UserDoc) => {
            loginUser(req, res, user)
        }).catch(err => {
            console.error(err)
            res.status(500).send(errorResponse('Error ocured registering the user'))
        })
    }

    User.findOne({ username }, (err: Error, user: UserDoc) => {
        if (err) {
            res.status(500).send(errorResponse('Something went wrong'))
            return
        }

        if (user) {
            res.status(400).send(errorResponse('User already exists'))
            return
        }

        saveUser()
    })
}

export default registerHandler