import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import { Toaster } from 'react-hot-toast'
import { FirebaseConfigChecker } from '@/components/FirebaseConfigChecker'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vyntra – Protección Inteligente para tu Vehículo',
  description: 'Consulta normativa, activa alertas y recibe asesoría especializada en tránsito en Quito. Evita multas antes de que ocurran.',
  keywords: 'vyntra, tránsito quito, pico y placa, multas tránsito, matrícula vehicular, revisión técnica, RTV, AMT Quito',
  authors: [{ name: 'Henry Zavala' }],
  creator: 'Henry Zavala',
  publisher: 'Vyntra',
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'es_EC',
    url: 'https://vyntra.com',
    title: 'Vyntra – Protección Inteligente para tu Vehículo',
    description: 'Evita multas antes de que ocurran. Consulta normativa y activa alertas inteligentes.',
    siteName: 'Vyntra',
    images: [
      {
        url: '/logos/Logo_transparente.png',
        width: 1200,
        height: 630,
        alt: 'Vyntra - Movilidad Inteligente',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vyntra – Protección Inteligente para tu Vehículo',
    description: 'Evita multas antes de que ocurran. Consulta normativa y activa alertas inteligentes.',
    images: ['/logos/Logo_transparente.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <FirebaseConfigChecker />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#FFFFFF',
                color: '#111827',
                border: '1px solid #E5E7EB',
                boxShadow: '0 10px 30px rgba(15, 31, 61, 0.06)',
              },
              success: {
                iconTheme: {
                  primary: '#1FA37A',
                  secondary: '#FFFFFF',
                },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  )
}
