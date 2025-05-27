# 🔒 Configuración Segura de Firebase

## ⚠️ IMPORTANTE: Seguridad de Credenciales

Este proyecto utiliza Firebase Admin SDK para operaciones del lado del servidor. Las credenciales están configuradas de forma segura.

### 📁 Archivos que NO deben subirse a Git:

- `firebase-service-account.json` (credenciales de Firebase Admin)
- `.env.local` (variables de entorno locales)
- Cualquier archivo con `*firebase-adminsdk*.json`

### 🔧 Configuración Local

1. **Copiar archivo de entorno**:
   ```bash
   cp .env .env.local
   ```

2. **Configurar credenciales reales** en `.env.local`:
   - Agregar credenciales reales de MercadoPago
   - Agregar credenciales reales de Supabase
   - El archivo `firebase-service-account.json` ya está configurado

3. **Variables de entorno necesarias**:
   ```env
   # Firebase Admin
   FIREBASE_SERVICE_ACCOUNT_PATH=./firebase-service-account.json
   
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=tu_url_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_key_supabase
   
   # MercadoPago
   NEXT_PUBLIC_MP_ACCESS_TOKEN=tu_token_mp
   NEXT_PUBLIC_MP_PUBLIC_KEY=tu_public_key_mp
   ```

### 🚀 Probar Firebase Admin

1. **Iniciar el servidor**:
   ```bash
   pnpm dev
   ```

2. **Probar el endpoint**:
   ```bash
   curl http://localhost:3000/api/firebase-admin
   ```

### 📦 Despliegue en Producción

Para desplegar en producción (Vercel, etc.):

1. **No subir el archivo JSON**: En lugar de usar el archivo JSON, usar variables de entorno individuales
2. **Configurar variables en la plataforma**: Cada campo del JSON como variable separada
3. **Actualizar el código de inicialización** para usar variables de entorno en lugar del archivo

### 🔐 Si las credenciales se comprometen:

1. **Ir a Google Cloud Console**
2. **Regenerar la clave privada** de la cuenta de servicio
3. **Actualizar el archivo local**
4. **Nunca subir credenciales a Git**

### 🧪 Testing

- Endpoint de prueba: `/api/firebase-admin`
- Funciones de testing en: `services/cvTestDataService.ts`
- Usa `window.cvTestData` en desarrollo para crear datos de prueba

### 📝 Notas

- Firebase Admin solo funciona en el lado del servidor (API routes)
- Para operaciones del cliente, usar Firebase Client SDK (ya configurado)
- Las credenciales están en `.gitignore` para evitar subidas accidentales
