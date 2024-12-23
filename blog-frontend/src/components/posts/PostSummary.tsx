interface PostSummaryProps {
    content: string
    className?: string
}

const PostSummary = ({ content, className = '' }: PostSummaryProps) => {
    const classes = ['prose dark:prose-invert', className].filter(Boolean).join(' ')
    
    return (
        <div className={classes}>
            <h3 className="text-lg font-semibold mb-2">Summary</h3>
            <p className="text-muted-foreground">{content}</p>
        </div>
    )
}

export { PostSummary }