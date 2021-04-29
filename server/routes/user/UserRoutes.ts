import { Application } from 'express'

import { authenticateUser } from '../../middlewares.js'
import loginHandler from './login.js'
import registerHandler from './register.js'
import { userInfoFromToken } from './userInfo.js'
import { logoutHandler } from './logout.js'
import { addFriend } from './findUser.js'
import UserUrls from './UserUrls.js'


const enableUserRoutes = (app: Application) => {
    app.post(UserUrls.login, loginHandler)

    app.post(UserUrls.register, registerHandler)

    app.get(UserUrls.getLoggedUser, userInfoFromToken)

    app.get(UserUrls.logout, authenticateUser, logoutHandler)

    app.get(UserUrls.findFriend, authenticateUser, addFriend)
}

export default enableUserRoutes