## 🚀 **Guía de Pruebas de Pagos MercadoPago**

### **1. Configuración Actual**
```env
MP_ACCESS_TOKEN=APP_USR-8746819333043386-052709-d917e81b141d8be70e7466e87db2d985-2348299903
NEXT_PUBLIC_MP_PUBLIC_KEY=APP_USR-48acfef6-71c5-4bf2-aa7d-ac1e74c4dd73
NEXT_PUBLIC_SITE_URL=https://4rlcbsnj-3000.brs.devtunnels.ms
```

### **2. URLs Importantes**
- **Webhook:** `https://4rlcbsnj-3000.brs.devtunnels.ms/api/mercadopago/webhook`
- **Éxito:** `https://4rlcbsnj-3000.brs.devtunnels.ms/payment/success`
- **Error:** `https://4rlcbsnj-3000.brs.devtunnels.ms/payment/failure`
- **Pendiente:** `https://4rlcbsnj-3000.brs.devtunnels.ms/payment/pending`

### **3. Páginas de Prueba**
- `/test-payment` - Prueba directa de pagos
- `/test-mercadopago` - Modal de pagos
- `/analizar-cv` - Flujo completo de análisis

### **4. Tarjetas de Prueba (Sandbox)**
```
VISA Aprobada: 4170068810108020
Mastercard Aprobada: 5031755734530604
CVV: 123
Vencimiento: 11/25
Nombre para APROBAR: APRO
Nombre para RECHAZAR: CONT
```

### **5. Paquetes Disponibles**
- **1 Revisión:** S/ 4.00
- **3 Revisiones:** S/ 7.00 (Popular)
- **6 Revisiones:** S/ 10.00 (Mejor valor)

### **6. Flujo de Compra**
1. Usuario selecciona paquete
2. Se crea preferencia en `/api/mercadopago/create-preference`
3. Redirección a Checkout Pro (sandbox)
4. Usuario completa pago con tarjeta de prueba
5. Webhook procesa automáticamente el pago
6. Revisiones se agregan al usuario en Firebase
7. Redirección a página de éxito

### **7. Logs a Verificar**
```bash
# En el webhook
🔔 Webhook recibido: { type: 'payment', data: { id: 'PAYMENT_ID' } }
💳 Datos del pago: { status: 'approved', external_reference: 'userId_revisions_timestamp' }
✅ Usuario email@example.com actualizado: +3 análisis de CV
```

### **8. Comandos de Desarrollo**
```bash
# Iniciar servidor
pnpm run dev:3002

# Ver logs en tiempo real
# Verificar webhook en: https://4rlcbsnj-3000.brs.devtunnels.ms/api/mercadopago/webhook
```

### **9. Verificación Post-Pago**
- ✅ Usuario recibe revisiones en Firebase
- ✅ Contador de revisiones actualizado
- ✅ Historial de compras registrado
- ✅ Puede usar revisiones inmediatamente
