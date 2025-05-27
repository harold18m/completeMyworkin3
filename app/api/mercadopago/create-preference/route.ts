import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN!,
  options: { timeout: 5000 }
});

export async function POST(request: NextRequest) {
  try {
    const { title, price, quantity = 1, userId, revisions } = await request.json();

    if (!title || !price || !userId) {
      return NextResponse.json({ error: 'Datos requeridos faltantes' }, { status: 400 });
    }

    const preference = new Preference(client);
    
    const preferenceData = {
      items: [
        {
          id: `cv-analysis-${revisions}`,
          title: `${title} - ${revisions} análisis`,
          unit_price: Number(price),
          quantity: Number(quantity),
          currency_id: 'PEN'
        }
      ],
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
        failure: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/failure`,
        pending: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/pending`
      },
      auto_return: 'approved',
      external_reference: `${userId}-${revisions}-${Date.now()}`,
      statement_descriptor: 'Portal WorkIn CV',
      metadata: {
        user_id: userId,
        revisions: revisions,
        package_type: 'cv_analysis'
      }
    };

    const result = await preference.create({ body: preferenceData });

    return NextResponse.json({
      id: result.id,
      init_point: result.init_point,
      sandbox_init_point: result.sandbox_init_point
    });

  } catch (error) {
    console.error('Error creando preferencia:', error);
    return NextResponse.json(
      { error: 'Error al crear la preferencia de pago' },
      { status: 500 }
    );
  }
}