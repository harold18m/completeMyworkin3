'use client';

import { useRouter } from 'next/navigation';
import { XCircle } from 'lucide-react';

export default function PaymentFailure() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="mb-6">
          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Pago Fallido</h1>
          <p className="text-gray-600">
            Hubo un problema procesando tu pago. No se realizó ningún cargo.
          </p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={() => router.push('/analizar-cv')}
            className="w-full bg-[#028bbf] hover:bg-[#027ba8] text-white font-semibold py-3 px-4 rounded-xl transition-colors"
          >
            Intentar de nuevo
          </button>
          
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-colors"
          >
            Volver al Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl text-red-900">Pago fallido</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            No se pudo procesar tu pago. Puedes intentar nuevamente o contactar al soporte.
          </p>
          <div className="space-y-2">
            <Button 
              onClick={() => router.push('/analizar-cv')}
              className="w-full bg-[#028bbf] hover:bg-[#027ba8]"
            >
              Intentar nuevamente
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
