'use client';

import { useState } from 'react';
import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { cvReviewService } from '@/services/cvReviewService';
import { useMercadoPago, mercadoPagoService } from '@/services/mercadoPagoService';
import { Button } from 'react-day-picker';

export default function TestingPage() {
  const { user } = useAuth();
  const { processPackagePurchase } = useMercadoPago();
  
  const [firebaseStatus, setFirebaseStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [mercadopagoStatus, setMercadopagoStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [testResults, setTestResults] = useState<{
    firebase?: string;
    mercadopago?: string;
  }>({});

  const testFirebase = async () => {
    if (!user) {
      setTestResults(prev => ({ ...prev, firebase: 'Error: Usuario no autenticado' }));
      setFirebaseStatus('error');
      return;
    }

    setFirebaseStatus('testing');
    try {
      // Probar obtener perfil del usuario
      const profile = await cvReviewService.getUserProfile(user);
      
      // Probar obtener estadísticas
      const stats = await cvReviewService.getUserStats(user);
      
      // Probar obtener historial
      const reviews = await cvReviewService.getUserReviews(user.uid);
      
      setTestResults(prev => ({
        ...prev,
        firebase: `✅ Conectado exitosamente!
        - Perfil: ${profile.email}
        - Revisiones totales: ${stats.totalReviews}
        - Revisiones restantes: ${stats.remainingReviews}
        - Historial: ${reviews.length} revisiones`
      }));
      setFirebaseStatus('success');
    } catch (error: any) {
      setTestResults(prev => ({
        ...prev,
        firebase: `❌ Error: ${error.message}`
      }));
      setFirebaseStatus('error');
    }
  };

  const testMercadoPago = async () => {
    if (!user) {
      setTestResults(prev => ({ ...prev, mercadopago: 'Error: Usuario no autenticado' }));
      setMercadopagoStatus('error');
      return;
    }

    setMercadopagoStatus('testing');
    try {
      // Verificar variables de entorno
      const hasPublicKey = !!process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY;
      
      if (!hasPublicKey) {
        throw new Error('NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY no configurada');
      }

      // Probar creación de preferencia (sin redirigir)
      const testPaymentData = {
        userId: user.uid,
        userEmail: user.email || 'test@example.com',
        packageId: '1-review',
        packageName: 'Paquete Test',
        amount: 4,
        currency: 'PEN'
      };

      // Simular creación de preferencia
      const preference = await mercadoPagoService.createPaymentPreference(testPaymentData);
      
      setTestResults(prev => ({
        ...prev,
        mercadopago: `✅ Configuración correcta!
        - Public Key: ${hasPublicKey ? 'Configurada' : 'No configurada'}
        - Preferencia creada: ${preference.id}
        - URL de pago: ${preference.init_point ? 'Generada' : 'No generada'}`
      }));
      setMercadopagoStatus('success');
    } catch (error: any) {
      setTestResults(prev => ({
        ...prev,
        mercadopago: `❌ Error: ${error.message}`
      }));
      setMercadopagoStatus('error');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'testing':
        return <Clock className="h-5 w-5 text-blue-500 animate-spin" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'testing':
        return 'border-blue-200 bg-blue-50';
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'error':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">🔧 Testing del Sistema</h1>
          <p className="text-gray-600 mt-2">
            Verifica que Firebase y MercadoPago estén configurados correctamente
          </p>
        </div>

        {!user && (
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Debes estar autenticado para realizar las pruebas. Ve a la página de login primero.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* Firebase Testing */}
          <Card className={`transition-all duration-300 ${getStatusColor(firebaseStatus)}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">🔥 Firebase</CardTitle>
              {getStatusIcon(firebaseStatus)}
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Prueba la conexión con Firebase Firestore y la autenticación
              </p>
              
              <Button 
                onClick={testFirebase}
                disabled={!user || firebaseStatus === 'testing'}
                className="w-full mb-4"
              >
                {firebaseStatus === 'testing' ? 'Probando...' : 'Probar Firebase'}
              </Button>

              {testResults.firebase && (
                <div className="bg-white p-3 rounded border text-sm whitespace-pre-line">
                  {testResults.firebase}
                </div>
              )}
            </CardContent>
          </Card>

          {/* MercadoPago Testing */}
          <Card className={`transition-all duration-300 ${getStatusColor(mercadopagoStatus)}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">💳 MercadoPago</CardTitle>
              {getStatusIcon(mercadopagoStatus)}
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Prueba la configuración de MercadoPago y creación de preferencias
              </p>
              
              <Button 
                onClick={testMercadoPago}
                disabled={!user || mercadopagoStatus === 'testing'}
                className="w-full mb-4"
              >
                {mercadopagoStatus === 'testing' ? 'Probando...' : 'Probar MercadoPago'}
              </Button>

              {testResults.mercadopago && (
                <div className="bg-white p-3 rounded border text-sm whitespace-pre-line">
                  {testResults.mercadopago}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Estado General */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>📊 Estado General del Sistema</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Firebase:</span>
                {getStatusIcon(firebaseStatus)}
                <span className="text-sm">
                  {firebaseStatus === 'idle' ? 'No probado' : 
                   firebaseStatus === 'testing' ? 'Probando...' :
                   firebaseStatus === 'success' ? 'Funcionando' : 'Error'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">MercadoPago:</span>
                {getStatusIcon(mercadopagoStatus)}
                <span className="text-sm">
                  {mercadopagoStatus === 'idle' ? 'No probado' : 
                   mercadopagoStatus === 'testing' ? 'Probando...' :
                   mercadopagoStatus === 'success' ? 'Funcionando' : 'Error'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Instrucciones */}
        <Alert className="mt-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>💡 Tip:</strong> Si alguna prueba falla, revisa el archivo{' '}
            <code className="bg-gray-100 px-1 rounded">CONFIGURACION-COMPLETA.md</code>{' '}
            para obtener instrucciones detalladas de configuración.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
