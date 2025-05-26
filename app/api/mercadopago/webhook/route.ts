import { NextRequest, NextResponse } from 'next/server';
import { cvReviewService } from '@/services/cvReviewService';

const MERCADOPAGO_ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN;

export async function POST(request: NextRequest) {
  try {
    if (!MERCADOPAGO_ACCESS_TOKEN) {
      console.error('MercadoPago access token no configurado');
      return NextResponse.json({ error: 'Configuración incorrecta' }, { status: 500 });
    }

    const body = await request.json();
    console.log('Webhook received:', body);

    // MercadoPago envía diferentes tipos de notificaciones
    if (body.type === 'payment') {
      const paymentId = body.data.id;
      
      // Obtener detalles del pago
      const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${MERCADOPAGO_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Error al obtener detalles del pago');
      }

      const paymentData = await response.json();
      console.log('Payment data:', paymentData);

      // Si el pago fue aprobado, actualizar el usuario
      if (paymentData.status === 'approved') {
        try {
          const externalReference = JSON.parse(paymentData.external_reference || '{}');
          const { userId, packageId } = externalReference;

          if (userId && packageId) {
            // Aquí necesitarías obtener el objeto User de Firebase
            // Para simplificar, podrías almacenar la información de la compra
            // y procesarla cuando el usuario inicie sesión nuevamente
            
            console.log(`Payment approved for user ${userId}, package ${packageId}`);
            
            // Podrías crear un registro temporal de compras aprobadas
            // que se procese cuando el usuario inicie sesión
          }
        } catch (error) {
          console.error('Error processing approved payment:', error);
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Error al procesar webhook' },
      { status: 500 }
    );
  }
}
