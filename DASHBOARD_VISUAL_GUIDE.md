# 🎨 Dashboard Oscuro - Guía Visual

## Paleta de Colores Dashboard

El dashboard utiliza una paleta **tech-dark** con contraste máximo:

```
Fondo base: #030712 (Ultra oscuro)
Fondo gradiente: from-[#030712] via-[#0a0f1a] to-[#0f1520]

Indicadores de estado:
├─ Verde (Activo): #10b981 (emerald-400)
├─ Amarillo (Alerta): #fbbf24 (yellow-400)
├─ Rojo (Error): #ef4444 (red-400)
├─ Azul (Info): #3b82f6 (blue-400)
└─ Púrpura (Especial): #a855f7 (purple-400)

Bordes: border-white/10
Hovers: bg-white/10 con transiciones suaves
Sombras: shadow-2xl y shadow-3xl para elevación
```

---

## 📊 Componentes Principales

### 1. Quick Stats (4 cards)

**Estructura:**
```
┌─────────────────────┐
│ Vehículos      🚗   │ ← Ícono con fondo gradiente
│ 1                   │
│ (num)               │
└─────────────────────┘
```

**Características:**
- ✅ Fondo gradiente `from-white/5 to-white/[0.02]`
- ✅ Borde: `border border-white/10`
- ✅ Sombra elevada: `shadow-2xl hover:shadow-3xl`
- ✅ Cada card tiene ICO con su color
  - Vehículos: Azul (vyntra-brand)
  - Alertas: Amarillo (animate-pulse)
  - Trámites: Verde (green-400)
  - Ahorrado: Esmeralda (emerald-400)

**Contexto agregado:**
```
"Alertas activas"
3
├─ "de 5 máximo" ← Contexto
└─ (small text)

"Ahorrado este año"
$1,250
├─ "en multas evitadas" ← Contexto
└─ (small text)
```

---

### 2. Featured Vehicle Status Card

**Estructura:**
```
┌─────────────────────────────────────┐
│ ABC-1234           [✓ Al día] ← badge|
│ Sedan • Registrado                  |
│                                     |
│ ┌─────────────┐ ┌─────────────┐    |
│ │ Pico Placa  │ │  Matrícula  │    |
│ │ (Rojo/Verde)│ │  120 días   │    |
│ │             │ │             │    |
│ └─────────────┘ └─────────────┘    |
│     ┌──────────────────────────┐   |
│     │  Estado del Vehículo     │   |
│     │  ✓ Alertas al día        │   |
│     └──────────────────────────┘   |
└─────────────────────────────────────┘
```

**Características:**
- ✅ Fondo: `bg-gradient-to-br from-vyntra-brand/20 to-transparent`
- ✅ Borde dinámico: `border-vyntra-brand/30`
- ✅ Badge de estado: Pulsa con `animate-pulse`
- ✅ Tarjetas internas con colores según estado:
  - Rojo si está restricción
  - Verde si puede circular
  - Azul para matrícula
  - Esmeralda para RTV

**Status Badges:**
```
Cada sub-card tiene:
├─ Punto pulsante (animate-pulse)
├─ Texto de estado (color matching)
└─ Descripción adicional

Ejemplo:
🔴 (pulso) "Restringido"
           "6am-9:30am"
```

---

### 3. Alertas Recientes

**Estructura:**
```
┌─────────────────────────────────────┐
│ Alertas Recientes                   |
│                                     |
│ ⚠️ (amarillo) Matrícula próximo mes │
│              Recuerda renovar...    │
│              [pulso]                |
│                                     |
│ 🔔 (azul) Nueva normativa          │
│           Cambios en pico y placa  │
│           [sin pulso]               |
│                                     |
│ [Ver todas las alertas →]          |
└─────────────────────────────────────┘
```

**Características:**
- ✅ Cada alerta es un `flex` con gap-3
- ✅ Ícono a la izquierda (color matching)
- ✅ Contenido flexible a la derecha
- ✅ Fondo: `from-[color]/10 to-[color]/5`
- ✅ Borde: `border-[color]/30`
- ✅ Hover: `hover:bg-[color]/15 transition`

---

### 4. Accesos Rápidos

**Estructura:**
```
┌──────────────────────────────────┐
│ [🗓️] Calendario                  |
│      Ver fechas importantes  →   |
│                                  |
│ [📍] Mapas                       |
│      Centros AMT y zonas     →   |
│                                  |
│ [✓] Normativa                    |
│      Guías y explicadas      →   |
└──────────────────────────────────┘
```

**Características:**
- ✅ Card dentro de card
- ✅ Ícono con fondo coloreado (cada uno su color)
- ✅ Hover: `hover:bg-white/10 border border-white/10`
- ✅ El ícono crece al hover: `group-hover:scale-110`
- ✅ Flecha animada: `group-hover:translate-x-1`

