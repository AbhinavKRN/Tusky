import { Request, Response, NextFunction } from 'express'
import logger from '../utils/logger'

interface ResponseWithStartTime extends Response {
    startTime?: number
}

export const morganMiddleware = (req: Request, res: ResponseWithStartTime, next: NextFunction) => {
    res.startTime = Date.now()

    res.on('finish', () => {
        const duration = Date.now() - (res.startTime || 0)

        const { method, originalUrl } = req
        const { statusCode } = res
        
        const contentLength = res.get('content-length')
        const size = contentLength ? `${contentLength}b` : '-'

        const message = `${method} ${originalUrl} ${statusCode} ${size} - ${duration}ms`
        
        if (statusCode >= 400) {
            logger.error(message)
        } else {
            logger.http(message)
        }
    })

    next()
}