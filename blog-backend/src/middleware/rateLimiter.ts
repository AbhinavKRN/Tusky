import { Request, Response, NextFunction } from 'express'
import logger from '../utils/logger'

const requests = new Map<string, number[]>()
const WINDOW_MS = 15 * 60 * 1000  
const MAX_REQUESTS = 100          

export const limiter = (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.headers['x-forwarded-for']?.toString() || 'unknown'
    const now = Date.now()

    const currentRequests = requests.get(ip) || []
    const validRequests = currentRequests.filter(time => now - time < WINDOW_MS)

    if (validRequests.length >= MAX_REQUESTS) {
        logger.warn(`Rate limit exceeded for IP: ${ip}`)
        return res.status(429).json({
            message: 'Too many requests, please try again later.'
        })
    }

    validRequests.push(now)
    requests.set(ip, validRequests)

    res.setHeader('X-RateLimit-Limit', MAX_REQUESTS)
    res.setHeader('X-RateLimit-Remaining', MAX_REQUESTS - validRequests.length)
    res.setHeader('X-RateLimit-Reset', Math.ceil((now + WINDOW_MS) / 1000))

    next()
}