'use client'

import { ReactNode, ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  fullWidth?: boolean
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed gap-2'
  
  const variants = {
    primary: 'bg-vyntra-brand hover:bg-vyntra-structural text-white border border-transparent',
    secondary: 'bg-white hover:bg-slate-50 text-vyntra-text-main border border-vyntra-border',
    accent: 'bg-vyntra-warning text-vyntra-structural hover:bg-vyntra-warning/90 border border-transparent',
    outline: 'bg-transparent hover:bg-slate-50 border border-vyntra-border text-vyntra-text-main hover:border-vyntra-brand hover:text-vyntra-brand',
    ghost: 'bg-transparent hover:bg-slate-50 text-vyntra-text-muted hover:text-vyntra-text-main',
    danger: 'bg-vyntra-danger hover:bg-vyntra-danger/90 text-white border border-transparent',
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Cargando...
        </>
      ) : (
        children
      )}
    </button>
  )
}
