import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'

export interface IUser extends mongoose.Document {
    name: string
    email: string
    password: string
    comparePassword(candidatePassword: string): Promise<boolean>
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
}, {
    timestamps: true
})

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next()
    
    const salt = await bcryptjs.genSalt(10)
    this.password = await bcryptjs.hash(this.password, salt)
    next()
})

userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
    return bcryptjs.compare(candidatePassword, this.password)
}

export const User = mongoose.model<IUser>('User', userSchema)

export default User