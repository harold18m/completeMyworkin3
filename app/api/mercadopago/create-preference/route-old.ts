import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;

export async function POST(request: NextRequest) {
  try {
    if (!MP_ACCESS_TOKEN) {
      throw new Error('MercadoPago access token no configurado');
    }

    const preferenceData = await request.json();

    // Configurar cliente de MercadoPago
    const client = new MercadoPagoConfig({ 
      accessToken: MP_ACCESS_TOKEN,
      options: { timeout: 5000 }
    });

    const preference = new Preference(client);

    // Crear preferencia usando el SDK oficial
    const result = await preference.create({ 
      body: {
        items: [
          {
            id: preferenceData.packageId,
            title: preferenceData.title,
            description: preferenceData.description,
            category_id: 'services',
            quantity: 1,
            unit_price: preferenceData.price,
            currency_id: 'PEN'
          }
        ],
        payer: {
          name: preferenceData.payer?.name,
          email: preferenceData.payer?.email
        },        back_urls: {
          success: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/success`,
          failure: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/failure`,
          pending: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/pending`
        },
        auto_return: 'approved',
        external_reference: preferenceData.external_reference,
        statement_descriptor: 'MyWorkIn CV Analysis'
      }
    });
    
    return NextResponse.json({
      id: result.id,
      init_point: result.init_point,
      sandbox_init_point: result.sandbox_init_point
    });
  } catch (error) {
    console.error('Error creating payment preference:', error);
    return NextResponse.json(
      { error: 'Error al crear la preferencia de pago' },
      { status: 500 }
    );
  }
}
