#!/usr/bin/env node

/**
 * Firebase Configuration Diagnostic
 * Verifica que todas las variables de entorno estén configuradas correctamente
 */

// Cargar .env.local
require('dotenv').config({ path: '.env.local' })

const requiredVars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID',
]

console.log('\n🔍 Firebase Configuration Diagnostic\n')
console.log('=' .repeat(60))

let allOk = true

requiredVars.forEach((varName) => {
  const value = process.env[varName]
  const isSet = !!value && value !== 'tu-' + varName.toLowerCase()
  
  if (isSet) {
    const preview = value.substring(0, 15) + '...'
    console.log(`✅ ${varName.padEnd(40)} ${preview}`)
  } else {
    console.log(`❌ ${varName.padEnd(40)} NOT SET`)
    allOk = false
  }
})

console.log('=' .repeat(60))

if (allOk) {
  console.log('\n✨ ¡Todas las variables están configuradas!\n')
  console.log('📋 Próximos pasos:')
  console.log('1. Ve a https://console.firebase.google.com')
  console.log('2. Selecciona el proyecto: hwzvyntra')
  console.log('3. En el menú lateral, va a: Authentication')
  console.log('4. Click en "Get started"')
  console.log('5. Habilita "Email/Password"')
  console.log('6. Vuelve a la app y recarga la página\n')
} else {
  console.log('\n❌ Faltan variables de entorno\n')
  console.log('📋 Solución:')
  console.log('1. Abre el archivo: .env.local')
  console.log('2. Reemplaza los placeholders con tus valores reales de Firebase')
  console.log('3. Guarda el archivo')
  console.log('4. Reinicia la app: npm run dev\n')
}

process.exit(allOk ? 0 : 1)
