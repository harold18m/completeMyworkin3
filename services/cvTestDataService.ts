'use client';

// Utilidades para desarrollo y testing del sistema de CV
import { cvReviewService, CVReview, CVResult } from './cvReviewService';
import { User } from 'firebase/auth';

export class CVTestDataService {
  
  // Crear datos de prueba para un usuario
  static async createTestData(user: User) {
    try {
      console.log('Creando datos de prueba para:', user.email);
      
      // Crear perfil de usuario si no existe
      await cvReviewService.getUserProfile(user);
      
      // Simular algunas revisiones de CV
      const mockReviews = [
        {
          fileName: 'CV_Juan_Perez.pdf',
          position: 'Desarrollador Frontend',
          status: 'completed' as const,
          result: {
            score: 85,
            summary: 'Tu CV muestra un buen nivel técnico pero necesita mejorar la presentación de proyectos.',
            strengths: [
              'Experiencia sólida en React y JavaScript',
              'Proyectos bien documentados',
              'Habilidades técnicas actualizadas'
            ],
            suggestions: [
              'Agregar métricas de impacto en proyectos anteriores',
              'Mejorar la descripción de responsabilidades',
              'Incluir certificaciones relevantes'
            ],
            sections: {
              experience: { score: 90, feedback: 'Experiencia muy relevante para el puesto' },
              education: { score: 75, feedback: 'Formación académica adecuada' },
              skills: { score: 95, feedback: 'Excelentes habilidades técnicas' },
              format: { score: 70, feedback: 'Formato profesional pero puede mejorar' }
            }
          } as CVResult
        },
        {
          fileName: 'CV_Marketing_Manager.pdf',
          position: 'Marketing Manager',
          status: 'completed' as const,
          result: {
            score: 78,
            summary: 'Perfil interesante para marketing, pero necesita más evidencia de resultados.',
            strengths: [
              'Experiencia en campañas digitales',
              'Conocimiento de herramientas de marketing',
              'Habilidades de liderazgo'
            ],
            suggestions: [
              'Agregar métricas de ROI de campañas',
              'Incluir casos de éxito específicos',
              'Mejorar la presentación visual'
            ],
            sections: {
              experience: { score: 80, feedback: 'Buena experiencia en marketing' },
              education: { score: 85, feedback: 'Formación muy relevante' },
              skills: { score: 75, feedback: 'Skills adecuados pero puede ampliar' },
              format: { score: 70, feedback: 'Diseño profesional' }
            }
          } as CVResult
        },
        {
          fileName: 'CV_Backend_Developer.pdf',
          position: 'Backend Developer',
          status: 'pending' as const
        }
      ];

      const createdReviews = [];
      
      for (const mockReview of mockReviews) {
        try {
          const reviewId = await cvReviewService.createReview(user, {
            fileName: mockReview.fileName,
            position: mockReview.position,
            status: mockReview.status,
            fileUrl: `https://example.com/cv/${mockReview.fileName}`
          });
            if (mockReview.status === 'completed' && mockReview.result) {
            await cvReviewService.updateReviewAnalysisResult(reviewId, mockReview.result);
          }
          
          createdReviews.push(reviewId);
          console.log(`✅ Revisión creada: ${mockReview.fileName} (ID: ${reviewId})`);
        } catch (error) {
          console.error(`❌ Error creando revisión ${mockReview.fileName}:`, error);
        }
      }
      
      console.log('✅ Datos de prueba creados exitosamente');
      return createdReviews;
      
    } catch (error) {
      console.error('❌ Error creando datos de prueba:', error);
      throw error;
    }
  }

  // Limpiar datos de prueba
  static async clearTestData(user: User) {
    try {
      console.log('🧹 Limpiando datos de prueba para:', user.email);
      
      // Aquí podrías agregar lógica para limpiar datos de prueba
      // Por ahora solo logueamos la acción
      console.log('ℹ️ La limpieza de datos requiere implementación específica');
      
    } catch (error) {
      console.error('❌ Error limpiando datos de prueba:', error);
      throw error;
    }
  }

  // Simular compra de paquete
  static async simulatePurchase(user: User, packageId: string) {
    try {
      console.log(`💳 Simulando compra del paquete ${packageId} para:`, user.email);
      
      const mockPaymentId = `mock_payment_${Date.now()}`;
      
      await cvReviewService.addPurchasedReviews(user, {
        packageId,
        paymentId: mockPaymentId,
        packageName: `Paquete Test ${packageId}`,
        reviewsIncluded: packageId === '1-review' ? 1 : packageId === '3-reviews' ? 3 : 6,
        price: packageId === '1-review' ? 4 : packageId === '3-reviews' ? 7 : 10
      });
      
      console.log('✅ Compra simulada exitosamente');
      return mockPaymentId;
      
    } catch (error) {
      console.error('❌ Error simulando compra:', error);
      throw error;
    }
  }

  // Verificar estado del sistema
  static async checkSystemStatus(user: User) {
    try {
      console.log('🔍 Verificando estado del sistema para:', user.email);
      
      const profile = await cvReviewService.getUserProfile(user);
      const stats = await cvReviewService.getUserStats(user);
      const reviews = await cvReviewService.getUserReviews(user.uid);
      const canReview = await cvReviewService.canUserReview(user);
      
      console.log('📊 Estado del sistema:');
      console.log('Profile:', profile);
      console.log('Stats:', stats);
      console.log('Reviews count:', reviews.length);
      console.log('Can review:', canReview);
      
      return {
        profile,
        stats,
        reviewsCount: reviews.length,
        canReview
      };
      
    } catch (error) {
      console.error('❌ Error verificando estado:', error);
      throw error;
    }
  }
}

// Exportar para uso en desarrollo
export const cvTestData = CVTestDataService;

// Función para agregar al contexto global en desarrollo
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as any).cvTestData = CVTestDataService;
}
