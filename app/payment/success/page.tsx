'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { cvReviewService } from '@/services/cvReviewService';
import { mercadoPagoService } from '@/services/mercadoPagoService';
import { CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PaymentSuccessPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentProcessed, setPaymentProcessed] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const processPayment = async () => {
      try {
        const paymentId = searchParams.get('payment_id');
        const externalReference = searchParams.get('external_reference');

        if (!paymentId || !externalReference || !user) {
          throw new Error('Información de pago incompleta');
        }

        // Verificar estado del pago
        const paymentStatus = await mercadoPagoService.checkPaymentStatus(paymentId);
        
        if (paymentStatus.status === 'approved') {
          // Procesar la referencia externa
          const referenceData = JSON.parse(externalReference);
          const { packageId } = referenceData;          // Agregar revisiones al usuario
          await cvReviewService.addPurchasedReviews(user, {
            packageId,
            paymentId,
            packageName: referenceData.packageName || '',
            reviewsIncluded: referenceData.reviewsIncluded || 0,
            price: referenceData.price || 0
          });
          
          setPaymentProcessed(true);
        } else {
          throw new Error('El pago no fue aprobado');
        }
      } catch (error) {
        console.error('Error processing payment:', error);
        setError('Error al procesar el pago. Contacta al soporte si el problema persiste.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      processPayment();
    }
  }, [user, searchParams]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="p-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#028bbf] mx-auto mb-4"></div>
            <p>Verificando sesión...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="p-6 text-center">
            <Loader2 className="animate-spin h-8 w-8 text-[#028bbf] mx-auto mb-4" />
            <h2 className="text-lg font-semibold mb-2">Procesando tu pago...</h2>
            <p className="text-gray-600">Por favor espera mientras confirmamos tu compra.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-red-900 mb-2">Error en el pago</h2>
            <p className="text-red-700 mb-4">{error}</p>
            <Button 
              onClick={() => router.push('/analizar-cv')}
              className="bg-[#028bbf] hover:bg-[#027ba8]"
            >
              Volver a intentar
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-900">¡Pago exitoso!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            Tu compra se ha procesado correctamente. Las revisiones han sido agregadas a tu cuenta.
          </p>
          <div className="space-y-2">
            <Button 
              onClick={() => router.push('/analizar-cv')}
              className="w-full bg-[#028bbf] hover:bg-[#027ba8]"
            >
              Analizar CV ahora
            </Button>
            <Button 
              variant="outline"
              onClick={() => router.push('/dashboard')}
              className="w-full"
            >
              Ir al Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
