import express from 'express'
import path from 'path'

const app = express()
const PORT = 8000

app.use(express.static(path.join(path.dirname(''), '/build/client')))

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})