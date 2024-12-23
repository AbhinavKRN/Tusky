import { Router } from 'express'
import { protect } from '../middleware/auth'
import { validate } from '../middleware/validate'
import { body } from 'express-validator'
import {
    createPost,
    getPosts,
    getPost,
    updatePost,
    deletePost
} from '../controllers/postController'

const router = Router()

router.post(
    '/',
    protect,
    validate([
        body('title').notEmpty().trim().withMessage('Title is required'),
        body('content').notEmpty().withMessage('Content is required')
    ]),
    createPost
)

router.get('/', getPosts)
router.get('/:id', getPost)

router.put(
    '/:id',
    protect,
    validate([
        body('title').optional().trim(),
        body('content').optional()
    ]),
    updatePost
)

router.delete('/:id', protect, deletePost)

export default router