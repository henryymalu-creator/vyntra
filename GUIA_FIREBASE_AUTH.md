# 🔐 Guía: Habilitar Firebase Authentication

## 📋 Checklist Rápido

- [ ] Aceptaste los términos de Firebase
- [ ] Verificaste que tienes acceso al proyecto hwzvyntra
- [ ] Habilitaste Email/Password authentication
- [ ] Guardaste los cambios
- [ ] Actualizaste la página en localhost:3000

---

## 🔑 Paso 1: Accede a Firebase Console

**URL:** https://console.firebase.google.com/project/hwzvyntra

```
Si ves una página que dice:
"Welcome to Firebase"
↓
Click en: "hwzvyntra" en la lista de proyectos
```

**Esperado:** Deberías ver el dashboard de Firebase con opciones como:
- Overview
- Authentication
- Firestore
- Storage
- etc.

---

## 🔑 Paso 2: Entra a Authentication

En el menú izquierdo, busca: **Authentication**

```
Menú Principal
├── Build
│   ├── Authentication  ← AQUÍ
│   ├── Firestore Database
│   ├── Realtime Database
│   └── Storage
└── ...
```

Click en: **Authentication**

---

## ✅ Paso 3: Habilita Email/Password

### Opción A: Si ves "Get Started"
1. Click en el botón azul: **Get Started**
2. Se abrirá una lista de proveedores

### Opción B: Si ya hay proveedores
1. Look para un botón: **Add new provider** o ➕
2. Selecciona de la lista

---

## 🔍 Paso 4: Encuentra Email/Password

**Lista de proveedores disponibles:**
- ✅ Email/Password ← **SELECCIONA ESTA**
- Facebook
- Google
- GitHub
- Twitter
- Microsoft
- etc.

Click en: **Email/Password**

---

## 📝 Paso 5: Completa la Configuración

Se abrirá una pantalla que dice:
```
"Sign in method"
"Email/Password"
```

Con opciones toggle:
- ☑️ Enable (Habilitar)  ← Asegúrate que esté ACTIVO
- [ ] Email link (opcional)

### Configuración Recomendada:
- ✅ **Enable:** ENCENDIDO
- ⚠️ **Email link:** Deja como está (opcional)

### Haz click en: **Save** o **Enable** (botón azul)

---

## 🎉 Paso 6: Verifica que Funciona

Deberías ver ahora:
```
Authentication
├── Sign-in method
│   ├── Email/Password ✅ ENABLED
│   └── ...
└── Users
    └── (vacío por ahora)
```

**Color esperado:** 
- Debe haber un checkbox VERDE ✅ o Switch ENCENDIDO
- Si está rojo ❌ o gris, no está habilitado

---

## 🧪 Paso 7: Prueba en tu App

1. Vuelve a tu navegador con http://localhost:3000
2. Recarga la página (F5 o Ctrl+Shift+R para hard refresh)
3. Busca el banner amarillo "Firebase No Configurado"

**Esperado:**
```
ANTES: ❌ ⚠️ Firebase No Configurado (banner amarillo)
DESPUÉS: ✅ Desaparece (Sin banner)
```

Si el banner desaparece: ¡Funciona! 🎉

---

## 🔗 Paso 8: Prueba Registro

1. Ve a: http://localhost:3000/registro
2. Intenta crear una cuenta con:
   - Email: `test@example.com`
   - Password: `Test123!`
3. Click en: **Registrar**

**Esperado:**
- ✅ Sin errores
- ✅ Puedes iniciar sesión
- ✅ Te lleva al dashboard

Si ves un error: Toma una captura y repórtalo.

---

## 🆘 Solución de Problemas

### ❌ Error: "Service not available"
**Solución:** Espera 2-3 minutos y recarga. Firebase necesita tiempo para activar.

### ❌ Error: "Unauthorized"
**Solución:** Verifica que tu API Key está correcta en `.env.local`

### ❌ El banner sigue apareciendo
**Solución:** 
1. Abre DevTools (F12)
2. Console tab
3. Busca mensajes rojos
4. Toma captura y repórtalo

### ❌ No puedo crear cuenta
**Solución:**
1. Verifica que Email/Password está ENABLED (paso 5)
2. Usa un email válido (ej: `tuEmail+test@gmail.com`)
3. Password: Mín 6 caracteres

---

## 📱 Verificación en Varias Plataformas

**Desktop (Chrome):**
1. Abre: http://localhost:3000/registro
2. Crea cuenta
3. Verifica que funciona

**Mobile (mismo WiFi):**
1. Obtén tu IP local: `ipconfig` en terminal
2. Abre: `http://TU_IP:3000/registro` en tu teléfono
3. Verifica que funciona en móvil

---

## ✅ Checklist de Éxito

```
Completado:
☑️ Accediste a Firebase Console
☑️ Habilitaste Email/Password auth
☑️ Guardaste los cambios
☑️ El banner de Firebase desapareció
☑️ Creaste una cuenta de prueba
☑️ Iniciaste sesión correctamente
☑️ Accediste a /dashboard sin errores

Siguiente: Deploy a Vercel
```

---

## 🎯 Siguientes Pasos Después de Auth

**Una vez que el registro funcione:**

1. **Setup GitHub** (Necesario para Vercel)
   ```bash
   git init
   git add .
   git commit -m "Vyntra v1.0 - Production ready"
   git remote add origin https://github.com/TU_USUARIO/vyntra.git
   git push -u origin main
   ```

2. **Deploy a Vercel**
   - URL: https://vercel.com/new
   - Importa repository de GitHub
   - Copia variables de env desde `.env.local`
   - Deploy

---

## 📞 Si Necesitas Ayuda

Reporta:
1. **Pantalla:** Toma screenshot de donde tienes problemas
2. **Error exacto:** Copia el mensaje de error
3. **Timestamp:** Qué hora fue
4. **Navegador:** Chrome, Firefox, Safari, etc.

Con esta información podré ayudarte rápidamente.

---

## 🔒 Seguridad - Recuerda

✅ **Seguro compartir:**
- URLs de Firebase Console (públicas por defecto)
- Código de la app (está en GitHub de todas formas)

❌ **NO compartas:**
- API Keys (aunque son públicas, úsalas solo en .env.local)
- Firebase Admin SDK keys (casi nunca necesitas)
- Contraseñas de cuentas de prueba

---

**Última actualización:** Hoy
**Versión:** Setup Guide v1.0
**Tiempo estimado:** 2-3 minutos
