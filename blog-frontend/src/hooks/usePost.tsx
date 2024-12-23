import { useState } from 'react'

interface Post {
    id: string
    title: string
    content: string
    summary?: string
}

interface UsePostReturn {
    createPost: (data: Omit<Post, 'id'>) => Promise<Post>
    updatePost: (id: string, data: Partial<Post>) => Promise<Post>
    deletePost: (id: string) => Promise<void>
    isLoading: boolean
    error: string | null
}

export const usePost = (): UsePostReturn => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const createPost = async (data: Omit<Post, 'id'>): Promise<Post> => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(data)
            })
            if (!response.ok) throw new Error('Failed to create post')
            return response.json()
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    const updatePost = async (id: string, data: Partial<Post>): Promise<Post> => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await fetch(`/api/posts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(data)
            })
            if (!response.ok) throw new Error('Failed to update post')
            return response.json()
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    const deletePost = async (id: string): Promise<void> => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await fetch(`/api/posts/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (!response.ok) throw new Error('Failed to delete post')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    return { createPost, updatePost, deletePost, isLoading, error }
}