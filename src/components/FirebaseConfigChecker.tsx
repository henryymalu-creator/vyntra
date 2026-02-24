'use client'

import { useEffect, useState } from 'react'
import { AlertCircle, CheckCircle, Settings } from 'lucide-react'

export function FirebaseConfigChecker() {
  const [config, setConfig] = useState<{
    hasApiKey: boolean
    hasAuthDomain: boolean
    hasProjectId: boolean
    allConfigured: boolean
    error?: string
  } | null>(null)

  useEffect(() => {
    const checkConfig = () => {
      const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
      const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
      const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID

      setConfig({
        hasApiKey: !!apiKey && apiKey.length > 10,
        hasAuthDomain: !!authDomain && authDomain.includes('.firebaseapp.com'),
        hasProjectId: !!projectId && projectId.length > 0,
        allConfigured:
          !!apiKey && apiKey.length > 10 &&
          !!authDomain && authDomain.includes('.firebaseapp.com') &&
          !!projectId && projectId.length > 0,
      })
    }

    checkConfig()
  }, [])

  if (!config) return null

  if (config.allConfigured) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md animated-pulse">
      <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4 shadow-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-bold text-yellow-900 mb-2">⚙️ Firebase No Configurado</h3>
            <ul className="text-sm text-yellow-800 space-y-1 mb-3">
              {!config.hasApiKey && <li>❌ API Key no detectada</li>}
              {!config.hasAuthDomain && <li>❌ Auth Domain no detectada</li>}
              {!config.hasProjectId && <li>❌ Project ID no detectado</li>}
            </ul>
            <p className="text-xs text-yellow-700 mb-3">
              <strong>Solución:</strong> Ve a Firebase Console y habilita Authentication con Email/Password.
            </p>
            <a 
              href="https://console.firebase.google.com/project/hwzvyntra/authentication/providers" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-600 text-white text-xs font-semibold rounded hover:bg-yellow-700 transition"
            >
              <Settings className="w-4 h-4" />
              Habilitar Authentication
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
