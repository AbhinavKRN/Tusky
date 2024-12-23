// pages/PostDetail.tsx
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card } from '../components/common/Card'
import { Loading } from '../components/common/Loading'

interface Post {
    id: string
    title: string
    content: string
    summary?: string
    createdAt: string
}

const PostDetail = () => {
    const { id } = useParams<{ id: string }>()
    const [post, setPost] = useState<Post | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (id) {
            fetchPost(id)
        }
    }, [id])

    const fetchPost = async (postId: string) => {
        try {
            const response = await fetch(`/api/posts/${postId}`)
            const data = await response.json()
            setPost(data)
        } catch (error) {
            console.error('Error fetching post:', error)
        } finally {
            setLoading(false)
        }
    }

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    if (loading) return <Loading />
    if (!post) return (
        <div className="text-center py-12">
            <p className="text-muted-foreground">Post not found</p>
        </div>
    )

    return (
        <div className="container py-8">
            <Card className="p-6">
                <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                <div className="text-sm text-muted-foreground mb-6">
                    {formatDate(post.createdAt)}
                </div>
                {post.summary && (
                    <div className="bg-muted/50 rounded-lg p-4 mb-6">
                        <h3 className="text-lg font-semibold mb-2">Summary</h3>
                        <p className="text-muted-foreground">{post.summary}</p>
                    </div>
                )}
                <div className="prose dark:prose-invert max-w-none">
                    {post.content}
                </div>
            </Card>
        </div>
    )
}

export default PostDetail