import { Application } from 'express'

import loginHandler from './login.js'
import registerHandler from './register.js'

const enableUserRoutes = (app: Application) => {
    app.post('/user/login', loginHandler)

    app.post('/user/register', registerHandler)
}

export default enableUserRoutes