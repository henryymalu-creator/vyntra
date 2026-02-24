import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { getAuth, Auth } from 'firebase/auth'
import { getFirestore, Firestore } from 'firebase/firestore'
import { getStorage, FirebaseStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Validar que todas las variables de entorno están configuradas
const requiredEnvVars = ['NEXT_PUBLIC_FIREBASE_API_KEY', 'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN', 'NEXT_PUBLIC_FIREBASE_PROJECT_ID']
const missingVars = requiredEnvVars.filter(varName => !process.env[varName])

if (missingVars.length > 0 && typeof window !== 'undefined') {
  console.warn('[Firebase] Variables de entorno faltantes:', missingVars)
}

// Initialize Firebase
let app: FirebaseApp
if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig)
  } catch (error) {
    console.error('[Firebase Init Error]', error)
    throw error
  }
} else {
  app = getApps()[0]
}

// Initialize services with error handling
let auth: Auth
let db: Firestore
let storage: FirebaseStorage

try {
  auth = getAuth(app)
} catch (error) {
  console.error('[Firebase Auth Error]', error)
  throw error
}

try {
  db = getFirestore(app)
} catch (error) {
  console.error('[Firestore Error]', error)
  throw error
}

try {
  storage = getStorage(app)
} catch (error) {
  console.error('[Firebase Storage Error]', error)
  throw error
}

export { auth, db, storage }
export default app
