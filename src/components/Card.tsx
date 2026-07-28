import { cn } from '@/lib/utils'
import { HTMLAttributes, forwardRef } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated'
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-white border border-gray-200',
      outlined: 'bg-white border-2 border-gray-300',
      elevated: 'bg-white border border-gray-200 shadow-md'
    }
    
    return (
      <div
        ref={ref}
        className={cn('rounded-lg', variants[variant], className)}
        {...props}
      />
    )
  }
)

Card.displayName = 'Card'

export default Card
