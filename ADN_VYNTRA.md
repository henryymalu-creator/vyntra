# 🧬 ADN DE VYNTRA - Documentación Completa

**Última actualización:** 22 de febrero de 2026  
**Versión:** 1.0.0 - DISEÑO REDISEÑADO  
**Estado:** Producción - Lanzamiento Inmediato

---

## 🎨 VYNTRA v1.0 - NUEVO DISEÑO

### Cambios Principales

#### ✨ Visual Rediseñado
- ✅ **80% Blanco predominante** (fondo limpio, minimalista)
- ✅ **Navbar azul profundo** (`#1B3A6F`) con logo blanco
- ✅ **Footer azul profundo** complementando navbar
- ✅ **Tarjetas blancas** con bordes grises suaves
- ✅ **Secciones grises claras** para alternar (bg-gray-50)
- ✅ **Sombras suaves** (shadow-sm, shadow-md)
- ✅ **Bordes minimalistas** (border-gray-100, border-gray-200)

#### 🏗 Arquitectura Visual
```
┌─────────────────────────────────────┐
│    Navbar Azul (#1B3A6F)           │
├─────────────────────────────────────┤
│                                     │
│    Secciones Blancas + Grises      │
│    - Blanco: Contenido principal   │
│    - Gris 50: Secciones alternas   │
│                                     │
├─────────────────────────────────────┤
│    Footer Azul (#1B3A6F)           │
└─────────────────────────────────────┘
```

### Paleta Oficial v1.0

| Elemento | Color | Hex | Uso |
|----------|-------|-----|-----|
| Navbar/Footer | Azul profundo | `#1B3A6F` | Headers, CTAs |
| Primario | Azul vyntra | `#0A84FF` | Botones, links |
| Fondo principal | Blanco | `#FFFFFF` | Body, cards |
| Fondo alterno | Gris claro | `#F9FAFB` | Secciones |
| Bordes | Gris 100/200 | `#F3F4F6` / `#E5E7EB` | Divisiones |
| Texto primario | Gris 900 | `#111827` | Cuerpo |
| Texto secundario | Gris 600 | `#4B5563` | Meta |

---

## 📄 PÁGINAS v1.0 (SEO READY)

### 1. Home (Landing) - `/`
**Estado**: ✅ Rediseñada  
**Objetivo**: Captar usuarios, establecer autoridad

**Secciones**:
- Hero: "¿Perdido con un trámite vehicular en Quito?"
- Grid 3x2: Problemas reales (6 cards)
- Mapas: CTA a integración
- Disclaimer

### 2. Matricula Quito Paso a Paso - `/matricula-quito-paso-a-paso`
**Estado**: ✅ Creada (SEO optimizada)  
**Objetivo**: Rankear en Google, captar tráfico orgánico

**Contenido**:
- H1 optimizado
- 4 pasos detallados
- Tabla de costos
- Errores comunes
- CTA a registro

### 3. Registrar Vehículo - `/registrar-vehiculo`
**Estado**: ✅ Creada (Supabase conectado)  
**Objetivo**: Captura de emails, contacto inicial

**Features**:
- Formulario placa + email + ciudad
- Validación cliente
- Insertión en Supabase
- Confirmación visual

### 4. Mi Vehículo (Dashboard) - `/mi-vehiculo`
**Estado**: ✅ Creada (prototipo)  
**Objetivo**: Panel SaaS temprano

**Features**:
- Búsqueda por email
- Status card (estado legal)
- Info vehículo
- Score gauge (premium)
- Upgrade banner

### 5. Calendario Pico y Placa - `/calendario`
**Estado**: ✅ Existente (mantener/mejorar)

### 6. Mapas - `/mapas`
**Estado**: ✅ Existente (3 Google My Maps embebidos)

---

## 🧬 SISTEMA VYNTRA v1.0

### Base de Datos (Supabase)

```sql
-- Tabla vehicles
CREATE TABLE vehicles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  plate text NOT NULL,           -- ABC-1234
  email text NOT NULL,           -- usuario@email.com
  city text NOT NULL,            -- Quito, Guayaquil, etc
  last_digit int NOT NULL,       -- Último dígito placa
  registration_month text NOT NULL, -- Mes de vencimiento
  created_at timestamptz DEFAULT now()
);

-- Tabla reminders (futuro)
CREATE TABLE reminders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  vehicle_id uuid REFERENCES vehicles(id),
  type text,                     -- 'matricula', 'rtv', 'pico'
  scheduled_for timestamptz,
  sent boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Tabla scores (futuro premium)
CREATE TABLE vehicle_scores (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  vehicle_id uuid REFERENCES vehicles(id),
  score int,
  calculated_at timestamptz DEFAULT now()
);
```

### Score Engine (Lógica)

**Archivo**: `src/lib/scoreEngine.ts`

```typescript
// Penalidades base (suma = score final, máx 100)
- Multa activa: -10 (por cada una)
- Matrícula vencida: -15
- RTV vencida: -10
- Historial 2+ multas: -5
- Infracciones pico y placa: -8 (por cada una)
- Meses en retraso: -2 (por mes)

// Niveles
80-100 ✅ Bajo riesgo
60-79 ⚠️ Riesgo medio
0-59 ❌ Alto riesgo
```

### Flujo de Registro

```
Usuario
  ↓
Home → Botón "Registrar"
  ↓
/registrar-vehiculo (formulario)
  ↓
Valida placa (mínimo 6 caracteres)
  ↓
Extrae último dígito
  ↓
Calcula mes matrícula
  ↓
INSERT en Supabase vehicles
  ↓
Confirmación + "Ver mi vehículo"
```

---

## 🎨 COMPONENTES UI v1.0

### Section.tsx
- Wrapper max-w-6xl
- Padding 20 (py-20 px-6)
- Prop `bg`: "white" | "gray"

