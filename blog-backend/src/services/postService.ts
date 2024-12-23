import { Post } from '../models/Post'

export class PostService {
    async createPost(userId: string, data: { title: string; content: string; summary?: string }) {
        const post = new Post({
            ...data,
            author: userId
        })
        await post.save()
        return post.populate('author', 'name email')
    }

    async getPosts() {
        return Post.find()
            .populate('author', 'name email')
            .sort({ createdAt: -1 })
    }

    async getPostById(id: string) {
        const post = await Post.findById(id).populate('author', 'name email')
        if (!post) {
            throw new Error('Post not found')
        }
        return post
    }

    async updatePost(id: string, userId: string, data: Partial<{ title: string; content: string; summary?: string }>) {
        const post = await Post.findById(id)
        if (!post) {
            throw new Error('Post not found')
        }

        if (post.author.toString() !== userId) {
            throw new Error('Not authorized')
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { ...data },
            { new: true }
        ).populate('author', 'name email')

        return updatedPost
    }

    async deletePost(id: string, userId: string) {
        const post = await Post.findById(id)
        if (!post) {
            throw new Error('Post not found')
        }

        if (post.author.toString() !== userId) {
            throw new Error('Not authorized')
        }

        await post.deleteOne()
    }
}