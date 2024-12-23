import mongoose from 'mongoose'

export interface IPost extends mongoose.Document {
    title: string
    content: string
    summary?: string
    author: mongoose.Types.ObjectId
}

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        trim: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

postSchema.index({ title: 'text', content: 'text' })

export const Post = mongoose.model<IPost>('Post', postSchema)