### Card.tsx
- bg-white
- border border-gray-100
- rounded-2xl p-6
- hover:shadow-md
- Prop `hover`: boolean

### Button.tsx
- variants: "primary" | "outline" | "ghost"
- sizes: "sm" | "md" | "lg"
- primary: bg-blue-600 hover:opacity-90
- outline: border-blue-600 text-blue-600
- ghost: text-blue-600 hover:bg-gray-100

### Dashboard Components

#### StatusCard
- Estado legal (ok/warning/danger)
- Dot color + text

#### NextEventCard
- Título + valor
- Icon opcional
- Para matrícula y pico y placa

#### ScoreGauge
- Number 0-100
- Barra de progreso
- Color dinámico

#### UpgradeBanner
- CTA a premium
- Emoji 🚀
- Gradient bg-blue-50

---

## 🚀 STACK TECNOLÓGICO v1.0

### Frontend
```json
{
  "next": "15.0.3",
  "react": "18.3.1",
  "typescript": "5.7.2",
  "tailwindcss": "3.4.17"
}
```

### Backend
```json
{
  "supabase": "@supabase/ssr",
  "@supabase/supabase-js": "^2.x"
}
```

### Nuevo: Supabase (reemplazando Firebase gradualmente)

**Variables de entorno**:
```env
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

---

## 📊 METRICS v1.0

| Métrica | Valor | Notas |
|---------|-------|-------|
| Páginas | 9+ | Home, 4 SEO, 2 dashboard, 2 existentes |
| Componentes | 20+ | UI base + dashboard |
| Score Engine | ✅ | 6 factores implementados |
| Rutas API | 0 (futuro) | Cron jobs en Vercel |
| Usuarios Meta | 1000+ | Fase 1 (gratuita) |
| Premium Conv | 5-10% | Futuro monetización |

---

## 🎯 ROADMAP v2.0+ (En espera)

### Fase 2: Autenticación Real
- [ ] Supabase Auth (email magic link)
- [ ] Proteger /mi-vehiculo
- [ ] Perfil de usuario
- [ ] Mis vehículos (múltiples)

### Fase 3: Automatización
- [ ] Cron jobs (Vercel)
- [ ] Email reminders (Resend)
- [ ] Scoring automático
- [ ] Notificaciones push

### Fase 4: SaaS Premium
- [ ] Stripe integration
- [ ] Premium features unlock
- [ ] Historial completo
- [ ] Analytics dashboard

### Fase 5: Multi-ciudad
- [ ] Guayaquil
- [ ] Cuenca
- [ ] Quito mejorado
- [ ] Engine regulaciones by city

---

## ✅ CHECKLIST LANZAMIENTO v1.0

### Development
- [x] Home rediseñada (blanco)
- [x] Componentes UI base
- [x] Página SEO matricula
- [x] Formulario registro
- [x] Dashboard básico
- [x] Score Engine
- [x] Supabase config

### Diseño
- [x] Navbar azul profundo
- [x] Paleta actualizada
- [x] Cards blancas/grises
- [x] Responsive mobile-first

### Testing
- [ ] Validar formulario Supabase
- [ ] Prueba búsqueda dashboard
- [ ] Responsive en móvil
- [ ] SEO meta tags

### Deployment
- [ ] .env.local configurado
- [ ] Supabase proyecto creado
- [ ] Vercel deploy
- [ ] DNS configurado

---

## 🔗 ENLACES IMPORTANTES

**Supabase Setup**:
1. supabase.com → Create Project
2. Settings → API → Copiar URL + Anon Key
3. .env.local: NEXT_PUBLIC_SUPABASE_*

**Diseño Color**:
- Navbar: #1B3A6F
- Primary: #0A84FF
- Body: #FFFFFF
- Alternate: #F9FAFB

---

**Vyntra v1.0 = Autoridad SEO + Dashboard temprano + Base para monetización**

---

## 📋 TABLA DE CONTENIDOS

1. [Identidad de Marca](#identidad-de-marca)
2. [Arquitectura Técnica](#arquitectura-técnica)
3. [Estructura de Carpetas](#estructura-de-carpetas)
4. [Stack Tecnológico](#stack-tecnológico)
5. [Sistema de Diseño](#sistema-de-diseño)
6. [Paleta de Colores](#paleta-de-colores)
7. [Tipografía](#tipografía)
8. [Componentes](#componentes)
9. [Páginas](#páginas)
10. [Funcionalidades](#funcionalidades)
11. [APIs y Integraciones](#apis-e-integraciones)
12. [Base de Datos](#base-de-datos)
13. [Convenciones de Código](#convenciones-de-código)

---

## 🎯 IDENTIDAD DE MARCA

### Propósito
Protección inteligente para vehículos en Quito, Ecuador. Plataforma que ayuda a conductores a evitar multas de tránsito mediante alertas automáticas, información de normativa y asesoría especializada.

### Misión
Empodera a los conductores quitenos con información en tiempo real sobre restricciones de tránsito (Pico y Placa), vencimientos de matrícula y servicios de revisión técnica vehicular.

### Visión
Convertirse en la plataforma de referencia para gestión inteligente de vehículos en Ecuador.

### Valores Clave
- 🛡️ **Protección**: Evita multas antes de que ocurran
- 📱 **Accesibilidad**: Información clara y disponible 24/7
- 🔐 **Confiabilidad**: Datos precisos de fuentes oficiales
- ⚡ **Velocidad**: Alertas en tiempo real
- 🤝 **Comunidad**: Asesoría especializada

### Lema Oficial
> "Evita multas antes de que ocurran"

**Variantes:**
- "Protección inteligente para tu vehículo"
- "Consulta normativa, activa alertas y recibe asesoría especializada"

---

## 🏗️ ARQUITECTURA TÉCNICA

### Tecnología Principal
- **Framework**: Next.js 15.0.3 (App Router)
- **Lenguaje**: TypeScript 5.7.2 (Strict Mode)
- **Runtime**: Node.js >=18.17.0 (actualmente v24.13.1)
- **Package Manager**: npm >=9.0.0

### Arquitectura de Capas
```
┌─────────────────────────────────────┐
│   Frontend (React 18.3.1 TSX)       │
│   ├─ Componentes (src/components)   │
│   ├─ Páginas (src/app)              │
│   └─ Hooks Personalizados           │
├─────────────────────────────────────┤
│   Lógica de Negocio                 │
│   ├─ Utilities (src/lib)            │
│   ├─ Contexts (src/contexts)        │
│   └─ Tipos (src/types)              │
├─────────────────────────────────────┤
│   Backend (Next.js API Routes)      │
│   └─ API Endpoints                  │
├─────────────────────────────────────┤
│   Servicios Externos                │
│   ├─ Firebase (Auth + Firestore)    │
│   ├─ Google Maps (iframes)          │
│   └─ AMT Quito (normativa)          │
└─────────────────────────────────────┘
```

### Modelo de Renderizado
- **SSR/SSG**: Next.js App Router (Server Components por defecto)
- **Client Components**: Componentes interactivos con hooks
- **ISR**: Regeneración incremental donde sea aplicable

---

## 📁 ESTRUCTURA DE CARPETAS

### Árbol Completo
```
Vyntra/
├── src/
│   ├── app/                          # Rutas y páginas (App Router)
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── calendario/
│   │   │   └── page.tsx              # Calendario Pico y Placa + Matrícula
│   │   ├── contacto/
│   │   │   └── page.tsx
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── mapas/
│   │   │   └── page.tsx              # Google My Maps integrados
│   │   ├── nosotros/
│   │   │   └── page.tsx              # Quiénes somos
│   │   ├── privacidad/
│   │   │   └── page.tsx
│   │   ├── recuperar-password/
│   │   │   └── page.tsx
│   │   ├── registro/
│   │   │   └── page.tsx
│   │   ├── terminos/
│   │   │   └── page.tsx
│   │   ├── tramites/
│   │   │   └── page.tsx              # RTV, Matrícula, etc.
│   │   ├── globals.css               # Estilos globales
│   │   ├── layout.tsx                # Layout raíz
│   │   └── page.tsx                  # Home (Landing Page)
│   │
│   ├── components/                   # Componentes reutilizables
│   │   ├── pages/
│   │   │   ├── LandingPage.tsx
│   │   │   ├── AuthPage.tsx
│   │   │   └── ...
│   │   ├── shared/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Input.tsx
│   │       ├── Dialog.tsx
│   │       └── Icon.tsx
│   │
│   ├── contexts/                     # React Contexts
│   │   ├── AuthContext.tsx           # Autenticación global
│   │   └── VehicleContext.tsx        # Gestión de vehículos
│   │
│   ├── hooks/                        # Hooks personalizados
│   │   ├── useAuth.ts
│   │   ├── useVehicles.ts
│   │   ├── useMediaQuery.ts
│   │   └── usePicoYPlaca.ts
│   │
│   ├── lib/                          # Utilidades y helpers
│   │   ├── utils.ts                  # Funciones Pico y Placa, matriculación
│   │   ├── firebase.ts               # Configuración Firebase
│   │   ├── api.ts                    # Llamadas API
│   │   └── constants.ts              # Constantes de la app
│   │
│   └── types/                        # TypeScript types
│       ├── index.ts
│       ├── vehicle.ts
│       ├── user.ts
│       └── alert.ts
│
├── public/                           # Activos estáticos
│   ├── logo.svg
│   ├── icons/
│   └── images/
│
├── .env.local                        # Variables de entorno (Git ignored)
├── .env.local.example                # Template de variables
├── .next/                            # Build output (Git ignored)
├── node_modules/                     # Dependencias (Git ignored)
├── package.json                      # Dependencias del proyecto
├── package-lock.json
├── tsconfig.json                     # Configuración TypeScript
├── tailwind.config.ts                # Configuración Tailwind
├── postcss.config.js                 # Configuración PostCSS
├── next.config.js                    # Configuración Next.js
├── .gitignore
├── README.md
├── QUICK_START.md
├── ADN_VYNTRA.md                     # Este archivo
└── Vyntra.html                       # Prototipo HTML original

