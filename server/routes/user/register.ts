import { Request, Response } from 'express'
import { User, IUserModel } from '../../db/models.js'
import { errorResponse, successResponse } from '../../responses.js'

const registerHandler = (req: Request, res: Response): void => {
    const { username, password, confirmPassword } = req.body 
    if (!username || !password) {
        res.status(400).send(errorResponse('Missing username or password'))
        return
    }

    const saveUser = () => {
        const userCandiate: IUserModel = {
            username,
            password,
            registeredAt: new Date(Date.now())
        }

        const user = new User(userCandiate)
        user.save().then(() => {
            res.status(200).send(successResponse(null, 'User registered'))
        }).catch(err => {
            console.error(err)
            res.status(500).send(errorResponse('Error ocured registering the user'))
        })
    }

    User.findOne({ username }, (err, user) => {
        if (user) {
            res.status(400).send(errorResponse('User already exists'))
            return
        }

        saveUser()
    })
}

export default registerHandler