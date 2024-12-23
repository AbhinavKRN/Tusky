import { createContext, useContext, useState, ReactNode } from 'react'
import { authApi } from '../api/auth'

interface User {
    id: string
    name: string
    email: string
}

interface AuthContextType {
    user: User | null
    login: (email: string, password: string) => Promise<void>
    register: (name: string, email: string, password: string) => Promise<void>
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)

    const login = async (email: string, password: string) => {
        try {
            const response = await authApi.login({ email, password })
            setUser(response.data.user)
            localStorage.setItem('token', response.data.token)
        } catch (error) {
            throw error
        }
    }

    const register = async (name: string, email: string, password: string) => {
        try {
            const response = await authApi.register({ name, email, password })
            setUser(response.data.user)
            localStorage.setItem('token', response.data.token)
        } catch (error) {
            throw error
        }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('token')
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}