```

### Estadísticas de Carpetas
| Carpeta | Archivos | Tipo | Propósito |
|---------|----------|------|----------|
| `src/app` | 14+ | TSX | Rutas y páginas |
| `src/components` | 15+ | TSX | Componentes UI |
| `src/contexts` | 2 | TS | State management |
| `src/hooks` | 4+ | TS | Lógica reutilizable |
| `src/lib` | 4+ | TS | Utilidades |
| `src/types` | 3+ | TS | Type definitions |

---

## 🧰 STACK TECNOLÓGICO

### Frontend
```json
{
  "next": "15.0.3",
  "react": "18.3.1",
  "react-dom": "18.3.1",
  "typescript": "5.7.2"
}
```

### Estilos y UI
```json
{
  "tailwindcss": "3.4.17",
  "postcss": "8.4.49",
  "autoprefixer": "10.4.20",
  "lucide-react": "0.462.0"
}
```

### Formularios y Validación
```json
{
  "react-hook-form": "7.53.2",
  "@hookform/resolvers": "3.3.4",
  "zod": "3.23.8"
}
```

### Backend y Servicios
```json
{
  "firebase": "10.14.1"
}
```

### Utilidades
```json
{
  "clsx": "2.1.0",
  "tailwind-merge": "2.5.5",
  "date-fns": "3.3.1",
  "framer-motion": "11.11.11",
  "react-hot-toast": "2.4.1",
  "react-calendar": "4.8.0"
}
```

### Desarrollo
```json
{
  "eslint": "9.17.0",
  "eslint-config-next": "15.0.3",
  "@types/node": "22.10.2",
  "@types/react": "18.3.17",
  "@types/react-dom": "18.3.5"
}
```

---

## 🎨 SISTEMA DE DISEÑO

### Principios de Diseño
1. **Minimalismo Moderno**: Diseño limpio con elementos esenciales
2. **Contraste Alto**: Texto blanco sobre fondo negro para accesibilidad
3. **Gradientes Propositivos**: Gradientes solo para marcar importancia
4. **Espaciado Consistente**: Sistema de escala 4px
5. **Tipografía Clara**: Una fuente (Inter) en múltiples pesos
6. **Iconografía Significativa**: Iconos de Lucide React
7. **Animaciones Sutiles**: Transiciones smooth de 200-300ms
8. **Dark Mode**: Tema oscuro como predeterminado

### Grid y Espaciado
- **Base**: 4px
- **Espacios comunes**: 8px, 12px, 16px, 24px, 32px, 48px, 64px
- **Padding componentes**: p-3, p-4, p-6, p-8
- **Margin vertical**: mb-4, mb-6, mb-8, mt-12

### Breakpoints Responsive
```typescript
// Tailwind defaults
sm: 640px   // Tablets pequeñas
md: 768px   // Tablets
lg: 1024px  // Desktops
xl: 1280px  // Desktops grandes
2xl: 1536px // Desktops extra grandes
```

### Bordes y Radios
- **Border pequeño**: border (1px)
- **Border mediano**: border-2 (2px)
- **Radio pequeño**: rounded-lg (8px)
- **Radio mediano**: rounded-xl (12px)
- **Radio grande**: rounded-2xl (16px)
- **Radio círculo**: rounded-full

### Sombras
- **Pequeña**: shadow-sm
- **Mediana**: shadow-lg
- **Grande**: shadow-2xl
- **Con color**: shadow-vyntra-blue/25

### Transiciones
- **Duración rápida**: duration-200
- **Duración normal**: duration-300
- **Transiciones comunes**:
  - `transition-all duration-300` (cambios suaves)
  - `transition-colors duration-200` (colores)
  - `hover:scale-105` (zoom leve)

---

## 🎨 PALETA DE COLORES

### Colores Primarios (Vyntra Blue)
```
┌─────────────────────────────────────┐
│ VYNTRA BLUE - Familia Principal    │
├─────────────────────────────────────┤
│ vyntra-blue:       #0A84FF (100%)   │ ← Principal
│ vyntra-blue-dark:  #0066CC (75%)    │ ← Hover/Active
│ vyntra-blue-light: #409CFF (125%)   │ ← Acent
└─────────────────────────────────────┘
```

**Usos:**
- `vyntra-blue`: Botones primarios, enlaces, acentos
- `vyntra-blue-dark`: Estados hover, texto seleccionado
- `vyntra-blue-light`: Backgrounds suaves, hover secundario

### Colores de Estado
```
┌──────────────────────────────┐
│ ESTADOS                      │
├──────────────────────────────┤
│ Éxito:    green-500          │ Verdes
│ Error:    red-600 / red-500  │ Rojos
│ Alerta:   orange-500         │ Naranjas
│ Info:     blue-400           │ Azules
│ Warning:  yellow-500         │ Amarillos
└──────────────────────────────┘
```

**Especificidades:**
- **Verde**: `green-500/10`, `green-500/20`, `green-500/50`
- **Rojo**: `red-500/20`, `red-600`, `red-500/10`
- **Naranja**: `orange-500/10`, `orange-500/20`
- **Amarillo** (Placas): `yellow-400`, `yellow-500`

### Colores de Fondo
```
┌─────────────────────────────────────┐
│ BACKGROUNDS                         │
├─────────────────────────────────────┤
│ Fondo principal:    black           │ #000000
│ Superficie:         gray-900/50     │ Ligeramente visible
│ Super elevado:      white/5         │ Muy sutil
│ Elevado:            white/10        │ Ligeramente visible
└─────────────────────────────────────┘
```

### Colores de Texto
```
┌──────────────────────────────┐
│ TEXTOS                       │
├──────────────────────────────┤
│ Primario:    white           │ Texto principal
│ Secundario:  gray-300        │ Subtítulos
│ Terciario:   gray-400        │ Meta información
│ Deshabilitado: gray-500      │ Elementos inactivos
└──────────────────────────────┘
```

### Gradientes
```scss
// Backgrounds
from-gray-800/50 to-black          // Cards normales
from-vyntra-blue to-vyntra-blue-dark // CTAs
from-green-500/20 via-green-600/10 to-black // Weekend
from-red-500/20 via-red-600/10 to-black    // Restricción activa

