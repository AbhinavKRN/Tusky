import app from './app'
import { config } from './config/config'
import logger from './utils/logger'
import { connectDB } from './config/database'

const PORT = config.port || 5000

const startServer = async () => {
    try {
        await connectDB()
        
        app.listen(PORT, () => {
            logger.info(`Server running on port ${PORT}`)
        })
    } catch (error) {
        logger.error('Failed to start server:', error)
        process.exit(1)
    }
}

startServer()