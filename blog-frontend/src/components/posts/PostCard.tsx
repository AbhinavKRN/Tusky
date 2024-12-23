import { Card } from '../common/Card'
import { Button } from '../common/Button'

interface Post {
    id: string
    title: string
    content: string
    summary?: string
    createdAt: string
}

interface PostCardProps {
    post: Post
    onEdit?: (post: Post) => void
    onDelete?: (post: Post) => void
}

const PostCard = ({ post, onEdit, onDelete }: PostCardProps) => {
    return (
        <Card className="overflow-hidden">
            <div className="p-6">
                <h2 className="text-2xl font-bold tracking-tight mb-2">{post.title}</h2>
                {post.summary && (
                    <p className="text-muted-foreground mb-4">{post.summary}</p>
                )}
                <div className="flex space-x-2">
                    <Button onClick={() => onEdit?.(post)} variant="secondary">
                        Edit
                    </Button>
                    <Button onClick={() => onDelete?.(post)} variant="destructive">
                        Delete
                    </Button>
                </div>
            </div>
        </Card>
    )
}

export { PostCard }