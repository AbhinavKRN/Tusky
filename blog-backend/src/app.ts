import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import postRoutes from './routes/postRoutes'
import authRoutes from './routes/authRoutes'
import { errorHandler } from './middleware/errorHandler'
import { config } from './config/config'

const app = express()

app.use(cors({
    origin: config.clientUrl,
    credentials: true
}))

app.use(helmet())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)

app.use(errorHandler)

export default app