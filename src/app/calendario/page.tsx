'use client'

import Navbar from '@/components/shared/Navbar'
import Card from '@/components/ui/Card'
import { Calendar as CalendarIcon, AlertCircle, Check, X } from 'lucide-react'

const picoPlacaRules: { [key: number]: { days: string; plates: string } } = {
  0: { days: 'Lunes', plates: '1 - 2' },
  1: { days: 'Martes', plates: '3 - 4' },
  2: { days: 'Miércoles', plates: '5 - 6' },
  3: { days: 'Jueves', plates: '7 - 8' },
  4: { days: 'Viernes', plates: '9 - 0' },
  5: { days: 'Sábado', plates: 'Sin restricción' },
  6: { days: 'Domingo', plates: 'Sin restricción' },
}

const matriculaSchedule = [
  { plate: '1', months: 'Ene-Feb' },
  { plate: '2', months: 'Feb-Mar' },
  { plate: '3', months: 'Mar-Abr' },
  { plate: '4', months: 'Abr-May' },
  { plate: '5', months: 'May-Jun' },
  { plate: '6', months: 'Jun-Jul' },
  { plate: '7', months: 'Jul-Ago' },
  { plate: '8', months: 'Ago-Sep' },
  { plate: '9', months: 'Sep-Oct' },
  { plate: '0', months: 'Oct-Nov' },
]

export default function CalendarioPage() {
  const today = new Date()
  const dayOfWeek = today.getDay()
  const todayPicoPlaca = picoPlacaRules[dayOfWeek]

  return (
    <div className="min-h-screen bg-vyntra-bg-main">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-vyntra-brand/10 border border-vyntra-brand/20 rounded-full">
            <CalendarIcon className="w-4 h-4 text-vyntra-brand" />
            <span className="text-sm font-semibold text-ink">Calendario Vehicular 2026</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold text-ink">
            Pico y Placa & <span className="text-vyntra-brand">Matriculación</span>
          </h1>
          
          <p className="text-xl text-ink-muted max-w-3xl mx-auto">
            Consulta las restricciones de circulación y fechas de matriculación para tu vehículo
          </p>
        </div>

        {/* Pico y Placa Weekly Calendar */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-ink">Pico y Placa Semanal</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
            {Object.values(picoPlacaRules).map((rule, idx) => {
              const isToday = idx === dayOfWeek
              const isWeekend = idx >= 5

              return (
                <Card
                  key={idx}
                  className={`p-4 sm:p-6 border-2 shadow-[0_10px_30px_rgba(15,31,61,0.06)] transition-all duration-300 ${
                    isToday
                      ? 'border-vyntra-danger bg-vyntra-danger/5 ring-2 ring-vyntra-danger/30 scale-105'
                      : isWeekend
                      ? 'border-vyntra-success bg-vyntra-success/5'
                      : 'border-vyntra-brand bg-vyntra-brand/5'
                  }`}
                >
                  <div className="text-center">
                    {/* Day Name */}
                    <h3 className={`text-lg font-bold mb-3 ${
                      isToday ? 'text-vyntra-danger' : isWeekend ? 'text-vyntra-success' : 'text-vyntra-brand'
                    }`}>
                      {rule.days}
                    </h3>

                    {/* Badge */}
                    {isToday && (
                      <div className="inline-block px-3 py-1 bg-vyntra-danger text-white text-xs font-bold rounded-full mb-3 animate-pulse">
                        HOY
                      </div>
                    )}

                    {/* Plates */}
                    <div className={`text-3xl font-black mb-3 tracking-wider ${
                      isToday
                        ? 'text-vyntra-danger'
                        : isWeekend
                        ? 'text-vyntra-success'
                        : 'text-ink'
                    }`}>
                      {rule.plates}
                    </div>

                    {/* Status */}
                    <div className="flex items-center justify-center">
                      {isWeekend ? (
                        <Check className="w-5 h-5 text-vyntra-success" />
                      ) : (
                        <X className="w-5 h-5 text-ink-muted" />
                      )}
                      <span className="ml-2 text-xs font-semibold text-ink-muted">
                        {isWeekend ? 'Sin restricción' : 'Prohibido'}
                      </span>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Info */}
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-900">
                <strong>Horarios de restricción:</strong> 06:00-09:30 y 16:00-21:00 de lunes a viernes. 
                Sábados, domingos y feriados <strong>NO hay restricción</strong>. Aplica en el DMQ.
              </div>
            </div>
          </div>
        </div>

        {/* Matriculation Schedule */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-ink">Calendario de Matriculación 2026</h2>
          <p className="text-ink-muted mb-8">
            Según el último dígito de tu placa, estas son las fechas aproximadas para renovar tu matrícula
          </p>

          {/* Header Row */}
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2 mb-2">
            {matriculaSchedule.map((item, idx) => (
              <div key={item.plate} className={`p-3 text-center font-semibold text-xs rounded-lg border-2 shadow-[0_10px_30px_rgba(15,31,61,0.06)] bg-white ${
                idx % 2 === 0 ? 'border-vyntra-brand' : 'border-vyntra-success'
              }`}>
                Placa <span className="block text-lg font-black text-vyntra-brand">{item.plate}</span>
              </div>
            ))}
          </div>

          {/* Months Row */}
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
            {matriculaSchedule.map((item, idx) => {
              const currentMonth = new Date().getMonth() + 1
              const plateMonthStart = idx + 1
              const isCurrentOrFuture = plateMonthStart >= currentMonth

              return (
                <Card
                  key={item.plate}
                  className={`p-4 text-center border-2 shadow-[0_15px_40px_rgba(15,31,61,0.12)] transition-all duration-300 ${
                    isCurrentOrFuture
                      ? idx % 2 === 0
                        ? 'border-vyntra-brand bg-vyntra-brand/5'
                        : 'border-vyntra-success bg-vyntra-success/5'
                      : 'border-vyntra-border bg-vyntra-bg-main opacity-60'
                  }`}
                >
                  <p className="text-xs font-semibold text-ink-muted mb-2">
                    {item.months}
                  </p>
                  <p className={`text-2xl font-black tracking-wider ${
                    isCurrentOrFuture
                      ? idx % 2 === 0
                        ? 'text-vyntra-brand'
                        : 'text-vyntra-success'
                      : 'text-ink-muted'
                  }`}>
                    {item.plate}
                  </p>
                </Card>
              )
            })}
          </div>

          {/* Legend */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-vyntra-brand/10 border border-vyntra-brand/20 rounded-lg">
              <div className="w-4 h-4 bg-vyntra-brand rounded" />
              <span className="text-sm text-ink">Placas pares (1, 3, 5, 7, 9)</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-vyntra-success/10 border border-vyntra-success/20 rounded-lg">
              <div className="w-4 h-4 bg-vyntra-success rounded" />
              <span className="text-sm text-ink">Placas impares (2, 4, 6, 8, 0)</span>
            </div>
          </div>
        </div>

        {/* Important Note */}
        <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <div className="text-sm text-blue-900">
              <strong className="font-bold">Importante:</strong> El vencimiento de tu matrícula depende del dígito final de tu placa. Consulta el calendario anterior para saber exactamente cuándo vence la tuya. Renova con 15 días de anticipación para evitar multas. La información presentada es referencial.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
