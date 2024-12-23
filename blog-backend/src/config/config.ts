import dotenv from 'dotenv'

dotenv.config()

export const config = {
    port: process.env.PORT || 5000,
    mongodbUri: process.env.MONGODB_URI || 'your_mongodb_uri',
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
    nodeEnv: process.env.NODE_ENV || 'development',
    clientUrl: process.env.CLIENT_URL || 'http://localhost:5173' // Add this for CORS
}