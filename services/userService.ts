import { db } from '../firebase/config';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  university?: string;
  location?: string;
  phone?: string;
  bio?: string;
  photoURL?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserStats {
  cvAnalyzesUsed: number;
  cvAnalyzesTotal: number;
  subscriptionType: 'free' | 'premium';
  subscriptionExpiry?: Date;
}

export class UserService {
  private static USERS_COLLECTION = 'users';
  private static USER_STATS_COLLECTION = 'userStats';

  /**
   * Obtiene el perfil completo del usuario
   */
  static async getUserProfile(uid: string): Promise<UserProfile | null> {
    try {
      const userDoc = await getDoc(doc(db, this.USERS_COLLECTION, uid));
      
      if (userDoc.exists()) {
        const data = userDoc.data();
        return {
          uid,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        } as UserProfile;
      }
      
      return null;
    } catch (error) {
      console.error('Error al obtener el perfil del usuario:', error);
      throw error;
    }
  }

  /**
   * Crea o actualiza el perfil del usuario
   */
  static async updateUserProfile(uid: string, profileData: Partial<UserProfile>): Promise<void> {
    try {
      const userDocRef = doc(db, this.USERS_COLLECTION, uid);
      const userDoc = await getDoc(userDocRef);
      
      const updateData = {
        ...profileData,
        updatedAt: new Date(),
      };

      if (userDoc.exists()) {
        // Actualizar perfil existente
        await updateDoc(userDocRef, updateData);
      } else {
        // Crear nuevo perfil
        await setDoc(userDocRef, {
          uid,
          ...updateData,
          createdAt: new Date(),
        });
      }
    } catch (error) {
      console.error('Error al actualizar el perfil del usuario:', error);
      throw error;
    }
  }

  /**
   * Obtiene las estadísticas del usuario
   */
  static async getUserStats(uid: string): Promise<UserStats> {
    try {
      const statsDoc = await getDoc(doc(db, this.USER_STATS_COLLECTION, uid));
      
      if (statsDoc.exists()) {
        const data = statsDoc.data();
        return {
          cvAnalyzesUsed: data.cvAnalyzesUsed || 0,
          cvAnalyzesTotal: data.cvAnalyzesTotal || 3, // 3 análisis gratis por defecto
          subscriptionType: data.subscriptionType || 'free',
          subscriptionExpiry: data.subscriptionExpiry?.toDate(),
        };
      } else {
        // Crear estadísticas por defecto para nuevo usuario
        const defaultStats: UserStats = {
          cvAnalyzesUsed: 0,
          cvAnalyzesTotal: 3,
          subscriptionType: 'free',
        };
        
        await setDoc(doc(db, this.USER_STATS_COLLECTION, uid), {
          ...defaultStats,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        
        return defaultStats;
      }
    } catch (error) {
      console.error('Error al obtener las estadísticas del usuario:', error);
      throw error;
    }
  }

  /**
   * Actualiza las estadísticas del usuario
   */
  static async updateUserStats(uid: string, stats: Partial<UserStats>): Promise<void> {
    try {
      const statsDocRef = doc(db, this.USER_STATS_COLLECTION, uid);
      
      await updateDoc(statsDocRef, {
        ...stats,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error al actualizar las estadísticas del usuario:', error);
      throw error;
    }
  }

  /**
   * Incrementa el uso de análisis de CV
   */
  static async incrementCVAnalysis(uid: string): Promise<boolean> {
    try {
      const stats = await this.getUserStats(uid);
      
      if (stats.cvAnalyzesUsed >= stats.cvAnalyzesTotal) {
        return false; // No tiene análisis disponibles
      }
      
      await this.updateUserStats(uid, {
        cvAnalyzesUsed: stats.cvAnalyzesUsed + 1,
      });
      
      return true;
    } catch (error) {
      console.error('Error al incrementar el uso de análisis:', error);
      throw error;
    }
  }

  /**
   * Busca usuarios por universidad
   */
  static async getUsersByUniversity(university: string): Promise<UserProfile[]> {
    try {
      const q = query(
        collection(db, this.USERS_COLLECTION),
        where('university', '==', university)
      );
      
      const querySnapshot = await getDocs(q);
      const users: UserProfile[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        users.push({
          uid: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        } as UserProfile);
      });
      
      return users;
    } catch (error) {
      console.error('Error al buscar usuarios por universidad:', error);
      throw error;
    }
  }

  /**
   * Verifica si el usuario puede realizar un análisis de CV
   */
  static async canAnalyzeCV(uid: string): Promise<boolean> {
    try {
      const stats = await this.getUserStats(uid);
      return stats.cvAnalyzesUsed < stats.cvAnalyzesTotal;
    } catch (error) {
      console.error('Error al verificar disponibilidad de análisis:', error);
      return false;
    }
  }

  /**
   * Busca un usuario por email y retorna su UID
   */
  static async getUserByEmail(email: string): Promise<string | null> {
    try {
      const q = query(
        collection(db, this.USERS_COLLECTION),
        where('email', '==', email)
      );
      
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        return querySnapshot.docs[0].id;
      }
      
      return null;
    } catch (error) {
      console.error('Error al buscar usuario por email:', error);
      throw error;
    }
  }

  /**
   * Añade análisis adicionales al usuario (compra) - acepta UID o email
   */
  static async addCVAnalyses(userIdOrEmail: string, amount: number): Promise<void> {
    try {
      let uid = userIdOrEmail;
      
      // Si parece ser un email, buscar el UID
      if (userIdOrEmail.includes('@')) {
        const foundUid = await this.getUserByEmail(userIdOrEmail);
        if (!foundUid) {
          throw new Error(`Usuario con email ${userIdOrEmail} no encontrado`);
        }
        uid = foundUid;
      }
      
      const stats = await this.getUserStats(uid);
      
      await this.updateUserStats(uid, {
        cvAnalyzesTotal: stats.cvAnalyzesTotal + amount,
      });
      
      console.log(`✅ Añadidos ${amount} análisis al usuario ${userIdOrEmail}`);
    } catch (error) {
      console.error('Error al añadir análisis adicionales:', error);
      throw error;
    }
  }
}
