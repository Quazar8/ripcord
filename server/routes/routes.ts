import { Application } from 'express'

import enableUserRoutes from './user/UserRoutes.js'

const establishRouteEndpoints = (app: Application): void => {
    enableUserRoutes(app)
}

export default establishRouteEndpoints