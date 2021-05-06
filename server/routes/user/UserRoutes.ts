import { Application } from 'express'

import { authenticateUser } from '../../middlewares.js'
import loginHandler from './login.js'
import registerHandler from './register.js'
import { userInfoFromToken } from './userInfo.js'
import { logoutHandler } from './logout.js'
import { addFriend, onlineFriends, pendingFriendRequests } from './friends/friends.js'
import UserUrls from './UserUrls.js'

const enableUserRoutes = (app: Application) => {
    app.post(UserUrls.login, loginHandler)

    app.post(UserUrls.register, registerHandler)

    app.get(UserUrls.getLoggedUser, userInfoFromToken)

    app.get(UserUrls.logout, authenticateUser, logoutHandler)

    app.get(UserUrls.findFriend, authenticateUser, addFriend)

    app.get(UserUrls.onlineFriends, authenticateUser, onlineFriends)

    app.get(UserUrls.pendingFriendRequests, authenticateUser, pendingFriendRequests)
}

export default enableUserRoutes