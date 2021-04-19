import { Application } from 'express'

import loginHandler from './login.js'
import registerHandler from './register.js'
import { userInfoFromToken } from './userInfo.js'

const enableUserRoutes = (app: Application) => {
    app.post('/user/login', loginHandler)

    app.post('/user/register', registerHandler)

    app.post('/user/fromToken', userInfoFromToken)
}

export default enableUserRoutes