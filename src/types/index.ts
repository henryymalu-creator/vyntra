// User Types
export interface User {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  createdAt: Date
}

// Vehicle Types
export interface Vehicle {
  id: string
  userId: string
  plate: string
  type: 'auto' | 'moto' | 'camioneta' | 'taxi' | 'otro'
  brand?: string
  model?: string
  year?: number
  color?: string
  lastDigit: number
  createdAt: Date
  updatedAt: Date
}

// Alert Types
export interface Alert {
  id: string
  userId: string
  vehicleId: string
  type: 'matricula' | 'pico-placa' | 'rtv' | 'multa' | 'normativa'
  title: string
  message: string
  date: Date
  read: boolean
  createdAt: Date
}

// Legal Request Types
export interface LegalRequest {
  id: string
  userId: string
  vehicleId?: string
  type: 'impugnacion' | 'recurso' | 'consulta'
  description: string
  status: 'pendiente' | 'en-proceso' | 'resuelto' | 'rechazado'
  createdAt: Date
  updatedAt: Date
}

// Tramite Types
export interface Tramite {
  id: string
  name: string
  description: string
  category: 'matricula' | 'licencia' | 'rtv' | 'multas' | 'otros'
  requirements: string[]
  cost?: number
  duration?: string
  location?: string
}

// Calendar Event Types
export interface CalendarEvent {
  id: string
  vehicleId: string
  type: 'matricula' | 'rtv' | 'pico-placa'
  title: string
  date: Date
  description?: string
  completed: boolean
}

// Map Location Types
export interface MapLocation {
  id: string
  name: string
  type: 'amt' | 'rtv' | 'detencion' | 'zona'
  address: string
  coordinates: {
    lat: number
    lng: number
  }
  phone?: string
  hours?: string
}
