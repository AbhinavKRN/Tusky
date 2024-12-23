import { Router } from 'express'
import { validate } from '../middleware/validate'
import { body } from 'express-validator'
import { login, register } from '../controllers/authController'

const router = Router()

router.post('/register', 
    validate([
        body('name').trim().notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    ]),
    register
)

router.post('/login',
    validate([
        body('email').isEmail().withMessage('Valid email is required'),
        body('password').notEmpty().withMessage('Password is required')
    ]),
    login
)

export default router