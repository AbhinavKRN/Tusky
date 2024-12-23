const Navbar = () => {
    return (
        <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
            <a
                href="/"
                className="text-sm font-medium transition-colors hover:text-primary"
            >
                Home
            </a>
            <a
                href="/create"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
                Create Post
            </a>
        </nav>
    )
}

export { Navbar }