// Text
bg-gradient-to-r from-vyntra-blue via-blue-500 to-blue-600
bg-clip-text text-transparent
```

### Tabla de Colores Completa
| Uso | Color | Hex | Tailwind | Opacidad |
|-----|-------|-----|----------|----------|
| Marca | Azul Principal | `#0A84FF` | `vyntra-blue` | 100% |
| Marca Oscuro | Azul Oscuro | `#0066CC` | `vyntra-blue-dark` | 100% |
| Marca Claro | Azul Claro | `#409CFF` | `vyntra-blue-light` | 100% |
| Fondo | Negro | `#000000` | `black` | 100% |
| Fondo Secundario | Gris Oscuro | `#1F2937` | `gray-800` | 50% |
| Éxito | Verde | `#22C55E` | `green-500` | Var |
| Error | Rojo | `#DC2626` | `red-600` | Var |
| Alerta | Naranja | `#F97316` | `orange-500` | Var |
| Placa Ecuador | Amarillo | `#FBBF24` | `yellow-400` | 100% |
| Placa Fondo | Amarillo | `#EAB308` | `yellow-500` | 100% |

---

## 📝 TIPOGRAFÍA

### Fuente Principal
- **Familia**: Inter
- **Pesos**: 300, 400, 500, 600, 700, 800, 900
- **Origen**: Google Fonts
- **Aplicación**: Body, Headings, Labels

