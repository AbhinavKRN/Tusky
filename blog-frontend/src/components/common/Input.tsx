import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
}

const Input = ({ label, error, className = '', ...props }: InputProps) => {
    const baseStyle = 'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
    const classes = [baseStyle, className].filter(Boolean).join(' ')

    return (
        <div className="space-y-2">
            {label && (
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {label}
                </label>
            )}
            <input className={classes} {...props} />
            {error && (
                <p className="text-sm text-destructive">{error}</p>
            )}
        </div>
    )
}

export { Input }
