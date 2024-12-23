import { useState, FormEvent } from 'react'
import { Input } from '../common/Input'
import { Button } from '../common/Button'
import { Card } from '../common/Card'

interface PostFormData {
    title: string
    content: string
}

interface PostFormProps {
    initialData?: PostFormData
    onSubmit: (data: PostFormData) => void
    isLoading?: boolean
}

const PostForm = ({ initialData, onSubmit, isLoading }: PostFormProps) => {
    const [formData, setFormData] = useState<PostFormData>(
        initialData || { title: '', content: '' }
    )

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
    }

    return (
        <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    required
                />
                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        Content
                    </label>
                    <textarea
                        value={formData.content}
                        onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                        className="min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        required
                    />
                </div>
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save Post'}
                </Button>
            </form>
        </Card>
    )
}

export { PostForm }