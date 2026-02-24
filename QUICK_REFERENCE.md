# 🚀 VYNTRA v1.0 - REFERENCIA RÁPIDA

## 📖 EMPEZAR AQUÍ

1. **Lee primero**: [VYNTRA_v1.0_LANZAMIENTO.md](./VYNTRA_v1.0_LANZAMIENTO.md)
2. **Estructura**: [ESTRUCTURA_v1.0.md](./ESTRUCTURA_v1.0.md)
3. **Detalles**: [ADN_VYNTRA.md](./ADN_VYNTRA.md)

---

## ⚡ SETUP RÁPIDO (5 minutos)

### 1. Instalar dependencias
```bash
npm install
```

### 2. Crear Supabase Project
```
supabase.com → Create Project → Settings → API
Copiar URL + Anon Key
```

### 3. Crear tabla en Supabase SQL
```sql
CREATE TABLE vehicles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  plate text NOT NULL,
  email text NOT NULL,
  city text NOT NULL,
  last_digit int NOT NULL,
  registration_month text NOT NULL,
  created_at timestamptz DEFAULT now()
);
```

### 4. Actualizar .env.local
```env
NEXT_PUBLIC_SUPABASE_URL=https://...supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

### 5. Dev Server
```bash
npm run dev
# http://localhost:3001
```

---

## 🎨 DISEÑO v1.0

**Paleta Actualizada**:
- Navbar/Footer: `#1B3A6F` (Azul profundo)
- Primary: `#0A84FF` (Azul vyntra)
- Fondo: Blanco 100% + Gris-50 alterno
- Borders: Gris-100/200 (suave)

**Componentes Nuevos**:
- `Section` - Wrapper max-w-6xl py-20
- `Card` - Blanca con borde gris, hover shadow
- `StatusCard` - Estado legal
- `NextEventCard` - Próximo evento
- `ScoreGauge` - Puntuación 0-100
- `UpgradeBanner` - CTA premium

---

## 📄 PÁGINAS LISTAS

| Ruta | Descripción | Estado |
|------|-------------|--------|
| `/` | Home rediseñada | ✅ Blanca profesional |
| `/matricula-quito-paso-a-paso` | Guía SEO | ✅ H1 + 4 pasos + tabla |
| `/registrar-vehiculo` | Formulario | ✅ Supabase INSERT |
| `/mi-vehiculo` | Dashboard | ✅ Búsqueda + Info |
| `/calendario` | Pico y Placa | ✅ Operativo |
| `/mapas` | Google My Maps | ✅ 3 mapas |

---

## 🧠 SCORE ENGINE

**Archivo**: `src/lib/scoreEngine.ts`

```typescript
// Penalidades
Multa activa:     -10 (x cantidad)
Matrícula vencida: -15
RTV vencida:      -10
Historial 2+ multas: -5
Infracciones pico: -8 (x cantidad)
Meses retraso:    -2 (x mes)

// Resultado
80-100: ✅ Bajo riesgo (verde)
60-79: ⚠️ Medio (amarillo)
0-59: ❌ Alto riesgo (rojo)
```

---

## 🔗 RUTAS ÚTILES

```
Desarrollo        http://localhost:3001
Home              http://localhost:3001
Matricula SEO     http://localhost:3001/matricula-quito-paso-a-paso
Registrar         http://localhost:3001/registrar-vehiculo
Mi vehículo       http://localhost:3001/mi-vehiculo
Calendario        http://localhost:3001/calendario
Mapas             http://localhost:3001/mapas
```

---

## 📊 FICHEROS CLAVE

| Archivo | Cambio | Nota |
|---------|--------|------|
| `src/app/page.tsx` | ✨ Rediseñada | Home blanca |
| `tailwind.config.ts` | ✨ Actualizada | Colores v1.0 |
| `src/lib/supabase.ts` | ✨ Nueva | Cliente Supabase |
| `src/lib/scoreEngine.ts` | ✨ Nueva | Score logic |
| `src/components/ui/Card.tsx` | ✨ Actualizada | Blanca minimalista |
| `src/components/dashboard/*` | ✨ Nuevos | 4 componentes |

---

## 🚀 PRÓXIMOS PASOS

### Fase 2 (1-2 semanas)
```
- Supabase Auth real
- Proteger rutas
- Multi vehículos
- Profile page
```

### Fase 3 (2-3 semanas)
```
- Cron jobs (Vercel)
- Email reminders (Resend)
- Score auto-update
- Push notifications
```

### Fase 4 (1 mes)
```
- Stripe integration
- Premium features
- Analytics
- Admin panel
```

---

## ✅ CHECKLIST ANTES DE LANZAR

- [ ] Supabase proyecto creado
- [ ] Tabla vehicles insertada
- [ ] .env.local actualizado
- [ ] Probar registrar vehículo
- [ ] Probar buscar en dashboard
- [ ] Responsive en móvil
- [ ] Deploy a Vercel
- [ ] DNS configurado

---

## 📞 REFERENCIAS

**Supabase Docs**: https://supabase.com/docs  
**Next.js Docs**: https://nextjs.org/docs  
**Tailwind Docs**: https://tailwindcss.com/docs  

**Score Engine Source**: `src/lib/scoreEngine.ts`  
**Dashboard Source**: `src/components/dashboard/`  
**UI Source**: `src/components/ui/`

---

**Vyntra v1.0 Ready to Launch** 🚀  
*Guía estructurada + Dashboard temprano + Base para SaaS*
