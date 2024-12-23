import { body } from 'express-validator'

export const registerValidation = [
    body('name')
        .notEmpty()
        .trim()
        .withMessage('Name is required'),
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Valid email is required'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters')
]

export const loginValidation = [
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Valid email is required'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
]

export const postValidation = [
    body('title')
        .notEmpty()
        .trim()
        .withMessage('Title is required'),
    body('content')
        .notEmpty()
        .withMessage('Content is required'),
    body('summary')
        .optional()
        .trim()
]
