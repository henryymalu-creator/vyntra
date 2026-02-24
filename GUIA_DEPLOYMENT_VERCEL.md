# 🚀 Guía: Deploy a Vercel via GitHub

## 📋 Resumen de Pasos

```
PASO 1: Instalar Git ..................... 2 min
PASO 2: Inicializar Repository ......... 1 min
PASO 3: Crear en GitHub ................ 2 min
PASO 4: Push a GitHub .................. 1 min
PASO 5: Conectar a Vercel .............. 3 min
PASO 6: Variables de Entorno ........... 2 min
PASO 7: Deploy ......................... 5 min
────────────────────────────────────────────────
TOTAL: 16 minutos
```

---

## 🔧 PASO 1: Instalar Git

### Windows:

**Opción A: Descargar**
1. Ve a: https://git-scm.com/download/win
2. Descarga "Git for Windows"
3. Ejecuta el instalador
4. Aceptar todo (defaults funcionan bien)

**Opción B: Con Chocolatey (si tienes)**
```powershell
choco install git -y
```

**Verificar instalación:**
```powershell
git --version
# Deberías ver algo como:
# git version 2.40.0.windows.1
```

---

## 📂 PASO 2: Inicializar Repository Local

Abre PowerShell en tu carpeta de proyecto:

```powershell
# Navega a tu carpeta Vyntra
cd "c:\Users\Henry WZ\Desktop\Vyntra"

# Verifica que estés en la carpeta correcta
Get-Location
# Deberías ver: C:\Users\Henry WZ\Desktop\Vyntra

# Inicializa el repositorio
git init

# Agrega todos los archivos
git add .

# Crea el primer commit
git commit -m "Vyntra v1.0 - Production Ready"
```

**Resultado esperado:**
```
[main (root-commit) abc123] Vyntra v1.0 - Production Ready
 28 files changed, 5000+ insertions(+)
 create mode 100644 ...
```

---

## 🐙 PASO 3: Crear Repository en GitHub

1. **Ve a GitHub:**
   - URL: https://github.com/new
   - O haz login si no estás en GitHub

2. **Llenar el formulario:**

| Campo | Valor |
|-------|-------|
| Repository name | `vyntra` |
| Description | `Protección Inteligente para tu Vehículo` |
| Public / Private | **Public** ← Importante |
| Add .gitignore | ✅ Select: Node |
| Add license | ✅ Select: MIT |

3. **Click en:** Create repository

**Resultado:** 
- URL será algo como: `https://github.com/TU_USUARIO/vyntra`
- Verás instrucciones en la página

---

## 🔗 PASO 4: Conectar Local con GitHub

Copia los comandos que GitHub te muestra (o ejecuta estos):

```powershell
# Cambiar rama a 'main'
git branch -M main

# Agregar dirección del repositorio
git remote add origin https://github.com/TU_USUARIO/vyntra.git

# Enviar código a GitHub
git push -u origin main
```

**Nota:** Reemplaza `TU_USUARIO` con tu usuario de GitHub real

**Esperado:**
```
Enumerating objects: 50, done.
Counting objects: 100%...
Writing objects: 100%...
remote: Create a pull request...
```

---

## ✅ Verificar que Funciona

1. Abre: https://github.com/TU_USUARIO/vyntra
2. Deberías ver tus archivos allí
3. Si ves una carpeta `.git`, ¡funciona! ✅

---

## 🚀 PASO 5: Conectar a Vercel

1. **Ve a Vercel:**
   - URL: https://vercel.com/new
   - Haz login con GitHub

2. **Selecciona tu repositorio:**
   - Busca: `vyntra`
   - Click en: Seleccionar

3. **Configuración automática:**
   - Vercel detectará: "Next.js"
   - Root Directory: "/" (correcto)
   - Build command: `npm run build` (correcto)
   - Output directory: `.next` (correcto)

---

## 🔐 PASO 6: Agregar Variables de Entorno

### En la página de Vercel:

1. **Busca la sección:** "Environment Variables"

2. **Agrega estas 6 variables:**

```
NEXT_PUBLIC_FIREBASE_API_KEY = AIzaSyDxDt1yMh4a8KavTFRQKe0hGTyG3kxDons

NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = hwzvyntra.firebaseapp.com

NEXT_PUBLIC_FIREBASE_PROJECT_ID = hwzvyntra

NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = hwzvyntra.firebasestorage.app

NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = 168884960061

NEXT_PUBLIC_FIREBASE_APP_ID = 1:168884960061:web:f43360162bd284304fa354
```