### Escala Tipográfica
```
┌──────────────────────────────────┐
│ TAMAÑOS DE TEXTO                 │
├──────────────────────────────────┤
│ text-xs:    12px (font-weight)   │
│ text-sm:    14px                 │
│ text-base:  16px (default)       │
│ text-lg:    18px                 │
│ text-xl:    20px                 │
│ text-2xl:   24px                 │
│ text-3xl:   30px                 │
│ text-4xl:   36px                 │
│ text-5xl:   48px                 │
│ text-6xl:   60px                 │
│ text-7xl:   72px                 │
└──────────────────────────────────┘
```

### Pesos Tipográficos
```
┌────────────────────────────────────┐
│ PESOS (font-weight)                │
├────────────────────────────────────┤
│ font-light:       300             │ Textos finos
│ font-normal:      400             │ Body text
│ font-medium:      500             │ Énfasis menor
│ font-semibold:    600             │ Subheadings
│ font-bold:        700             │ Headings
│ font-extrabold:   800             │ Títulos principales
│ font-black:       900             │ Números grandes (placas)
└────────────────────────────────────┘
```

### Jerarquía Tipográfica
```tsx
// H1 - Títulos principales
<h1 className="text-7xl font-extrabold">Evita multas</h1>

// H2 - Subtítulos de sección
<h2 className="text-4xl font-bold mb-6">Calendario Pico y Placa</h2>

// H3 - Títulos de tarjetas
<h3 className="text-2xl font-semibold">Lunes</h3>

// H4 - Subtítulos
<h4 className="text-lg font-semibold text-vyntra-blue">¿Qué recibirás?</h4>

// Cuerpo
<p className="text-base text-gray-300">Consulta normativa...</p>

// Meta
<p className="text-xs text-gray-500">Última actualización: 22/02/2026</p>

// Énfasis dentro de párrafo
<span className="font-semibold text-vyntra-blue">Restricción</span>
```

### Medidas de Línea
- **Headings**: `leading-tight` o `leading-none`
- **Body**: `leading-relaxed` (1.625)
- **Compacto**: `leading-normal` (1.5)

---

## 🧩 COMPONENTES

### Componentes UI Base

#### 1. Button
**Ubicación**: `src/components/ui/Button.tsx`

**Variantes:**
- `primary`: Azul principal (CTA)
- `secondary`: Blanco/10 (acciones secundarias)
- `outline`: Borde blanco (acciones terciarias)
- `ghost`: Transparente (enlaces)
- `danger`: Rojo (acciones destructivas)

**Tamaños:**
- `sm`: Pequeño (px-4 py-2)
- `md`: Mediano (px-6 py-3)
- `lg`: Grande (px-8 py-4)

**Estados:**
- Normal
- Hover (scale-105)
- Active (darker)
- Disabled (opacity-50)
- Loading (spinner)

```tsx
<Button variant="primary" size="md" fullWidth>
  Registrar mi vehículo
</Button>
```

#### 2. Card
**Ubicación**: `src/components/ui/Card.tsx`

**Estructura:**
- Fondo: `bg-white/5` o `bg-gradient-to-br`
- Borde: `border border-white/10`
- Radio: `rounded-2xl`
- Padding: `p-6`
- Hover: `hover:border-vyntra-blue/50`

```tsx
<Card className="p-6">
  <h3 className="font-bold">Título</h3>
  <p className="text-gray-400">Contenido</p>
</Card>
```

#### 3. Input
**Ubicación**: `src/components/ui/Input.tsx`

**Estilos:**
- Fondo: `bg-white/5`
- Borde: `border border-white/10`
- Focus: `border-vyntra-blue ring-1 ring-vyntra-blue`
- Radio: `rounded-xl`
- Padding: `px-4 py-2`

```tsx
<Input 
  type="text" 
  placeholder="Placa vehicular"
  className="w-full"
/>
```

#### 4. Dialog/Modal
**Ubicación**: `src/components/ui/Dialog.tsx`

**Componentes:**
- Dialog
- DialogTrigger
- DialogContent
- DialogHeader
- DialogTitle
- DialogDescription
- DialogFooter

```tsx
<Dialog>
  <DialogTrigger>Abrir</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Título</DialogTitle>
    </DialogHeader>
  </DialogContent>
</Dialog>
```

#### 5. Badge
**Estilos:**
- HOY: `px-3 py-1 bg-vyntra-blue text-white rounded-full animate-pulse`
- ALERTA: `px-2 py-1 bg-red-500 text-white rounded-full animate-bounce`

### Componentes de Página

#### LandingPage
**Ubicación**: `src/components/pages/LandingPage.tsx`

**Secciones:**
1. Hero con CTA
2. Features
3. Calendarios (Pico y Placa + Matrícula)
4. CTA secundario
5. FAQs
6. Newsletter

#### Navbar
**Ubicación**: `src/components/shared/Navbar.tsx`

**Elementos:**
- Logo
- Navigation Links
- Auth Links
- Mobile Menu (hamburger)
- Sticky top con backdrop-blur

#### Footer
**Ubicación**: `src/components/shared/Footer.tsx`

**Secciones:**
- Redes sociales
- Enlaces legales
- Contacto
- Copyright

---

## 📄 PÁGINAS

### 1. Home (Landing Page) - `/`
**Archivo**: `src/app/page.tsx`

**Contenido:**
- Hero section con CTA principal
- Descripción de Vyntra
- Visual del calendario
- Features principales
- Llamadas a acción
- FAQ
- Newsletter signup

**Meta Tags:**
- Title: "Vyntra – Protección Inteligente para tu Vehículo"
- Description: "Consulta normativa, activa alertas y recibe asesoría especializada en tránsito en Quito. Evita multas antes de que ocurran."

