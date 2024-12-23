import { useState, useEffect } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { PenSquare, ChevronRight } from 'lucide-react'
import { postsApi } from '../api/posts'
import { useAuth } from '../context/AuthContext'

interface Post {
    _id: string
    title: string
    content: string
    summary?: string
    createdAt: string
    author: {
        _id: string
        name: string
    }
}

const Home = () => {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()
    const { user } = useAuth()

    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = async () => {
        try {
            const response = await postsApi.getPosts()
            setPosts(response.data)
            setError(null)
        } catch (error) {
            console.error('Failed to fetch posts:', error)
            setError(error instanceof Error ? error.message : 'Failed to fetch posts')
        } finally {
            setLoading(false)
        }
    }

    const handleEdit = (post: Post) => {
        navigate(`/edit/${post._id}`)
    }

    const handleDelete = async (post: Post) => {
        if (!window.confirm('Are you sure you want to delete this post?')) {
            return
        }

        try {
            await postsApi.deletePost(post._id)
            await fetchPosts()
        } catch (error) {
            console.error('Failed to delete post:', error)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="h-8 w-8 animate-spin">
                    <div className="h-full w-full rounded-full border-4 border-primary border-r-transparent" />
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-destructive mb-2">Error</h2>
                    <p className="text-muted-foreground">{error}</p>
                </div>
            </div>
        )
    }

    if (!posts.length) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <div className="relative mb-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-600/20 blur-3xl" />
                    <div className="relative bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-8 rounded-2xl border shadow-lg">
                        <PenSquare className="w-12 h-12 mb-4 text-primary mx-auto" />
                        <h2 className="text-2xl font-bold mb-2">No posts yet</h2>
                        <p className="text-muted-foreground mb-6 max-w-md">
                            Get started by creating your first blog post. Share your thoughts, ideas, and stories with the world.
                        </p>
                        <button
                            onClick={() => navigate('/create')}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                        >
                            <PenSquare className="w-4 h-4" />
                            Create Post
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container py-8 px-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-white">Blog Posts</h1>
                {user && (
                    <Link
                        to="/create"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                    >
                        <PenSquare className="w-5 h-5" />
                        Create Post
                    </Link>
                )}
            </div>

            <div className="space-y-4 max-w-3xl">
                {posts.map((post) => (
                    <div 
                        key={post._id} 
                        className="bg-[#0F1319] border border-white/10 rounded-lg p-6"
                    >
                        <div className="space-y-3">
                            <Link to={`/post/${post._id}`}>
                                <h2 className="text-xl font-semibold text-white hover:text-white/90">
                                    {post.title}
                                </h2>
                            </Link>
                            
                            <div className="flex items-center text-sm text-white/60">
                                <span>By {post.author.name}</span>
                                <span className="mx-2">•</span>
                                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                            </div>

                            <p className="text-white/80 text-sm">
                                {post.content}
                            </p>

                            <div className="flex items-center">
                            
                                
                                {user && user.id === post.author._id && (
                                    <div className="ml-auto flex gap-2">
                                        <Link
                                            to={`/edit/${post._id}`}
                                            className="text-sm text-white/60 hover:text-white"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(post)}
                                            className="text-sm text-red-500 hover:text-red-400"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile Create Post Button */}
            {user && (
                <div className="fixed bottom-6 right-6 md:hidden">
                    <Link
                        to="/create"
                        className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all"
                    >
                        <PenSquare className="w-6 h-6" />
                    </Link>
                </div>
            )}
        </div>
    )
}

export default Home