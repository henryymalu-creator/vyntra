'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Shield, Facebook, Twitter, Instagram, Mail, AlertCircle, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    platform: [
      { label: 'Cómo funciona', href: '/#funciona' },
      { label: 'Características', href: '/#features' },
      { label: 'Mapas', href: '/mapas' },
      { label: 'Calendario', href: '/calendario' },
      { label: 'Premium', href: '/#premium' },
    ],
    resources: [
      { label: 'Trámites', href: '/tramites' },
      { label: 'Documentación', href: '/docs' },
      { label: 'Normativa', href: '/normativa' },
      { label: 'Preguntas frecuentes', href: '/faq' },
      { label: 'Blog', href: '/blog' },
    ],
    legal: [
      { label: 'Términos de servicio', href: '/terminos' },
      { label: 'Privacidad', href: '/privacidad' },
      { label: 'Cookies', href: '/cookies' },
      { label: 'Quiénes somos', href: '/nosotros' },
      { label: 'Contacto', href: '/contacto' },
    ],
  }

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com' },
    { icon: Twitter, href: 'https://twitter.com' },
    { icon: Instagram, href: 'https://instagram.com' },
    { icon: Mail, href: 'mailto:contacto@vyntra.com' },
  ]

  return (
    <footer className="relative bg-[#0F1F3D] border-t border-white/10">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 lg:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-3 mb-6 group w-fit">
              <div className="relative w-12 h-12 transition-all group-hover:scale-110">
                <Image
                  src="/logos/Logo_transparente.png"
                  alt="Vyntra Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div>
                <p className="text-lg font-bold text-white font-display">
                  Vyntra
                </p>
                <p className="text-xs text-white/70 font-semibold">Movilidad Inteligente</p>
              </div>
            </Link>
            <p className="text-sm text-white/70 mb-6 leading-relaxed">
              Simplifica tus trámites vehiculares en Quito. Alertas inteligentes, asesoría legal y mapas para todos tus procedimientos.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon
                return (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center transition-all duration-300 group hover:bg-vyntra-brand hover:border-vyntra-brand hover:shadow-lg shadow-vyntra-brand/20"
                  >
                    <Icon className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 font-display">Plataforma</h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors duration-200 flex items-center gap-2 group w-fit"
                  >
                    {link.label}
                    <span className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all">
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 font-display">Recursos</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors duration-200 flex items-center gap-2 group w-fit"
                  >
                    {link.label}
                    <span className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all">
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 font-display">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors duration-200 flex items-center gap-2 group w-fit"
                  >
                    {link.label}
                    <span className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all">
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mb-12">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <AlertCircle className="w-4 h-4 text-white/70" />
              </div>
              <div className="text-sm text-white/70 leading-relaxed">
                <p className="font-bold mb-1 text-white">Nota importante:</p>
                <p>Vyntra es una plataforma privada e independiente. No estamos afiliados, asociados ni representamos a la Agencia Metropolitana de Tránsito (AMT), Agencia Nacional de Tránsito (ANT) ni a ninguna entidad gubernamental. Somos un servicio privado que facilita el acceso a información pública. Siempre verifica información en portales oficiales.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-white/70 text-center md:text-left">
              <p>
                © {currentYear}{' '}
                <span className="font-semibold text-white">Vyntra</span> • Creado por{' '}
                <span className="font-semibold text-white/80">Henry Zavala</span> • Quito, Ecuador
              </p>
            </div>
            <div className="text-sm text-white/70 font-semibold">
              <p>Plataforma de movilidad inteligente para Quito</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
