import { Request, Response } from 'express'
import { User, IUserModel } from '../../db/models/user.js'
import { errorResponse } from '../../responses.js'
import { UserDoc } from '../../types/UserTypes.js'
import { genRandomNum } from '../../utils.js'
import { LoginResponse, loginUser } from './login.js'

export type RegisterResponse = LoginResponse

export type ProfilePicJson = {
    textColor: string,
    letters: string,
    background: string
}

export const genProfilePicColorJson = (username: string): ProfilePicJson => {
    const genHslStr = ({ hue, sat, light }: typeof background) => {
        return `hsl(${hue}, ${sat}%, ${light}%)`
    }

    const background = {
        hue: genRandomNum(0, 360),
        sat: genRandomNum(10, 90),
        light: genRandomNum(26, 65)
    }

    const color = {
        hue: (background.hue + genRandomNum(35, 325)) % 360,
        sat: genRandomNum(10, 90),
        light: genRandomNum(26, 65)
    }

    return {
        background: genHslStr(background),
        textColor: genHslStr(color),
        letters: username[0]
    }
}

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
            profilePic: JSON.stringify(genProfilePicColorJson(username))
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