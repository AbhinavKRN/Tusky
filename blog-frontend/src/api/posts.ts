import { API_BASE_URL } from './config'

interface CreatePostData {
    title: string
    content: string
}

interface PostResponse {
    success: boolean
    data: {
        _id: string
        title: string
        content: string
        author: {
            _id: string
            name: string
        }
        createdAt: string
        updatedAt: string
    }
}

interface PostsListResponse {
    success: boolean
    data: PostResponse['data'][]
}

export const postsApi = {
    createPost: async (postData: CreatePostData): Promise<PostResponse> => {
        const token = localStorage.getItem('token')
        if (!token) {
            throw new Error('Authentication required')
        }

        const response = await fetch(`${API_BASE_URL}/api/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(postData)
        })

        const data = await response.json()
        if (!data.success) {
            throw new Error(data.message || 'Failed to create post')
        }

        return data
    },

    getPosts: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/posts`)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data = await response.json()
            if (!data.success) {
                throw new Error(data.message || 'Failed to fetch posts')
            }
            return data
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to fetch posts: ${error.message}`)
            }
            throw new Error('Failed to fetch posts')
        }
    },

    getPost: async (id: string) => {
        try {
            const token = localStorage.getItem('token')
            const response = await fetch(`${API_BASE_URL}/api/posts/${id}`, {
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            })
            if (!response.ok) {
                throw new Error('Failed to fetch post')
            }
            return response.json()
        } catch (error) {
            throw error
        }
    },

    updatePost: async (id: string, updatedData: { title: string; content: string }) => {
        try {
            const token = localStorage.getItem('token')
            if (!token) {
                throw new Error('Authentication required')
            }

            const response = await fetch(`${API_BASE_URL}/api/posts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(updatedData)
            })

            if (!response.ok) {
                throw new Error('Failed to update post')
            }

            return response.json()
        } catch (error) {
            throw error
        }
    },

    deletePost: async (id: string): Promise<{ success: boolean, message: string }> => {
        const token = localStorage.getItem('token')
        if (!token) {
            throw new Error('Authentication required')
        }

        const response = await fetch(`${API_BASE_URL}/api/posts/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        const data = await response.json()
        if (!data.success) {
            throw new Error(data.message || 'Failed to delete post')
        }

        return data
    }
}