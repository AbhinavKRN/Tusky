import dotenv from 'dotenv'

dotenv.config()

export const config = {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
    mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/blogdb',
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
    jwtExpiresIn: '1d',
    cors: {
        origin: process.env.CORS_ORIGIN || 'http://localhost:5173'
    }
}