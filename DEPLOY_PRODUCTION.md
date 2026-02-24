# 🚀 GUÍA RÁPIDA DE DEPLOY A PRODUCCIÓN

## OptionesFormato: Vercel (Recomendado) o tu servidor

### Opción 1: Deploy en Vercel (5 minutos) ⭐ RECOMENDADO

```bash
# 1. Instala Vercel CLI
npm install -g vercel

# 2. Desde la carpeta del proyecto
cd c:\Users\Henry WZ\Desktop\Vyntra

# 3. Deploy
vercel --prod

# 4. Sigue los prompts (selecciona proyecto o crea uno nuevo)
```

**Ventajas:**
- ✅ Gratuito para startups
- ✅ SSL automático
- ✅ CDN global
- ✅ Serverless functions
- ✅ Deployments automáticos desde Git

### Opción 2: Deploy en Netlify (5 minutos)

```bash
# 1. Instala Netlify CLI
npm install -g netlify-cli

# 2. Autentica
netlify login

# 3. Deploy
netlify deploy --prod

# 4. Conecta con Git para deploys automáticos
```

### Opción 3: Tu servidor propio (15 minutos)

```bash
# 1. Build el proyecto
npm run build

# 2. Copia a tu servidor
scp -r .next/ usuario@servidor:/var/www/vyntra/
scp -r public/ usuario@servidor:/var/www/vyntra/

# 3. En el servidor
npm install --production
npm start

# 4. Configura con Nginx/Apache
# (Ver instrucciones específicas en Next.js docs)
```

---

## Pre-Deploy Checklist

```
[ ] Archivo .env.local configurado
[ ] npm run build sin errores
[ ] npm run dev funciona en local
[ ] Validación pasada: node scripts/validate-system.js
[ ] Revisar VALIDACION_SISTEMA_COMPLETO.md
[ ] Número WhatsApp es correcto: 0980639640
[ ] Todos los PDFs están en /public/pdfs/
[ ] git add . && git commit -m "feat: normativa v2.0 ready"
```

---

## Después del Deploy

### 1. Verificar Acceso
```
https://tudominio.com/normativa
https://tudominio.com/normativa/matricula
https://tudominio.com/api/pdf/generate
```

### 2. Testear WhatsApp
- Click en cualquier botón verde de WhatsApp
- Debe abrir WhatsApp con mensaje pre-formateado
- Número debe ser: 0980639640

### 3. Testear PDFs
- Desde `/normativa/matricula`
- Click en "Descargar PDF"
- Debe descargar o abrir: matricula-vehicular.pdf

### 4. Configurar Analytics
```html
<!-- Agregar a _document.tsx o layout.tsx -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### 5. Configurar SEO
```typescript
// En /src/app/layout.tsx
export const metadata = {
  title: 'Vyntra - Normativa Vehicular Explicada',
  description: 'Entiende...',
  openGraph: {
    title: '...',
    description: '...',
    url: 'https://tudominio.com',
    siteName: 'Vyntra',
  }
}
```

---

## Monitoreo Post-Deploy

### Uptime
- [Uptimerobot.com](https://uptimerobot.com) - Monitoreo gratuito
- [Statuspage.io](https://www.statuspage.io) - Página de estado

### Performance
- [Speedcurve.com](https://speedcurve.com) - Monitoreo de velocidad
- Lighthouse en DevTools

### Analytics
- Google Analytics 4
- Hotjar para heatmaps
- Segment para data centralization

---

## Troubleshooting

### Problema: PDFs no se descargan
**Solución:**
```bash
# Verifica que existan
ls public/pdfs/

# Verifica permisos
chmod 755 public/pdfs/*.pdf
```

### Problema: WhatsApp links no funcionan
**Causa:** Número incorrecto o encoding  
**Solución:**
```bash
# Verifica en /src/lib/whatsapp.ts
grep "WHATSAPP_NUMBER"

# Debe ser: 593980639640 (sin +, sin espacios)
```

### Problema: API retorna 404
**Solución:**
```bash
# Verifica que rutas existan
ls src/app/api/pdf/

# Rebuild
npm run build
npm run dev
```

---

## Scripts Útiles

```bash
# Generar PDFs nuevamente
node scripts/generate-pdfs.js

# Validar sistema
node scripts/validate-system.js

# Producción build
npm run build
npm start

# Development con hot reload
npm run dev

# Linting
npm run lint
```

---

## Variables de Entorno (.env.local)

```env
# Opcional - configura según tu servidor
NEXT_PUBLIC_APP_URL=https://tudominio.com
NEXT_PUBLIC_WHATSAPP=0980639640

# Si usas analytics
NEXT_PUBLIC_GA_ID=G_XXXXXXX

# Si usas base de datos futura
DATABASE_URL=postgresql://...
```

---

## Comandos Quick Deploy

### Vercel (Más fácil)
```bash
npm i -g vercel
vercel --prod
```

### Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod --dir=.next
```

### Docker (Avanzado)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "start"]
```

---

## Costos Estimados

| Opción | Costo | Notas |
|--------|-------|-------|
| Vercel | $0-20/mes | Gratuito hasta 100K requests |
| Netlify | $0-19/mes | Gratuito hasta 300K requests |
| Servidor Propio | $10-100/mes | Depende del proveedor |

---

## Aftercare (Mantenimiento)

### Semanal
- [ ] Revisar logs
- [ ] Monitoria de uptime
- [ ] Backup de datos

### Mensual
- [ ] Review de analytics
- [ ] Update de dependencias menores
- [ ] Optimización de performance

### Trimestral
- [ ] Update de Next.js
- [ ] Revisión de seguridad
- [ ] Backup completo

---

## Support & Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Vercel Docs](https://vercel.com/docs)
- [jsPDF Docs](https://parallax.github.io/jsPDF/)
- [WhatsApp API](https://www.whatsapp.com/)

---

✅ **¡Estás listo para producción!**

Selecciona una opción de deploy arriba y comienza tu journey 🚀