---

### 2. Calendario (Pico y Placa + Matrícula) - `/calendario`
**Archivo**: `src/app/calendario/page.tsx`

**Secciones:**

#### A. Calendario Semanal Pico y Placa
- Visualización de lunes a domingo
- Cada día muestra:
  - Nombre del día
  - Badge "HOY" si es día actual
  - Placa Ecuador de diseño (si hay restricción)
  - Checkmark (vacaciones)

**Placa Ecuador:**
- Fondo: Amarillo (yellow-400 → yellow-500 gradient)
- Texto: Números negros (gray-900)
- Flag stripe: Arriba (yellow → blue → red)
- ECUADOR: Texto pequeño (9px) abajo
- Scale: Normal 1, HOY 1.25x
- Números: red (si HOY), gris (normal)

**Días Special:**
- Domingo: Verde (vacaciones)
- Lunes-Viernes: Gris (restricción)
- Sábado: Siempre verde (vacaciones)
- HOY: Scale-105 con ring azul

#### B. Calendario de Matrícula 2026
- 12 meses en grid
- Cada mes muestra:
  - Número del mes
  - Nombre del mes
  - Último dígito de placa (cuando aplicable)
  - Estado (Matricular, Con recargo, Rezagados)

**Estados:**
- Mes actual: Fondo azul, border azul
- Meses pasados: Fondo gris, border gris
- Meses futuros: Fondo blanco/5, border white/10

**Cronograma 2026:**
- Febrero (1): Placas terminadas en 1
- Marzo (2): Placas terminadas en 2
- Abril (3): Placas terminadas en 3
- Mayo (4): Placas terminadas en 4
- Junio (5): Placas terminadas en 5
- Julio (6): Placas terminadas en 6
- Agosto (7): Placas terminadas en 7
- Septiembre (8): Placas terminadas en 8
- Octubre (9): Placas terminadas en 9
- Noviembre (10/0): Placas terminadas en 0
- Diciembre: Rezagados

#### C. Información de Matrícula
- Documentos requeridos
- Estado del vehículo
- Costo de matrícula
- Lugares para matricular

#### D. Información de RTV
- Cronograma RTV 2026
- Costos
- Centros de revisión en Quito
- Documentos necesarios

#### E. Información de Multas
- Valores de multas
- Incrementos por retraso
- Cómo pagar

---

### 3. Mapas Integrados - `/mapas`
**Archivo**: `src/app/mapas/page.tsx`

**Contenido:**
- 3 Google My Maps embebidos
- Cada uno en una tarjeta

**Mapas:**

1. **Pico y Placa - Zonas**
   - ID: `1ZEtTyI3ecSzRRMugah_gtuxJMXAkTOwm`
   - Muestra zonas de restricción Pico y Placa en Quito
   - URL: `https://www.google.com/maps/d/u/0/embed?mid=...&ehbc=2E312F`

2. **Zonas Administrativas**
   - ID: `1HM7cqGL1Q0oRj_obNzjcJQIUzSaZeSw`
   - Muestra divisiones administrativas de Quito
   - URL: `https://www.google.com/maps/d/u/0/embed?mid=...&ehbc=2E312F`

3. **Juzgados y Unidades Judiciales**
   - ID: `1HQOIj7WsXITktP_jFxQqq7OFmt0Kl6c7`
   - Ubicación de juzgados de tránsito
   - URL: `https://www.google.com/maps/d/u/0/embed?mid=...&ehbc=2E312F`

**Parámetro especial:** `&ehbc=2E312F` (estilos en mapa)

---

### 4. Trámites - `/tramites`
**Archivo**: `src/app/tramites/page.tsx`

**Contenido:**
- Información sobre matriculación
- Revisión técnica vehicular (RTV)
- Centros de servicio
- Requisitos y documentos
- Costos
- Horarios

---

### 5. Contacto - `/contacto`
**Archivo**: `src/app/contacto/page.tsx`

**Contenido:**
- Formulario de contacto
- Datos de contacto
- Email: contacto@vyntra.com
- Redes sociales
- Ubicación (si aplica)

---

### 6. Nosotros - `/nosotros`
**Archivo**: `src/app/nosotros/page.tsx`

**Contenido:**
- Quiénes somos
- Misión y visión
- Valores
- Equipo
- Historia de Vyntra

---

### 7. Autenticación

#### Login - `/auth`
**Archivo**: `src/app/auth/page.tsx`

**Contenido:**
- Formulario de login
- Email + Contraseña
- "Olvidé mi contraseña"
- "No tengo cuenta"

#### Registro - `/registro`
**Archivo**: `src/app/registro/page.tsx`

**Contenido:**
- Registro de usuario
- Selección de tipo de vehículo
- Datos del vehículo
- Términos y condiciones
- Integración con Firebase Auth

#### Recuperación de Contraseña - `/recuperar-password`
**Archivo**: `src/app/recuperar-password/page.tsx`

**Contenido:**
- Ingreso de email
- Reset link por correo

---

### 8. Legal

#### Términos de Servicio - `/terminos`
**Archivo**: `src/app/terminos/page.tsx`

**Contenido:**
- Términos de uso
- Responsabilidades
- Limitaciones

#### Política de Privacidad - `/privacidad`
**Archivo**: `src/app/privacidad/page.tsx`

**Contenido:**
- Cómo usamos datos
- Protección de información
- Cookies
- Derechos del usuario

---

### 9. Dashboard (Autenticado) - `/dashboard`
**Archivo**: `src/app/dashboard/page.tsx`

**Contenido:**
- Resumen de vehículos
- Próximas fechas de vencimiento
- Alertas activas
- Historial de notificaciones

---

## ⚙️ FUNCIONALIDADES

### 1. Gestión de Pico y Placa
**Archivo**: `src/lib/utils.ts`

