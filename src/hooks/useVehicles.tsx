'use client'

import { useState, useEffect } from 'react'
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  Timestamp 
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/contexts/AuthContext'
import { Vehicle } from '@/types'
import { getLastDigitFromPlate } from '@/lib/utils'
import toast from 'react-hot-toast'

export function useVehicles() {
  const { user } = useAuth()
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadVehicles()
    } else {
      setVehicles([])
      setLoading(false)
    }
  }, [user])

  const loadVehicles = async () => {
    if (!user) return

    try {
      const q = query(
        collection(db, 'vehicles'),
        where('userId', '==', user.uid)
      )
      const querySnapshot = await getDocs(q)
      
      const vehiclesData: Vehicle[] = []
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        vehiclesData.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        } as Vehicle)
      })

      setVehicles(vehiclesData)
    } catch (error) {
      console.error('Error loading vehicles:', error)
      toast.error('Error al cargar vehículos')
    } finally {
      setLoading(false)
    }
  }

  const addVehicle = async (vehicleData: Omit<Vehicle, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'lastDigit'>) => {
    if (!user) {
      toast.error('Debes iniciar sesión')
      return
    }

    try {
      const lastDigit = getLastDigitFromPlate(vehicleData.plate)
      
      const docRef = await addDoc(collection(db, 'vehicles'), {
        ...vehicleData,
        userId: user.uid,
        lastDigit,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      })

      const newVehicle: Vehicle = {
        id: docRef.id,
        ...vehicleData,
        userId: user.uid,
        lastDigit,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      setVehicles([...vehicles, newVehicle])
      toast.success('Vehículo registrado exitosamente')
      
      return newVehicle
    } catch (error) {
      console.error('Error adding vehicle:', error)
      toast.error('Error al registrar vehículo')
      throw error
    }
  }

  const updateVehicle = async (vehicleId: string, updates: Partial<Vehicle>) => {
    try {
      const vehicleRef = doc(db, 'vehicles', vehicleId)
      
      await updateDoc(vehicleRef, {
        ...updates,
        updatedAt: Timestamp.now(),
      })

      setVehicles(
        vehicles.map((v) =>
          v.id === vehicleId ? { ...v, ...updates, updatedAt: new Date() } : v
        )
      )

      toast.success('Vehículo actualizado')
    } catch (error) {
      console.error('Error updating vehicle:', error)
      toast.error('Error al actualizar vehículo')
      throw error
    }
  }

  const deleteVehicle = async (vehicleId: string) => {
    try {
      await deleteDoc(doc(db, 'vehicles', vehicleId))
      setVehicles(vehicles.filter((v) => v.id !== vehicleId))
      toast.success('Vehículo eliminado')
    } catch (error) {
      console.error('Error deleting vehicle:', error)
      toast.error('Error al eliminar vehículo')
      throw error
    }
  }

  return {
    vehicles,
    loading,
    addVehicle,
    updateVehicle,
    deleteVehicle,
    refresh: loadVehicles,
  }
}
