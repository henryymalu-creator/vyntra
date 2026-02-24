'use client'

import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  variant?: 'default' | 'premium'
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-white border-vyntra-border text-ink placeholder-ink-muted',
      premium: 'bg-white border-vyntra-brand/20 text-ink placeholder-ink-muted shadow-sm',
    }

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-semibold text-ink mb-2">
            {label}
            {props.required && <span className="text-vyntra-danger ml-1">*</span>}
          </label>
        )}
        
        <input
          ref={ref}
          className={cn(
            'w-full px-4 py-3 rounded-xl border transition-all duration-300',
            'focus:outline-none focus:ring-2 focus:border-transparent',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            variants[variant],
            error && 'border-vyntra-danger focus:ring-vyntra-danger/50',
            !error && 'focus:ring-vyntra-brand/50 focus:shadow-[0_10px_30px_rgba(15,31,61,0.06)]',
            className
          )}
          {...props}
        />
        
        {error && (
          <p className="mt-2 text-sm text-vyntra-danger font-medium">{error}</p>
        )}
        
        {helperText && !error && (
          <p className="mt-2 text-sm text-ink-muted">{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
