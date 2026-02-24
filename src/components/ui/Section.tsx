import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionProps {
  children: ReactNode
  className?: string
  variant?: "light" | "dark" | "gradient" | "glass"
  spacing?: "sm" | "md" | "lg"
  centered?: boolean
}

export default function Section({
  children,
  className,
  variant = "light",
  spacing = "lg",
  centered = true,
}: SectionProps) {
  const spacings = {
    sm: "py-12 px-4",
    md: "py-20 px-6",
    lg: "py-32 px-6",
  }

  const variants = {
    light: "bg-white",
    dark: "bg-gradient-to-br from-vyntra-dark to-slate-900 text-white",
    gradient: "bg-gradient-to-br from-vyntra-primary/5 via-white to-vyntra-accent/5",
    glass: "bg-white/50 backdrop-blur-xl border-t border-b border-white/20",
  }

  return (
    <section
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        spacings[spacing],
        variants[variant],
        className
      )}
    >
      <div className={cn(
        "relative z-10",
        "max-w-7xl mx-auto",
        centered && "flex flex-col items-center justify-center"
      )}>
        {children}
      </div>
    </section>
  )
}
