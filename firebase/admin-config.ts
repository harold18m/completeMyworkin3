import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import * as fs from 'fs';
import * as path from 'path';

// Verificar si ya existe una app de Firebase Admin
let adminApp;

if (getApps().length === 0) {
  try {
    // Leer el archivo de credenciales
    const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || './firebase-service-account.json';
    const absolutePath = path.resolve(serviceAccountPath);
    
    if (fs.existsSync(absolutePath)) {
      const serviceAccount = JSON.parse(fs.readFileSync(absolutePath, 'utf8'));
      
      adminApp = initializeApp({
        credential: cert(serviceAccount),
        projectId: serviceAccount.project_id,
      });
      
      console.log('✅ Firebase Admin SDK inicializado correctamente');
    } else {
      console.error('❌ Archivo de credenciales no encontrado:', absolutePath);
      throw new Error('Archivo de credenciales de Firebase no encontrado');
    }
  } catch (error) {
    console.error('❌ Error inicializando Firebase Admin SDK:', error);
    throw error;
  }
} else {
  adminApp = getApps()[0];
}

// Exportar instancias
export const adminDb = getFirestore(adminApp);
export const adminAuth = getAuth(adminApp);
export { adminApp };

// Función para verificar la inicialización
export const isAdminInitialized = () => {
  return getApps().length > 0;
};
