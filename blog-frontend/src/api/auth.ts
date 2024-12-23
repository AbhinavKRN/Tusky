import { API_BASE_URL } from './config'

interface LoginCredentials {
    email: string
    password: string
}

interface RegisterData {
    name: string
    email: string
    password: string
}

interface AuthResponse {
    success: boolean
    data: {
        token: string
        user: {
            id: string
            name: string
            email: string
        }
    }
}

export const authApi = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        
        const data = await response.json()
        if (!data.success) {
            throw new Error(data.message)
        }
        
        return data
    },

    register: async (userData: RegisterData): Promise<AuthResponse> => {
        const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        
        const data = await response.json()
        if (!data.success) {
            throw new Error(data.message)
        }
        
        return data
    }
}