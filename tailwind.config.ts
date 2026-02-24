import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 🎯 Vyntra 1.0 - Paleta Oficial - SISTEMA PROFESIONAL
        // Estructura de colores por propósito
        'vyntra': {
          // Estructura (Navbar, Structural Elements)
          'navbar': '#0F1F3D',       // Navbar oscuro permanente
          'structural': '#0F1F3D',   // Elementos estructurales
          
          // Principales (Hero, Brand, Primary Actions)
          'hero': '#1B3A6F',         // Hero section
          'brand': '#1B3A6F',        // Botones principales / brand
          'primary': '#1B3A6F',      // Acciones primarias
          
          // Fondos
          'bg-main': '#F4F6F8',      // Fondo principal gris premium
          'bg-soft': '#FFFFFF',      // Fondo suave (cards)
          'surface': '#FFFFFF',      // Superficie de cards/panels
          
          // Estados
          'success': '#1FA37A',      // Verde éxito
          'warning': '#F4A261',      // Naranja advertencia
          'danger': '#E63946',       // Rojo peligro
          
          // Tipografía
          'text': '#111827',         // Texto principal (dark ink)
          'text-main': '#111827',    // Texto principal
          'text-muted': '#6B7280',   // Texto secundario
          'muted': '#6B7280',        // Color mutedo
          
          // Bordes
          'border': '#E5E7EB',       // Bordes suaves
        },
        
        // Alias de Tailwind nativos para acceso con variables CSS
        'ink': {
          'DEFAULT': '#111827',      // text-ink
          'muted': '#6B7280',        // text-ink-muted
        },
        
        // Neutros premium (base)
        'slate': {
          '50': '#F9FAFC',
          '100': '#F1F5F9',
          '200': '#E2E8F0',
          '300': '#CBD5E1',
          '400': '#94A3B8',
          '500': '#64748B',
          '600': '#475569',
          '700': '#334155',
          '800': '#1E293B',
          '900': '#0F172A',
        },
      },
      
      textColor: {
        'ink': '#111827',
        'ink-muted': '#6B7280',
      },
      
      backgroundColor: {
        'vyntra-bg-main': '#F4F6F8',
      },
      
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'display': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      
      spacing: {
        'safe': 'max(1rem, env(safe-area-inset-left))',
      },
      
      backdropBlur: {
        'xs': '2px',
      },
      
      boxShadow: {
        // Shadow formula oficial: 0 10px 30px rgba(15, 31, 61, 0.06)
        'card': '0 10px 30px rgba(15, 31, 61, 0.06)',
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        glow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out',
        slideUp: 'slideUp 0.4s ease-out',
        slideDown: 'slideDown 0.4s ease-out',
        scaleIn: 'scaleIn 0.3s ease-out',
        shimmer: 'shimmer 2s infinite',
        glow: 'glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
