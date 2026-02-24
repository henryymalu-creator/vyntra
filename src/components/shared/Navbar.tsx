'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Shield, User, LogOut, Settings, Bell, Zap } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useIsMobile } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const isMobile = useIsMobile()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setShowUserMenu(false)
  }, [pathname])

  const navLinks = [
    { href: '/#funciona', label: 'Cómo funciona' },
    { href: '/normativa', label: 'Normativa' },
    { href: '/tramites', label: 'Trámites' },
    { href: '/mapas', label: 'Mapas' },
    { href: '/calendario', label: 'Calendario' },
  ]

  return (
    <nav className="navbar-fixed">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 transition-all duration-200 group-hover:scale-110">
              <Image
                src="/logos/Logo_transparente.png"
                alt="Vyntra Logo"
                width={40}
                height={40}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white">Vyntra</span>
              <span className="text-xs text-white/80 font-semibold">Movilidad Inteligente</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 relative group',
                  pathname === link.href
                    ? 'text-white'
                    : 'text-white/80 hover:text-white'
                )}
              >
                {link.label}
                <span className={cn(
                  'absolute bottom-0 left-0 h-0.5 bg-white rounded-full transition-all duration-300',
                  pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                )} />
              </Link>
            ))}
          </div>

          {/* User Menu / Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <button className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200 text-white">
                  <Bell className="w-5 h-5" />
                </button>
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 px-3 py-2 bg-white/10 hover:bg-white/15 border border-white/20 rounded-lg transition-all duration-200"
                  >
                    <div className="w-6 h-6 bg-white/15 rounded-md flex items-center justify-center">
                      <User className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-white">
                      {user.displayName?.split(' ')[0] || 'Cuenta'}
                    </span>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-vyntra-brand/20 rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-3 border-b border-vyntra-brand/10 bg-[#F5F7FA]">
                        <p className="text-sm font-semibold text-ink">{user.displayName}</p>
                        <p className="text-xs text-ink-muted truncate">{user.email}</p>
                      </div>
                      <Link
                        href="/dashboard"
                        className="flex items-center px-4 py-3 text-sm text-ink hover:text-vyntra-brand hover:bg-[#F5F7FA] transition-colors"
                      >
                        <User className="w-4 h-4 mr-3" />
                        Mi Dashboard
                      </Link>
                      <Link
                        href="/alertas"
                        className="flex items-center px-4 py-3 text-sm text-ink hover:text-vyntra-brand hover:bg-[#F5F7FA] transition-colors"
                      >
                        <Bell className="w-4 h-4 mr-3" />
                        Mis Alertas
                      </Link>
                      <Link
                        href="/configuracion"
                        className="flex items-center px-4 py-3 text-sm text-ink hover:text-vyntra-brand hover:bg-[#F5F7FA] transition-colors"
                      >
                        <Settings className="w-4 h-4 mr-3" />
                        Configuración
                      </Link>
                      <button
                        onClick={logout}
                        className="flex items-center w-full px-4 py-3 text-sm text-vyntra-danger hover:bg-vyntra-danger/10 transition-colors border-t border-vyntra-brand/10"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Cerrar sesión
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>
                <Link
                  href="/auth"
                  className="px-4 py-2 text-sm font-semibold text-white hover:text-white transition-colors"
                >
                  Iniciar sesión
                </Link>
                <Link
                  href="/registro"
                  className="px-6 py-2 text-sm font-semibold bg-vyntra-brand text-white rounded-lg border border-white/10 transition-all duration-200 flex items-center gap-2"
                >
                  <Zap className="w-4 h-4" />
                  Registrarse
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-all duration-300 text-white"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0F1F3D]/98 backdrop-blur-xl border-t border-white/10 animate-in slide-in-from-top duration-300">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'block px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-300',
                  pathname === link.href
                    ? 'text-vyntra-brand bg-white'
                    : 'text-white/85 hover:text-white hover:bg-white/10'
                )}
              >
                {link.label}
              </Link>
            ))}
            
            <div className="pt-4 border-t border-white/20">
              {user ? (
                <>
                  <div className="px-4 py-2 mb-2 bg-white/10 rounded-lg border border-white/20">
                    <p className="text-sm font-semibold text-white">{user.displayName}</p>
                    <p className="text-xs text-white/70">{user.email}</p>
                  </div>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-3 text-sm font-medium text-white/85 hover:text-white hover:bg-white/10 rounded-lg transition"
                  >
                    Mi Dashboard
                  </Link>
                  <Link
                    href="/alertas"
                    className="block px-4 py-3 text-sm font-medium text-white/85 hover:text-white hover:bg-white/10 rounded-lg transition"
                  >
                    Mis Alertas
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-3 text-sm font-medium text-vyntra-danger hover:bg-vyntra-danger/10 rounded-lg transition"
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth"
                    className="block px-4 py-3 text-sm font-semibold text-center text-white hover:bg-white/10 rounded-lg transition mb-2 border border-white/20"
                  >
                    Iniciar sesión
                  </Link>
                  <Link
                    href="/registro"
                    className="block px-4 py-3 text-sm font-semibold text-center text-vyntra-brand bg-white rounded-lg transition"
                  >
                    Registrarse
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
