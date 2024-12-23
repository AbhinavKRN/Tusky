import { Button } from '../components/common/Button'

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
            <p className="text-muted-foreground mb-8">
                The page you're looking for doesn't exist or has been moved.
            </p>
            <Button onClick={() => window.location.href = '/'}>
                Return Home
            </Button>
        </div>
    )
}

export default NotFound