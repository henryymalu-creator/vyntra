import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combine Tailwind classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format date to Spanish locale
 */
export function formatDate(date: Date | string, format: 'short' | 'long' = 'short'): string {
  const d = typeof date === 'string' ? new Date(date) : date
  
  if (format === 'long') {
    return d.toLocaleDateString('es-EC', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }
  
  return d.toLocaleDateString('es-EC', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

/**
 * Get last digit from plate
 */
export function getLastDigitFromPlate(plate: string): number {
  const cleaned = plate.replace(/[^0-9]/g, '')
  return cleaned.length > 0 ? parseInt(cleaned[cleaned.length - 1]) : 0
}

/**
 * Validate Ecuador vehicle plate format
 */
export function isValidPlate(plate: string): boolean {
  // Formats: ABC-1234 or ABC1234, and IK-578A or IK578A
  const regex = /^([A-Z]{3}-?\d{3,4}|[A-Z]{2}-?\d{3}[A-Z])$/i
  return regex.test(plate.toUpperCase())
}

/**
 * Format plate to standard format
 */
export function formatPlate(plate: string): string {
  const cleaned = plate.toUpperCase().replace(/[^A-Z0-9]/g, '')
  const prefixMatch = cleaned.match(/^[A-Z]{2,3}/)
  if (prefixMatch) {
    const prefix = prefixMatch[0]
    const rest = cleaned.slice(prefix.length)
    if (rest.length >= 3) {
      return `${prefix}-${rest}`
    }
  }
  return cleaned
}

/**
 * Get pico y placa status for today
 */
export function getPicoPlacaToday(lastDigit: number): {
  restricted: boolean
  day: string
  hours: string
} {
  const today = new Date().getDay() // 0 = Sunday, 1 = Monday, etc.
  
  const picoPlacaSchedule: { [key: number]: number[] } = {
    1: [1, 2], // Monday
    2: [3, 4], // Tuesday
    3: [5, 6], // Wednesday
    4: [7, 8], // Thursday
    5: [9, 0], // Friday
  }
  
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
  
  const restricted = 
    today >= 1 && 
    today <= 5 && 
    picoPlacaSchedule[today]?.includes(lastDigit)
  
  return {
    restricted,
    day: days[today],
    hours: '06:00 - 09:30 y 16:00 - 21:00',
  }
}

/**
 * Calculate days until next matricula (Calendario 2026 corregido)
 */
export function getDaysUntilMatricula(lastDigit: number): number {
  const currentYear = 2026 // Año de referencia
  const currentMonth = new Date().getMonth()
  const currentDate = new Date()
  
  // Matricula schedule by last digit - CORREGIDO PARA 2026
  // Enero es opcional para placa 1, por eso comienza en Febrero
  const matriculaMonth: { [key: number]: number } = {
    1: 1,  // Febrero
    2: 2,  // Marzo
    3: 3,  // Abril
    4: 4,  // Mayo
    5: 5,  // Junio
    6: 6,  // Julio
    7: 7,  // Agosto
    8: 8,  // Septiembre
    9: 9,  // Octubre
    0: 10, // Noviembre
  }
  
  const targetMonth = matriculaMonth[lastDigit]
  
  if (targetMonth === undefined) {
    return 0
  }
  
  let targetDate = new Date(currentYear, targetMonth, 1)
  
  // If the month has passed, set for next year
  if (currentMonth > targetMonth || (currentMonth === targetMonth && currentDate.getDate() > 28)) {
    targetDate = new Date(currentYear + 1, targetMonth, 1)
  }
  
  const diffTime = targetDate.getTime() - currentDate.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  return Math.max(0, diffDays)
}

/**
 * Format currency to USD
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-EC', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}
