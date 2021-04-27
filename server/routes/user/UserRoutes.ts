import { Application } from 'express'

import { authenticateUser } from '../../middlewares.js'
import loginHandler from './login.js'
import registerHandler from './register.js'
import { userInfoFromToken } from './userInfo.js'
import { logoutHandler } from './logout.js'
import { findFriend } from './findUser.js'

const enableUserRoutes = (app: Application) => {
    app.post('/user/login', loginHandler)

    app.post('/user/register', registerHandler)

    app.get('/user/loggedUserInfo', userInfoFromToken)

    app.get('/user/logout', authenticateUser, logoutHandler)

    app.get('/user/find/friend', authenticateUser, findFriend)
}

export default enableUserRoutes