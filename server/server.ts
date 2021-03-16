import express from 'express'

const app = express()
const PORT = 8000

app.get('/', (req, res) => {
    res.send('hello frome xpress')
})

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})