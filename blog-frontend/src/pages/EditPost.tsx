import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { postsApi } from '../api/posts'
import { useAuth } from '../context/AuthContext'
import { PenSquare } from 'lucide-react'

const EditPost = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { user } = useAuth()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        title: '',
        content: ''
    })

    useEffect(() => {
        if (!user) {
            navigate('/login')
            return
        }
        fetchPost()
    }, [id, user])

    const fetchPost = async () => {
        try {
            if (!id) return
            const response = await postsApi.getPost(id)
            if (response.success) {
                setFormData({
                    title: response.data.title,
                    content: response.data.content
                })
            }
        } catch (error) {
            setError('Failed to fetch post')
            console.error('Error fetching post:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            if (!id) return
            await postsApi.updatePost(id, formData)
            navigate('/')
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to update post')
            console.error('Error updating post:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[80vh]">
                <div className="h-8 w-8 animate-spin">
                    <div className="h-full w-full rounded-full border-4 border-white border-r-transparent" />
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[80vh]">
                <div className="text-center text-white/60">
                    <p>Error: {error}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="container max-w-4xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-white">Edit Post</h1>
                    <p className="text-white/60 mt-2">Update your thoughts and ideas</p>
                </div>
                <div className="hidden md:block w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                    <PenSquare className="w-6 h-6 text-white/60" />
                </div>
            </div>

            <div className="bg-[#0F1319] rounded-xl border border-white/10 p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white">
                            Title
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                            placeholder="Enter post title..."
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white">
                            Content
                        </label>
                        <textarea
                            value={formData.content}
                            onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                            className="w-full min-h-[200px] px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                            placeholder="Write your post content..."
                            required
                        />
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-white text-black rounded-lg hover:bg-white/90"
                        >
                            {loading ? 'Updating...' : 'Update Post'}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditPost