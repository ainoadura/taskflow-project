import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/v1/tasks', (req, res) => {
  res.json([])
})

export default app