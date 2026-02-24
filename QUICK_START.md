# 🚀 Guía Rápida de Inicio - Vyntra

## Instalación Rápida (5 minutos)

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar Firebase

1. Ve a https://console.firebase.google.com/
2. Crea un proyecto nuevo
3. Habilita Authentication > Email/Password
4. Crea una base de datos Firestore
5. Copia las credenciales

### 3. Crear archivo .env.local

Crea un archivo `.env.local` en la raíz con:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key_aqui
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu-proyecto-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Ejecutar el proyecto

```bash
npm run dev
```

Abre http://localhost:3000

## 🎯 Características Principales

### Páginas Disponibles:

- **/** - Landing page
- **/auth** - Inicio de sesión
- **/registro** - Registro de usuarios y vehículos
- **/dashboard** - Panel de usuario
- **/calendario** - Calendario vehicular
- **/mapas** - Mapas de Quito
- **/tramites** - Guías de trámites
- **/terminos** - Términos de servicio
- **/privacidad** - Política de privacidad
- **/nosotros** - Quiénes somos
- **/contacto** - Formulario de contacto
- **/recuperar-password** - Recuperación de contraseña

### Componentes Clave:

- `Navbar` - Navegación principal responsive
- `Footer` - Pie de página con enlaces legales
- `Button` - Botones reutilizables con variantes
- `Input` - Campos de formulario con validación
- `Card` - Tarjetas de contenido
- `Dialog` - Modales y diálogos

### Contexts:

- `AuthContext` - Gestión de autenticación
- (Puedes agregar más según necesites)

### Hooks Personalizados:

- `useVehicles` - CRUD de vehículos
- `useMediaQuery` - Detección de breakpoints responsive

## 📚 Estructura de Carpetas

```
src/
  app/          → Páginas Next.js 14 (App Router)
  components/   → Componentes React
    pages/      → Componentes de páginas completas
    shared/     → Navbar, Footer, etc.
    ui/         → Button, Input, Card, etc.
  contexts/     → React Contexts
  hooks/        → Custom Hooks
  lib/          → Utilidades y Firebase
  types/        → TypeScript types
```

## 🎨 Personalización

### Colores (tailwind.config.ts)

```typescript
colors: {
  'vyntra-blue': '#0A84FF',
  'vyntra-blue-dark': '#0066CC',
  'vyntra-blue-light': '#409CFF',
}
```

### Tipografía

Usa la fuente Inter (ya configurada):
```tsx
<h1 className="font-bold text-4xl">Título</h1>
<p className="font-medium">Texto normal</p>
```

## 🔧 Comandos Útiles

```bash
npm run dev          # Desarrollo
npm run build        # Build producción
npm run start        # Servidor producción
npm run lint         # Linter
npm run type-check   # Verificar tipos
```

## 🐛 Solución de Problemas Comunes

### Error: Firebase no configurado
→ Verifica que `.env.local` existe y tiene todas las variables

### Error: Cannot find module
→ Ejecuta `npm install` nuevamente

### Error: Port 3000 already in use
→ Usa otro puerto: `npm run dev -- -p 3001`

### Estilos no se aplican
→ Verifica que `globals.css` esté importado en `layout.tsx`

## 📱 Testing Responsive

Prueba en diferentes tamaños:
- Mobile: Chrome DevTools (Cmd+Opt+I → Toggle Device Toolbar)
- Tablet: iPad Pro en DevTools
- Desktop: Pantalla completa

## 🚀 Deploy Rápido en Vercel

1. Push tu código a GitHub
2. Ve a vercel.com
3. Import Repository
4. Agrega las variables de entorno
5. Deploy!

## 📞 ¿Necesitas Ayuda?

- Revisa el README.md completo
- Consulta la documentación de Next.js: nextjs.org/docs
- Firebase docs: firebase.google.com/docs

---

**¡Listo para desarrollar! 🎉**
