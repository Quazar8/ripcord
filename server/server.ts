import express, { Application } from 'express'
import path from 'path'
import { connectToDb } from './db/db.js'

import establishRouteEndpoints from './routes/routes.js'

const app: Application = express()
const PORT: number = 8000

connectToDb()

app.use(express.static(path.join(path.dirname(''), '/build/client')))

establishRouteEndpoints(app)

app.listen(PORT, () => {
    console.log('\x1b[33m%s\x1b[0m',`Server listening at http://localhost:${PORT}`)
})