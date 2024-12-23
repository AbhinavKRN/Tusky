import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {
    const navigate = useNavigate()
    const { login } = useAuth()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            await login(formData.email, formData.password)
            navigate('/')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container max-w-md mx-auto px-4 py-8">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold">Login</h1>
                <p className="text-muted-foreground mt-2">Welcome back to the blog</p>
            </div>

            {error && (
                <div className="bg-destructive/10 text-destructive rounded-lg p-4 mb-6">
                    {error}
                </div>
            )}

            <div className="bg-card rounded-lg border shadow-sm p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium">Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Password</label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full inline-flex items-center justify-center rounded-md bg-[#14b8a6] px-4 py-2 text-sm font-medium text-white hover:bg-[#14b8a6]/90"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>

                    <p className="text-center text-sm text-muted-foreground">
                        Don't have an account?{' '}
                        <a href="/register" className="text-primary hover:underline">
                            Sign up
                        </a>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login