### Copiar desde tu `.env.local`:

1. Abre tu archivo: `.env.local` (en VS Code)
2. Copia cada línea
3. En Vercel: 
   - Nombre: (lo que está antes del `=`)
   - Value: (lo que está después del `=`)
   - Click: Add Another

---

## 🎯 PASO 7: Deploy

1. **En Vercel:**
   - Click en: **Deploy** (botón grande azul)

2. **Esperar:**
   - Vercel compilará tu app
   - Verás un progreso bar

3. **Resultado:**
   - ✅ Deployment successful!
   - Tu URL será: `https://vyntra-xyz123.vercel.app`

---

## 🔄 Después del Deploy

### Test en Vercel:

1. **Abre tu URL:** `https://vyntra-xyz123.vercel.app`
2. **Prueba:**
   - ✅ Página carga
   - ✅ Logo visible en Navbar
   - ✅ Logo visible en Footer
   - ✅ Puedes cambiar páginas

### Test de Registro:

1. Ve a: `https://vyntra-xyz123.vercel.app/registro`
2. Intenta crear una cuenta:
   - Email: `newtest@example.com`
   - Password: `Test123!`
3. Esperado: Funciona igual que localhost

---

## 📊 Verificación Checklist

```
✅ Git instalado (git --version funciona)
✅ Repository local inicializado (git init completó)
✅ Archivos commitidos (git commit funcionó)
✅ Repository creado en GitHub
✅ Push a GitHub exitoso
✅ Código visible en GitHub.com
✅ Vercel conectado a GitHub
✅ Variables de entorno agregadas
✅ Deploy ejecutado sin errores
✅ App accesible en vyntra-xyz.vercel.app
✅ Logo visible en producción
✅ Registro funciona en producción
```

---

## 🆘 Solución de Problemas

### ❌ "Git no es reconocido"
**Solución:** Reinicia PowerShell después de instalar Git

### ❌ "Autenticación en GitHub falla"
**Solución:** 
1. Genera Personal Access Token en: https://github.com/settings/tokens
2. Usa el token como contraseña cuando Git lo pida

### ❌ "Vercel dice no encuentra repository"
**Solución:**
1. Asegúrate de que el repo es Public
2. Reconecta GitHub en Vercel settings
3. Intenta de nuevo

### ❌ "Deploy falla con error TypeScript"
**Solución:**
1. Corre `npm run build` localmente
2. Si ves errores, acciíonalos
3. Commit + push a GitHub
4. Vercel redesployará automáticamente

### ❌ "Registro no funciona en producción"
**Solución:**
1. Verifica que habilitaste Auth en Firebase
2. Verifica variables de env en Vercel (compara con .env.local)
3. Abre DevTools (F12) → Console tab → busca errores rojos

---

## 🔄 Actualizaciones Futuras

**Después del primer deploy, cuando hagas cambios:**

```powershell
# 1. Haz cambios en tu código

# 2. Commit y push
git add .
git commit -m "Descripción del cambio"
git push origin main

# 3. Vercel auto-redeploya automáticamente ✅
# Puedes ver el progreso en: https://vercel.com/dashboard
```

---

## 📞 Dominio Personalizado (Opcional)

Si quieres cambiar `vyntra-xyz.vercel.app` a `vyntra.com`:

1. Compra dominio en: GoDaddy, Namecheap, etc.
2. Ve a Vercel → Settings → Domains
3. Agrega tu dominio
4. Sigue las instrucciones de DNS

Esto es OPCIONAL por ahora.

---

## 🎉 Resultado Final

```
Será capaz de:
✅ Compartir URL: https://vyntra-xyz.vercel.app
✅ Acceder desde cualquier lugar
✅ Funciona en móvil
✅ Firebase Auth integrado
✅ Logos en producción
✅ HTTPS automático
✅ CDN global
✅ Dominio personalizado (opcional)
```

---

## 📋 Comandos Útiles Referencias

```powershell
# Ver status
git status

# Ver commits
git log

# Si necesitas revertir
git reset --hard HEAD~1

# Ver remote
git remote -v

# Cambiar remote
git remote set-url origin https://github.com/TU_USUARIO/vyntra.git
```

---

**Tiempo total:** 15-20 minutos
**Dificultad:** Muy fácil (solo copiar/pegar)
**Resultado:** App en vivo 🚀

¡Adelante! Cualquier pregunta, repórtala.
