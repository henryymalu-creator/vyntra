'use client'

import { ReactNode, Fragment } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DialogProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'premium'
}

export default function Dialog({ isOpen, onClose, children, size = 'md', variant = 'default' }: DialogProps) {
  if (!isOpen) return null

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  }

  const variants = {
    default: 'bg-white border-vyntra-border',
    premium: 'bg-white border-vyntra-brand/20 shadow-[0_10px_30px_rgba(15,31,61,0.06)]',
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Dialog */}
      <div
        className={cn(
          'relative w-full border rounded-2xl shadow-[0_10px_30px_rgba(15,31,61,0.06)] transition-all duration-300',
          'animate-in fade-in zoom-in-95 slide-in-from-bottom-4',
          variants[variant],
          sizes[size]
        )}
      >
        {children}
      </div>
    </div>
  )
}

export function DialogHeader({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('px-6 py-4 border-b border-vyntra-border', className)}>
      {children}
    </div>
  )
}

export function DialogTitle({ children, onClose }: { children: ReactNode; onClose?: () => void }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="text-xl font-bold text-ink">{children}</h2>
      {onClose && (
        <button
          onClick={onClose}
          className="p-2 hover:bg-vyntra-bg-main text-ink-muted hover:text-ink rounded-lg transition-all duration-200"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}

export function DialogContent({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('px-6 py-6', className)}>{children}</div>
}

export function DialogFooter({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('px-6 py-4 border-t border-vyntra-border flex items-center justify-end gap-3', className)}>
      {children}
    </div>
  )
}
