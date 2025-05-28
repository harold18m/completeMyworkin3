import { NextRequest, NextResponse } from 'next/server';

const MERCADOPAGO_ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN;

export async function GET(
  request: NextRequest,
  { params }: { params: { paymentId: string } }
) {
  try {
    if (!MERCADOPAGO_ACCESS_TOKEN) {
      throw new Error('MercadoPago access token no configurado');
    }

    const { paymentId } = params;

    const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${MERCADOPAGO_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener el estado del pago');
    }

    const paymentData = await response.json();
    
    return NextResponse.json({
      status: paymentData.status,
      details: {
        id: paymentData.id,
        status: paymentData.status,
        status_detail: paymentData.status_detail,
        external_reference: paymentData.external_reference,
        transaction_amount: paymentData.transaction_amount,
        currency_id: paymentData.currency_id,
        date_approved: paymentData.date_approved,
        date_created: paymentData.date_created
      }
    });
  } catch (error) {
    console.error('Error checking payment status:', error);
    return NextResponse.json(
      { error: 'Error al verificar el estado del pago' },
      { status: 500 }
    );
  }
}
