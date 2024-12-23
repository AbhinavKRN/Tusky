import { Loading } from '../common/Loading'
import { PostCard } from './PostCard'

interface Post {
    id: string
    title: string
    content: string
    summary?: string
    createdAt: string
}

interface PostListProps {
    posts: Post[]
    isLoading?: boolean
    onEdit?: (post: Post) => void
    onDelete?: (post: Post) => void
}

const PostList = ({ posts, isLoading, onEdit, onDelete }: PostListProps) => {
    if (isLoading) return <Loading />

    if (!posts.length) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground">No posts found</p>
            </div>
        )
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
                <PostCard
                    key={post.id}
                    post={post}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    )
}

export { PostList }