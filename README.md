# 🚗 Vyntra - Protección Inteligente para tu Vehículo

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-10.7-orange)](https://firebase.google.com/)

Plataforma web profesional y escalable para gestión inteligente de vehículos en Quito, Ecuador. Evita multas, mantente informado y conduce con tranquilidad.

## 🌟 Características Principales

- ✅ **Diseño Responsive Mobile-First** - Optimizado para todos los dispositivos
- 🔐 **Autenticación Completa** - Login, registro, recuperación de contraseña
- 📊 **Dashboard Personalizado** - Panel de control con información de tus vehículos
- 🔔 **Sistema de Alertas** - Notificaciones inteligentes sobre vencimientos
- 📅 **Calendario Vehicular** - Fechas de matrícula y pico y placa
- 🗺️ **Mapas Interactivos** - Centros AMT, RTV y más
- 📋 **Guías de Trámites** - Información completa de requisitos y costos
- ⚖️ **Defensa Legal** - Conexión con abogados especializados
- 🎨 **Diseño Dark Mode Minimal** - Estilo Notion + Stripe + Uber
- 🚀 **SEO Optimizado** - Meta tags y estructura para buscadores
- 💰 **Preparado para Monetización** - Estructura para ads y premium

## 📁 Estructura del Proyecto

```
Vyntra/
├── src/
│   ├── app/                      # Next.js 14 App Router
│   │   ├── layout.tsx            # Layout principal
│   │   ├── page.tsx              # Página de inicio
│   │   ├── globals.css           # Estilos globales
│   │   ├── auth/                 # Autenticación
│   │   ├── registro/             # Registro de usuarios
│   │   ├── dashboard/            # Panel de usuario
│   │   ├── calendario/           # Calendario vehicular
│   │   ├── mapas/                # Mapas interactivos
│   │   ├── tramites/             # Información de trámites
│   │   ├── terminos/             # Términos de servicio
│   │   ├── privacidad/           # Política de privacidad
│   │   ├── nosotros/             # Quiénes somos
│   │   ├── contacto/             # Formulario de contacto
│   │   └── recuperar-password/   # Recuperación de contraseña
│   │
│   ├── components/               # Componentes React
│   │   ├── pages/                # Componentes de páginas
│   │   │   └── LandingPage.tsx
│   │   ├── shared/               # Componentes compartidos
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   └── ui/                   # Componentes UI reutilizables
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Card.tsx
│   │       └── Dialog.tsx
│   │
│   ├── contexts/                 # React Contexts
│   │   └── AuthContext.tsx
│   │
│   ├── hooks/                    # Custom Hooks
│   │   ├── useVehicles.tsx
│   │   └── useMediaQuery.tsx
│   │
│   ├── lib/                      # Librerías y utilidades
│   │   ├── firebase.ts
│   │   └── utils.ts
│   │
│   └── types/                    # TypeScript Types
│       └── index.ts
│
├── public/                       # Archivos estáticos
├── .env.local.example            # Ejemplo de variables de entorno
├── tailwind.config.ts            # Configuración Tailwind
├── tsconfig.json                 # Configuración TypeScript
├── next.config.js                # Configuración Next.js
├── package.json                  # Dependencias
└── README.md                     # Este archivo

```

## 🛠️ Stack Tecnológico

### Frontend
- **Next.js 14** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework CSS utility-first
- **Lucide React** - Iconos modernos
- **Framer Motion** - Animaciones fluidas
- **React Hook Form** - Gestión de formularios
- **Zod** - Validación de schemas

### Backend & Database
- **Firebase Authentication** - Sistema de autenticación
- **Cloud Firestore** - Base de datos NoSQL
- **Firebase Storage** - Almacenamiento de archivos

### Desarrollo
- **ESLint** - Linting de código
- **PostCSS** - Procesador de CSS
- **Autoprefixer** - Prefijos CSS automáticos

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 18+ instalado
- npm o yarn
- Cuenta de Firebase
- Google Maps API Key (opcional para mapas)

### Paso 1: Clonar el repositorio

```bash
cd Vyntra
```

### Paso 2: Instalar dependencias

```bash
npm install
# o
yarn install
```

### Paso 3: Configurar variables de entorno

1. Copia el archivo de ejemplo:
```bash
copy .env.local.example .env.local
```

2. Edita `.env.local` con tus credenciales:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_proyecto_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id

# Google Maps API Key (opcional)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=tu_google_maps_key

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Paso 4: Configurar Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita **Authentication** con Email/Password
4. Crea una base de datos **Cloud Firestore**
5. Configura las reglas de seguridad (ver abajo)
6. Copia las credenciales a `.env.local`

#### Reglas de Firestore recomendadas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Vehicles
    match /vehicles/{vehicleId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
    
    // Alerts
    match /alerts/{alertId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
  }
}
```

### Paso 5: Ejecutar en desarrollo

```bash
npm run dev
# o
yarn dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📦 Scripts Disponibles

```bash
npm run dev          # Ejecuta en modo desarrollo
npm run build        # Construye para producción
npm run start        # Ejecuta en modo producción
npm run lint         # Ejecuta el linter
npm run type-check   # Verifica tipos TypeScript
```

## 🎨 Guía de Diseño

### Colores Principales

- **Vyntra Blue**: `#0A84FF` (Azul eléctrico principal)
- **Vyntra Blue Dark**: `#0066CC` (Hover states)
- **Vyntra Blue Light**: `#409CFF` (Highlights)
- **Black**: `#000000` (Fondo principal)
- **Neutral 950**: `#0A0A0A` (Fondos secundarios)
- **Neutral 900**: `#171717` (Cards y paneles)

### Tipografía

- **Font Family**: Inter (Google Fonts)
- **Font Weights**: 300, 400, 500, 600, 700, 800, 900

### Componentes UI

Todos los componentes siguen el patrón:
- Mobile-first responsive
- Dark mode por defecto
- Animaciones suaves con Tailwind
- Estados hover/focus bien definidos
- Accesibilidad (a11y) considerada

## 🗂️ Estructura de Base de Datos

### Collections en Firestore

#### `users`
```typescript
{
  uid: string
  email: string
  displayName: string
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

#### `vehicles`
```typescript
{
  id: string
  userId: string
  plate: string
  type: 'auto' | 'moto' | 'camioneta' | 'taxi' | 'otro'
  brand?: string
  model?: string
  year?: number
  lastDigit: number
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

#### `alerts`
```typescript
{
  id: string
  userId: string
  vehicleId: string
  type: 'matricula' | 'pico-placa' | 'rtv' | 'multa'
  title: string
  message: string
  date: Timestamp
  read: boolean
  createdAt: Timestamp
}
```

## 🚀 Despliegue en Producción

### Vercel (Recomendado)

1. Conecta tu repositorio en [Vercel](https://vercel.com)
2. Configura las variables de entorno
3. Deploy automático en cada push

### Otras Plataformas

- **Netlify**: Con Next.js Runtime
- **AWS Amplify**: Soporte completo para Next.js
- **Railway**: Deploy con Dockerfile

## 📈 SEO y Rendimiento

- ✅ Meta tags optimizados en todas las páginas
- ✅ Open Graph para redes sociales
- ✅ Sitemap automático (Next.js)
- ✅ Robots.txt configurado
- ✅ Images optimizadas con next/image
- ✅ Code splitting automático
- ✅ Server Components donde aplica
- ✅ Lazy loading de componentes pesados

## 🔒 Seguridad

- Autenticación con Firebase Authentication
- Reglas de seguridad en Firestore
- Validación de datos con Zod
- Sanitización de inputs
- HTTPS obligatorio en producción
- Variables de entorno protegidas

## 📱 Responsive Design

Breakpoints utilizados:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

Todos los componentes son completamente responsive.

## 🤝 Contribuir

Este es un proyecto privado de **Henry Zavala**. Para colaboraciones o consultas, contacta en:
- Email: contacto@vyntra.com
- Ubicación: Quito, Ecuador

## 📄 Licencia

© 2026 Henry Zavala. Todos los derechos reservados.

Este proyecto es propiedad privada y confidencial. No está permitida su reproducción, distribución o uso sin autorización expresa del autor.

## 🎯 Roadmap

### Fase 1 - MVP (Actual) ✅
- [x] Landing page profesional
- [x] Sistema de autenticación
- [x] Registro de vehículos
- [x] Dashboard de usuario
- [x] Calendario de trámites
- [x] Mapas informativos
- [x] Páginas legales

### Fase 2 - Próximamente
- [ ] Sistema de alertas push
- [ ] Marketplace de abogados
- [ ] Integración API AMT
- [ ] Historial de vehículos
- [ ] Simulador de costos
- [ ] Pagos en línea

### Fase 3 - Futuro
- [ ] App móvil nativa (React Native)
- [ ] IA para simplificar normativa
- [ ] Expansión a otras ciudades de Ecuador
- [ ] Expansión LATAM

## 📞 Soporte

¿Necesitas ayuda? Contáctanos:
- 📧 Email: soporte@vyntra.com
- 📱 WhatsApp: +593 99 999 9999
- 🌐 Web: vyntra.com/contacto

---

**Creado con ❤️ por Henry Zavala en Quito, Ecuador 🇪🇨**