**Función**: `getPicoPlacaToday()`
- Retorna: Objeto con `isRestricted`, `restrictedDigits`, `message`
- Lógica:
  - Lunes: 1, 2
  - Martes: 3, 4
  - Miércoles: 5, 6
  - Jueves: 7, 8
  - Viernes: 9, 0
  - Sábado-Domingo: Sin restricción

```typescript
const schedule = {
  1: [1, 2],  // Monday
  2: [3, 4],  // Tuesday
  3: [5, 6],  // Wednesday
  4: [7, 8],  // Thursday
  5: [9, 0],  // Friday
  6: [],      // Saturday
  0: [],      // Sunday
}
```

### 2. Calendario de Matrícula
**Función**: `getDaysUntilMatricula()`
- Retorna: Objeto con `daysUntil`, `nextMonth`, `digit`, `message`
- Cálculo: Basado en el último dígito de la placa
- Meses: 1=Feb, 2=Mar, 3=Apr, ..., 0/10=Nov

```typescript
const months = [
  'Noviembre', 'Febrero',  'Marzo',     'Abril',
  'Mayo',      'Junio',    'Julio',     'Agosto',
  'Septiembre','Octubre',  null,        null
]
```

### 3. Alertas (Firebase)
**Estructura:**
```typescript
type Alert = {
  id: string
  userId: string
  vehicleId: string
  type: 'pico-y-placa' | 'matricula' | 'rtv'
  message: string
  date: Date
  read: boolean
  actionUrl?: string
}
```

### 4. Autenticación (Firebase Auth)
**Métodos soportados:**
- Email + Contraseña
- (Futuro) Google Sign-in
- (Futuro) Apple Sign-in

**Contexto**: `AuthContext`
```typescript
{
  user: User | null
  loading: boolean
  login: (email, password) => Promise
  logout: () => Promise
  signup: (email, password) => Promise
}
```

### 5. Gestión de Vehículos
**Hook**: `useVehicles()`

**Operaciones CRUD:**
- Crear vehículo
- Leer vehículos del usuario
- Actualizar datos
- Eliminar vehículo

**Estructura Vehículo:**
```typescript
type Vehicle = {
  id: string
  userId: string
  plate: string
  brand: string
  model: string
  year: number
  type: 'auto' | 'moto' | 'bus' | 'truck'
  lastMatricula: Date
  lastRTV: Date
  createdAt: Date
  updatedAt: Date
}
```

### 6. Búsqueda Responsive
**Hook**: `useMediaQuery(query: string)`
- Detecta cambios de breakpoint
- Usado para mobile menu, layouts adaptativos

---

## 🔌 APIS E INTEGRACIONES

### Firebase
**Configuración**: `src/lib/firebase.ts`

**Servicios:**
- Authentication (Email/Password)
- Firestore (Realtime Database)
- Storage (File upload)

**Variables de entorno:**
```env
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_AUTH_DOMAIN
NEXT_PUBLIC_PROJECT_ID
NEXT_PUBLIC_STORAGE_BUCKET
NEXT_PUBLIC_MESSAGING_SENDER_ID
NEXT_PUBLIC_APP_ID
```

### Google Maps
**Integración**: Iframes embebidos en `/mapas`

**URLs Base:**
```
https://www.google.com/maps/d/u/0/embed?mid=MAP_ID&ehbc=2E312F
```

**Mapas Disponibles:**
- Pico y Placa: `1ZEtTyI3ecSzRRMugah_gtuxJMXAkTOwm`
- Zonas: `1HM7cqGL1Q0oRj_obNzjcJQIUzSaZeSw`
- Judiciales: `1HQOIj7WsXITktP_jFxQqq7OFmt0Kl6c7`

### APIs Externas (Potencial)
- **AMT Quito**: Información oficial de tránsito
- **Banco Central**: Valores de multas
- **Municipio Quito**: Datos geográficos

---

## 💾 BASE DE DATOS

### Firestore Structure
```
users/
├── {userId}
│   ├── email: string
│   ├── name: string
│   ├── phone: string
│   ├── createdAt: timestamp
│   ├── updatedAt: timestamp
│   └── vehicles/
│       └── {vehicleId}
│           ├── plate: string
│           ├── brand: string
│           ├── model: string
│           ├── year: number
│           ├── type: string
│           ├── lastMatricula: timestamp
│           ├── lastRTV: timestamp
│           └── alerts/
│               └── {alertId}
│                   ├── type: string
│                   ├── message: string
│                   ├── date: timestamp
│                   ├── read: boolean
│                   └── actionUrl: string

alerts/
├── {alertId}
│   ├── userId: string
│   ├── vehicleId: string
│   ├── type: string
│   ├── message: string
│   ├── date: timestamp
│   ├── read: boolean
│   └── actionUrl: string

settings/
├── app-config
│   ├── version: string
│   ├── lastUpdate: timestamp
│   └── maintenance: boolean
```

---

## 📋 CONVENCIONES DE CÓDIGO

### TypeScript
- **Strict Mode**: Habilitado en `tsconfig.json`
- **Tipos Explícitos**: Siempre usados en funciones y componentes
- **NPM Naming**: camelCase para variables
- **Path Aliases**: `@/` para `src/`

### Componentes React
- **Functional Components**: Todos son funcionales
- **Client Components**: Etiqueta `'use client'` cuando sea necesario
- **Props Interface**: `interface ComponentProps extends HTMLAttributes`
- **Condicionales**: Usar `&&` y ternarios
- **Keys**: Siempre en listas (índice como último recurso)

### Naming Conventions
```
Componentes:    PascalCase      (Button, Card, LandingPage)
Funciones:      camelCase       (getPicoPlacaToday)
Variables:      camelCase       (isRestricted, restrictedDigits)
Constantes:     UPPER_SNAKE     (STORAGE_KEY, API_BASE_URL)
Archivos:
  - Componentes:  .tsx (PascalCase)
  - Utilidades:   .ts  (camelCase)
  - Tipos:        .d.ts (describes)
```

