import { useState } from 'react'

interface UseAuthReturn {
    login: (email: string, password: string) => Promise<void>
    logout: () => void
    isLoading: boolean
    error: string | null
}

export const useAuthHook = (): UseAuthReturn => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const login = async (email: string, password: string) => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })
            if (!response.ok) throw new Error('Login failed')
            const data = await response.json()
            localStorage.setItem('token', data.token)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
    }

    return { login, logout, isLoading, error }
}