---

## 🎯 Indicadores Visuales Dinámicos

### Puntos Pulsantes
```css
<span class="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
```
Uso:
- ✅ Estado "Al día"
- ✅ Alertas activas
- ✅ Elementos que requieren atención

### Badge de Estado
```html
<div class="px-4 py-2 bg-gradient-to-r from-[color]/20 to-[color]/10 border border-[color]/30 rounded-full flex items-center gap-2">
  <span class="w-2 h-2 bg-[color] rounded-full animate-pulse" />
  <span class="text-sm font-medium text-[color]">[Estado]</span>
</div>
```

### Iconos Contextuales
```
AlertCircle (amarillo)   = Precaución/Próximo vencimiento
Bell (amarillo)          = Notificación importante
CheckCircle (verde)      = Completado/Al día
MapPin (azul/esmeralda)  = Ubicación
Calendar (azul)          = Secciones relacionadas a fechas
```

---

## 🖼️ Gradientes Usados

### Cards Principales
```css
bg-gradient-to-br from-white/5 to-white/[0.02]
```

### Vehicle Status
```css
bg-gradient-to-br from-vyntra-brand/20 to-transparent
```

### Alertas
```css
/* Amarillo (precaución) */
bg-yellow-500/10
border-yellow-500/30

/* Azul (info) */
bg-vyntra-brand/10
border-vyntra-brand/30

/* Verde (éxito) */
bg-green-500/10
border-green-500/30
```

---

## 📱 Responsive Design

```
Mobile (< 640px)
├─ Quick Stats: 1 columna
├─ Vehicle Status: Full width
└─ Alertas + Accesos: Stacked

Tablet (640px - 1024px)
├─ Quick Stats: 2 columnas
├─ Vehicle Status: 2/3 grid
└─ Alertas + Accesos: 2 columnas

Desktop (> 1024px)
├─ Quick Stats: 4 columnas
├─ Vehicle Status: Full width con 3 sub-cards
└─ Alertas + Accesos: 2 columnas
```

---

## 🎯 Estados y Transiciones

### Hover States
```css
/* Cards */
hover:shadow-3xl
hover:border-white/20

/* Botones */
hover:scale-105
active:scale-95

/* Textos */
hover:text-white
hover:translate-x-1
```

### Animaciones
```css
animate-pulse        → Puntos de estado
animate-in           → Menús emergentes
slide-in-from-top    → Transiciones
fade-in              → Apariciones suaves
transition-all       → Todo tiene transición
duration-300         → Velocidad estándar
```

---

## 🔧 Estructura del Código

```tsx
<Card className="bg-gradient-to-br from-white/5 to-white/[0.02] 
                  border border-white/10 
                  shadow-2xl hover:shadow-3xl 
                  hover:border-white/20 
                  transition-all duration-300">
  <CardContent>
    <div className="flex items-center justify-between">
      {/* Contenido */}
      <div>
        <p className="text-sm text-white/60 mb-1">{label}</p>
        <p className="text-3xl font-bold text-white">{value}</p>
        <p className="text-xs text-white/40 mt-1">{context}</p>
      </div>
      {/* Ícono */}
      <div className="w-12 h-12 
                      bg-gradient-to-br from-[color]/30 to-[color]/10 
                      rounded-xl 
                      flex items-center justify-center 
                      border border-[color]/20
                      animate-pulse/hover">
        <Icon className="w-6 h-6 text-[color]" />
      </div>
    </div>
  </CardContent>
</Card>
```

---

## 📊 Paleta por Estado

Cada estado visual tiene su color:

```
ESTADO          | COLOR      | ÍCONO              | ANIMACIÓN
────────────────┼────────────┼────────────────────┼─────────────
Al día          | Verde      | CheckCircle        | Pulso
Próximo evento  | Amarillo   | AlertCircle/Bell   | Pulso
Alerta/Error    | Rojo       | AlertCircle        | Fijo
Información     | Azul       | Info/File/Mapa     | Fijo
Especial        | Púrpura    | Calendar           | Fijo
```

---

## ✨ Mejoras Implementadas

| Feature | Antes | Después |
|---------|-------|---------|
| Fondo | Negro sólido | Gradiente oscuro |
| Cards | Básicas | Elevadas (shadow-2xl) |
| Contexto | Mínimo | Con subtextos |
| Indicadores | Estáticos | Pulsantes dinámicos |
| Badges | Simples | Gradientes + puntos |
| Colores | Monocromo | Multicolor contextual |
| Transiciones | Ninguna | Suaves (300ms) |
| Hover | Mínimo | Escala + sombra |

---

## 🎯 Próximos Pasos

- [ ] Gráficos (Chart.js o Recharts)
- [ ] Exportar reportes PDF
- [ ] Historial de alertas
- [ ] Notificaciones push
- [ ] Darkmode toggle (si se requiere)

