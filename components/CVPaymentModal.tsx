'use client';

import React, { useState } from 'react';
import { X, CreditCard, Star, CheckCircle, Loader2 } from 'lucide-react';

interface CVPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail?: string;
  userName?: string;
}

export default function CVPaymentModal({ isOpen, onClose, userEmail, userName }: CVPaymentModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  // Paquetes simples de análisis de CV
  const packages = [
    {
      id: 'cv_1',
      name: 'Análisis Básico',
      price: 4,
      revisions: 1,
      description: '1 análisis de CV',
      popular: false
    },
    {
      id: 'cv_3',
      name: 'Análisis Premium',
      price: 7,
      revisions: 3,
      description: '3 análisis de CV',
      popular: true
    },
    {
      id: 'cv_6',
      name: 'Análisis Profesional',
      price: 10,
      revisions: 6,
      description: '6 análisis de CV',
      popular: false
    }
  ];

  const handlePayment = async (packageData: typeof packages[0]) => {
    if (!userEmail || !userName) {
      alert('Por favor, inicia sesión para continuar con el pago');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/mercadopago/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: packageData.name,
          price: packageData.price,
          quantity: 1,
          userId: userEmail,
          revisions: packageData.revisions
        }),
      });

      if (!response.ok) {
        throw new Error('Error al crear la preferencia de pago');
      }

      const preference = await response.json();
      
      // Redirigir a MercadoPago
      window.location.href = preference.sandbox_init_point || preference.init_point;
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Error al procesar el pago. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Comprar Análisis de CV</h3>
            <p className="text-gray-600">Análisis profesional con IA</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-gray-400" />
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative border-2 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg ${
                  pkg.popular 
                    ? 'border-[#028bbf] bg-gradient-to-b from-[#028bbf]/5 to-transparent' 
                    : 'border-gray-200 hover:border-[#028bbf]/50'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-[#028bbf] text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      Más Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h4>
                  <div className="text-3xl font-bold text-[#028bbf] mb-2">
                    S/ {pkg.price}
                  </div>
                  <p className="text-gray-600 text-sm">{pkg.description}</p>
                </div>

                <div className="text-center mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <span className="text-2xl font-bold text-gray-900">{pkg.revisions}</span>
                    <p className="text-sm text-gray-600">análisis incluidos</p>
                  </div>
                </div>

                <button
                  onClick={() => handlePayment(pkg)}
                  disabled={isLoading}
                  className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    pkg.popular
                      ? 'bg-[#028bbf] hover:bg-[#027ba8] text-white shadow-lg hover:shadow-xl'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900 hover:text-[#028bbf]'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <CreditCard className="h-4 w-4" />
                  )}
                  {isLoading ? 'Procesando...' : 'Pagar con MercadoPago'}
                </button>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-4">
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Pago seguro
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Revisiones instantáneas
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
