'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  elevated?: boolean
  gradient?: boolean
  variant?: 'default' | 'premium' | 'dark'
}

export default function Card({ 
  children, 
  className, 
  hover = true, 
  elevated = true,
  variant = 'default' 
}: CardProps) {
  const baseStyles = 'rounded-2xl p-6 transition-all duration-200'
  
  const variants = {
    default: 'bg-white border border-vyntra-border shadow-[0_10px_30px_rgba(15,31,61,0.06)]',
    premium: 'bg-white border border-vyntra-border shadow-[0_10px_30px_rgba(15,31,61,0.08)]',
    dark: 'bg-white border border-vyntra-border shadow-[0_10px_30px_rgba(15,31,61,0.06)]',
  }

  return (
    <div
      className={cn(
        baseStyles,
        variants[variant],
        hover && 'hover:border-vyntra-brand/30',
        elevated && 'shadow-[0_10px_30px_rgba(15,31,61,0.06)]',
        className
      )}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('mb-4', className)}>{children}</div>
}

export function CardTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h3 className={cn('text-lg font-bold text-vyntra-text-main', className)}>{children}</h3>
}

export function CardDescription({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn('text-sm text-vyntra-text-muted', className)}>{children}</p>
}

export function CardContent({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn(className)}>{children}</div>
}

export function CardFooter({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('mt-6 pt-4 border-t border-vyntra-primary/10', className)}>{children}</div>
}

