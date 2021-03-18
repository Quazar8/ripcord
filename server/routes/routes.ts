import { Application } from 'express'

import UserRoutes from './user/UserRoutes.js'

const establishRouteEndpoints = (app: Application): void => {
    app.post('/user/login', UserRoutes.loginHandler)
}

export default establishRouteEndpoints