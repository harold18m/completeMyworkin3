import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/services/userService';

const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;

export async function POST(request: NextRequest) {
  try {
    if (!MP_ACCESS_TOKEN) {
      console.error('MercadoPago access token no configurado');
      return NextResponse.json({ error: 'Configuración incorrecta' }, { status: 500 });
    }

    const body = await request.json();
    console.log('🔔 Webhook recibido:', body);

    if (body.type === 'payment') {
      const paymentId = body.data.id;
      
      // Obtener detalles del pago
      const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${MP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Error al obtener detalles del pago');
      }

      const paymentData = await response.json();
      console.log('💳 Datos del pago:', paymentData);

      // Si el pago fue aprobado, actualizar Firebase usando UserService
      if (paymentData.status === 'approved') {
        try {
          const externalReference = paymentData.external_reference || '';
          const [userEmail, revisions] = externalReference.split('-');
          
          if (userEmail && revisions) {
            // Buscar el UID del usuario por email (necesitarás agregar esta función al UserService)
            // Por ahora, asumiendo que tienes el UID en el external_reference
            const revisionsToAdd = parseInt(revisions);
            
            // Usar UserService para añadir las revisiones
            await UserService.addCVAnalyses(userEmail, revisionsToAdd);
            
            console.log(`✅ Usuario ${userEmail} actualizado: +${revisionsToAdd} análisis de CV`);
          }
          
        } catch (error) {
          console.error('❌ Error procesando pago aprobado:', error);
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('❌ Error procesando webhook:', error);
    return NextResponse.json(
      { error: 'Error al procesar webhook' },
      { status: 500 }
    );
  }
}
