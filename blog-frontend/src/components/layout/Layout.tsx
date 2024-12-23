import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'

export const Layout = ({ children }: { children: React.ReactNode }) => {
    const { user, logout } = useAuth()

    return (
        <div className="min-h-screen flex flex-col">
            <header className="border-b">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <Link to="/" className="text-xl font-bold">
                        Blog
                    </Link>
                    <div className="flex gap-4">
                        {user ? (
                            <button
                                onClick={logout}
                                className="inline-flex items-center justify-center rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90"
                            >
                                Logout
                            </button>
                        ) : (
                            <div className="flex gap-2">
                                <Link
                                    to="/login"
                                    className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="inline-flex items-center justify-center rounded-md border border-input px-4 py-2 text-sm font-medium hover:bg-accent"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </header>
            <main className="flex-1">
                {children}
            </main>
        </div>
    )
}

export default Layout