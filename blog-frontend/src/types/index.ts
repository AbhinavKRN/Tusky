
export interface User {
    id: string
    name: string
    email: string
    createdAt: string
    updatedAt: string
}

export interface Post {
    id: string
    title: string
    content: string
    summary?: string
    author: User
    createdAt: string
    updatedAt: string
}

export interface Comment {
    id: string
    content: string
    author: User
    postId: string
    createdAt: string
    updatedAt: string
}

export interface LoginCredentials {
    email: string
    password: string
}

export interface RegisterData {
    name: string
    email: string
    password: string
}

export interface ApiResponse<T> {
    data: T
    message: string
    success: boolean
}

export interface PostFormData {
    title: string
    content: string
    summary?: string
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
    size?: 'default' | 'sm' | 'lg' | 'icon'
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}

export interface AuthContextType {
    user: User | null
    loading: boolean
    error: string | null
    login: (credentials: LoginCredentials) => Promise<void>
    logout: () => void
    register: (data: RegisterData) => Promise<void>
}

export interface ThemeContextType {
    isDark: boolean
    toggleTheme: () => void
}

export interface UsePostReturn {
    posts: Post[]
    loading: boolean
    error: string | null
    createPost: (data: PostFormData) => Promise<Post>
    updatePost: (id: string, data: PostFormData) => Promise<Post>
    deletePost: (id: string) => Promise<void>
    getPost: (id: string) => Promise<Post>
}

export interface UseAuthReturn {
    user: User | null
    loading: boolean
    error: string | null
    login: (credentials: LoginCredentials) => Promise<void>
    logout: () => void
    register: (data: RegisterData) => Promise<void>
}