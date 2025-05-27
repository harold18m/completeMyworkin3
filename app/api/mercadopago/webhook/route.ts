import { NextRequest, NextResponse } from 'next/server';
import { cvReviewService } from '../../../../services/cvReviewService';
import { getAuth } from 'firebase-admin/auth';
import { getUserByEmail } from '../../../../lib/firebase-admin';

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
      console.log('💳 Datos del pago:', paymentData);      // Si el pago fue aprobado, procesar
      if (paymentData.status === 'approved') {
        try {
          const externalReference = paymentData.external_reference || '';
          const [userId, revisions, timestamp] = externalReference.split('_');
          
          if (userId && revisions) {
            // Buscar el usuario por UID o email
            let user;
            try {
              user = await getAuth().getUser(userId);
            } catch {
              // Si no funciona por UID, intentar por email
              try {
                user = await getUserByEmail(userId);
              } catch (error) {
                console.error('Usuario no encontrado:', userId);
                return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
              }
            }

            const revisionsToAdd = parseInt(revisions);
              // Agregar revisiones usando cvReviewService
            await cvReviewService.addPurchasedReviews(
              { uid: user.uid, email: user.email || '' } as any,
              {
                packageId: `cv_${revisions}`,
                paymentId: paymentId,
                packageName: `Paquete ${revisions} revisiones`,
                reviewsIncluded: revisionsToAdd,
                price: paymentData.transaction_amount
              }
            );
            
            console.log(`✅ Usuario ${user.email} actualizado: +${revisionsToAdd} análisis de CV`);
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
