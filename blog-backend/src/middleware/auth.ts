// src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { config } from '../config/config'
import { User } from '../models/Users'

interface JwtPayload {
    userId: string
}

// Extend Express Request type to include user
declare global {
    namespace Express {
        interface Request {
            user?: any
        }
    }
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token: string | undefined

        if (req.headers.authorization?.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]
        }

        if (!token) {
            return res.status(401).json({ message: 'Not authorized, no token' })
        }

        const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload
        const user = await User.findById(decoded.userId).select('-password')

        if (!user) {
            return res.status(401).json({ message: 'Not authorized, user not found' })
        }

        req.user = user
        next()
    } catch (error) {
        res.status(401).json({ message: 'Not authorized, token failed' })
    }
}