import { Application } from 'express'

import { authenticateUser } from '../../middlewares.js'
import loginHandler from './login.js'
import registerHandler from './register.js'
import { userInfoFromToken } from './userInfo.js'
import { logoutHandler } from './logout.js'
import { addFriend, pendingFriendRequests, getFriends, unfriendUser } from './friends/friends.js'
import { acceptFriendRequest, declineRequest } from './friends/friendRequests.js'
import UserUrls from './UserUrls.js'

const enableUserRoutes = (app: Application) => {
    app.post(UserUrls.login, loginHandler)

    app.post(UserUrls.register, registerHandler)

    app.get(UserUrls.getLoggedUser, userInfoFromToken)

    app.get(UserUrls.logout, authenticateUser, logoutHandler)

    app.get(UserUrls.findFriend, authenticateUser, addFriend)

    app.get(UserUrls.pendingFriendRequests, authenticateUser, pendingFriendRequests)

    app.post(UserUrls.declineFriendRequest, authenticateUser, declineRequest)

    app.post(UserUrls.acceptFriendRequest, authenticateUser, acceptFriendRequest)

    app.get(UserUrls.getFriends, authenticateUser, getFriends)

    app.delete(UserUrls.unfriendUserFn(':userId'), authenticateUser, unfriendUser)
}

export default enableUserRoutes