    import jwt from 'jsonwebtoken'
    import bcryptjs from 'bcryptjs'
    import { User } from '../models/Users'
    import { config } from '../config/config'

    export class AuthService {
        async register(name: string, email: string, password: string) {
            const existingUser = await User.findOne({ email })
            if (existingUser) {
                throw new Error('User already exists')
            }

            const user = new User({ name, email, password })
            await user.save()

            const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
                expiresIn: config.jwtExpiresIn
            })

            return {
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            }
        }

        async login(email: string, password: string) {
            const user = await User.findOne({ email })
            if (!user) {
                throw new Error('Invalid credentials')
            }

            const isMatch = await user.comparePassword(password)
            if (!isMatch) {
                throw new Error('Invalid credentials')
            }

            const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
                expiresIn: config.jwtExpiresIn
            })

            return {
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            }
        }
    }
