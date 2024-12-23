import { Request, Response } from 'express'
import { Post } from '../models/Post'
import logger from '../utils/logger'

export const createPost = async (req: Request, res: Response) => {
    try {
        const { title, content, summary } = req.body
        const authorId = req.user._id

        const post = new Post({
            title,
            content,
            summary,
            author: authorId
        })

        const savedPost = await post.save()
        const populatedPost = await Post.findById(savedPost._id).populate('author', 'name')

        logger.info('Post created successfully', { postId: savedPost._id })
        res.status(201).json({
            success: true,
            data: populatedPost
        })
    } catch (error) {
        logger.error('Error creating post:', error)
        res.status(500).json({
            success: false,
            message: 'Failed to create post'
        })
    }
}

export const getPosts = async (_req: Request, res: Response) => {
    try {
        const posts = await Post.find()
            .populate('author', 'name')
            .sort({ createdAt: -1 })
            .select('-__v')

        res.json({
            success: true,
            data: posts
        })
    } catch (error) {
        logger.error('Error fetching posts:', error)
        res.status(500).json({
            success: false,
            message: 'Failed to fetch posts'
        })
    }
}

export const getPost = async (req: Request, res: Response) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate('author', 'name')
            .select('-__v')

        if (!post) {
            logger.warn('Post not found', { postId: req.params.id })
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            })
        }

        res.json({
            success: true,
            data: post
        })
    } catch (error) {
        logger.error('Error fetching post:', error)
        res.status(500).json({
            success: false,
            message: 'Failed to fetch post'
        })
    }
}

export const updatePost = async (req: Request, res: Response) => {
    try {
        const { title, content } = req.body
        const postId = req.params.id

        const post = await Post.findById(postId)
        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            })
        }

        // Check if the user is the author of the post
        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to edit this post'
            })
        }

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { title, content },
            { new: true }
        ).populate('author', 'name')

        res.json({
            success: true,
            data: updatedPost
        })
    } catch (error) {
        console.error('Error updating post:', error)
        res.status(500).json({
            success: false,
            message: 'Failed to update post'
        })
    }
}


export const deletePost = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id
        const post = await Post.findById(postId)

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            })
        }

        await post.deleteOne()

        logger.info('Post deleted successfully', { postId })
        res.json({
            success: true,
            message: 'Post deleted successfully'
        })
    } catch (error) {
        logger.error('Error deleting post:', error)
        res.status(500).json({
            success: false,
            message: 'Failed to delete post'
        })
    }
}