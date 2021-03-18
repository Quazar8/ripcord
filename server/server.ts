import express, { Application } from 'express'
import path from 'path'

import establishRouteEndpoints from './routes/routes.js'

const app: Application = express()
const PORT: number = 8000

app.use(express.static(path.join(path.dirname(''), '/build/client')))

establishRouteEndpoints(app)

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})