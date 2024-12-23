import { Request, Response } from 'express'
import { AuthService } from '../services/authService'
import logger from '../utils/logger'

const authService = new AuthService()

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body
        const result = await authService.register(name, email, password)
        
        res.status(201).json({
            success: true,
            data: result
        })
    } catch (error) {
        logger.error('Registration error:', error)
        res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : 'Registration failed'
        })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const result = await authService.login(email, password)
        
        res.status(200).json({
            success: true,
            data: result
        })
    } catch (error) {
        logger.error('Login error:', error)
        res.status(401).json({
            success: false,
            message: error instanceof Error ? error.message : 'Authentication failed'
        })
    }
}