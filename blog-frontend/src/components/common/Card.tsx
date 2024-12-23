import { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

const Card = ({ className = '', children, ...props }: CardProps) => {
    const baseStyle = 'rounded-lg border bg-card text-card-foreground shadow-sm'
    const classes = [baseStyle, className].filter(Boolean).join(' ')

    return (
        <div className={classes} {...props}>
            {children}
        </div>
    )
}

export { Card }