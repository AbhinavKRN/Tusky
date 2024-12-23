import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import postRoutes from './routes/postRoutes'
import authRoutes from './routes/authRoutes'
import { errorHandler } from './middleware/errorHandler'

const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))

app.use(helmet())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)

app.use(errorHandler)

export default app