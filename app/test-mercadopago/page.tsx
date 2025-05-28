'use client';

import { useState } from 'react';
import CVPaymentModal from '@/components/CVPaymentModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, TestTube } from 'lucide-react';

export default function TestMercadoPagoPage() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-[#028bbf] rounded-full flex items-center justify-center mx-auto mb-4">
            <TestTube className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl text-gray-900">
            Test MercadoPago
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600 text-center">
            Prueba la integración de MercadoPago con Checkout Pro
          </p>
          
          <Button
            onClick={() => setShowPaymentModal(true)}
            className="w-full bg-[#028bbf] hover:bg-[#027ba8] flex items-center gap-2"
          >
            <CreditCard className="h-4 w-4" />
            Abrir Modal de Pago
          </Button>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              Esto abrirá el modal de MercadoPago integrado
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Modal de pago */}
      {showPaymentModal && (
        <CVPaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          userEmail="test@example.com"
          userName="Usuario de Prueba"
        />
      )}
    </div>
  );
}