### Estructura de Archivos
```tsx
// 1. Imports
import React from 'react'
import { useState } from 'react'
import Button from '@/components/ui/Button'

// 2. Types
interface ComponentProps {
  title: string
  onClick: () => void
}

// 3. Component
export default function Component({ title, onClick }: ComponentProps) {
  const [state, setState] = useState('')
  
  return (
    <div className="...">
      {title}
    </div>
  )
}
```

### Estilos Tailwind
- **Orden**: Responsive → Positioning → Display → Sizing → Spacing → Colors → Effects
- **Clases Largas**: Usar template literals si excede 80 caracteres
- **Reutilización**: Extraer a componentes, no crear clases CSS custom

```tsx
// ✅ Bien
const cardClasses = `p-6 rounded-2xl bg-white/5 border border-white/10 
  hover:border-vyntra-blue/50 transition-colors duration-300`

// ✅ También bien
<div className={`
  p-6 rounded-2xl
  bg-white/5 border border-white/10
  hover:border-vyntra-blue/50
  transition-colors duration-300
`}>
```

### Comentarios
- Comentarios de línea: `//` para código complejo
- Comentarios de bloque: `/* */` para secciones
- JSDoc: Para funciones públicas
- TODO: Marcar trabajo futuro con `// TODO:`

```tsx
// Obtiene las restricciones de pico y placa para hoy
export function getPicoPlacaToday(): PicoPlacaData {
  /*
    La restricción Pico y Placa en Quito funciona de
    lunes a viernes, excepto feriados nacionales.
  */
  
  const schedule = {
    1: [1, 2],
    // ... resto del schedule
  }
  
  // TODO: Implementar excepciones de feriados
  return calculateRestriction(schedule)
}
```

### Git Commits
```
[tipo]: Descripción breve

Descripción más detallada si es necesario.
- Lista de cambios específicos
- Tickets relacionados

Tipos:
- feat:    Nueva funcionalidad
- fix:     Corrección de bug
- style:   Cambios de estilo/formato
- refactor: Refactorización sin cambio funcional
- perf:    Mejoras de rendimiento
- docs:    Cambios en documentación
- chore:   Cambios en dependencias
```

---

## 📊 ESTADÍSTICAS DEL PROYECTO

### Métricas
| Métrica | Cantidad |
|---------|----------|
| Páginas | 10+ |
| Componentes UI | 15+ |
| Rutas | 14+ |
| TypeScript Files | 30+ |
| Líneas de Código | 5000+ |
| Tamaño Dependencias | ~500MB (node_modules) |
| Build Size | ~2-3MB (optimizado) |

### Performance
- **Lighthouse**: Target >= 90
- **Core Web Vitals**: LCP <2.5s, FID <100ms, CLS <0.1
- **Bundle Size**: <50KB (gzipped, sin node_modules)
- **Time to Interactive**: <3s

### SEO
- Meta tags completos
- Open Graph configurado
- Sitemap dinámico (futuro)
- Schema.org markup (futuro)

---

## 🚀 DEPLOYMENT

### Plataforma Recomendada: Vercel
- Deploy automático desde GitHub
- Preview automáticas
- Analytics de performance
- Edge functions (futuro)

### Variables de Entorno para Producción
```env
NEXT_PUBLIC_FIREBASE_API_KEY=xxx
NEXT_PUBLIC_AUTH_DOMAIN=xxx
NEXT_PUBLIC_PROJECT_ID=xxx
NEXT_PUBLIC_STORAGE_BUCKET=xxx
NEXT_PUBLIC_MESSAGING_SENDER_ID=xxx
NEXT_PUBLIC_APP_ID=xxx
NEXT_PUBLIC_SITE_URL=https://vyntra.com
NODE_ENV=production
```

### Build Command
```bash
npm run build
npm run start
```

---

## 📱 SOPORTE Y CONTACTO

**Email**: contacto@vyntra.com
**Creador**: Henry Zavala
**Año**: 2026
**Ubicación**: Quito, Ecuador

---

## 📄 CAMBIOS Y VERSIONES

### v1.0.0 (22 Feb 2026) - Lanzamiento Inicial
- ✅ Landing page completa
- ✅ Sistema de calendario Pico y Placa
- ✅ Calendario de matrícula 2026
- ✅ Integración de mapas Google
- ✅ Sistema de autenticación Firebase
- ✅ Página de trámites
- ✅ Contacto y FAQ

### Futuras Mejoras (Roadmap)
- [ ] App móvil (React Native)
- [ ] Notificaciones push
- [ ] Google Sign-in / Apple Sign-in
- [ ] Historial de alertas
- [ ] Integración con APIs oficiales AMT
- [ ] Búsqueda de multas por placa
- [ ] Sistema de puntos y licencia
- [ ] Chat de soporte en tiempo real
- [ ] Reportes e informes PDF
- [ ] Exportación de datos

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

- [x] Estructura Next.js 15 completa
- [x] TypeScript strict mode
- [x] Tailwind CSS configurado
- [x] Componentes UI base
- [x] Páginas principales
- [x] Lógica Pico y Placa
- [x] Calendario matrícula
- [x] Firebase configurado (template)
- [x] Google Maps integrados
- [x] Responsive design
- [x] Dark mode
- [x] Animaciones
- [x] SEO meta tags
- [x] Documentación
- [ ] Pruebas unitarias
- [ ] E2E testing
- [ ] Performance optimization
- [ ] Analytics tracking
- [ ] Error handling global
- [ ] Internacionalización (i18n)

---

**Documento generado**: 22 de febrero de 2026  
**Última actualización**: 22 de febrero de 2026  
**Próxima revisión**: 01 de marzo de 2026

---

*Este documento es el compendio completo del ADN de Vyntra. Cualquier cambio significativo debe ser registrado aquí.*
