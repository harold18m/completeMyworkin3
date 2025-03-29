import { 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  limit,
  doc,
  getDoc
} from 'firebase/firestore';
import { db } from '@/firebase/config';

// Tipos de datos para las prácticas y categorías
export interface Practice {
  id: string;
  company: string;
  title: string;
  requirements?: string;
  location?: string;
  salary?: string;
  end_date?: string;
  url?: string;
  category?: string; // Categoría asignada durante el procesamiento
}

export interface ExtractedData {
  id: string;
  extraction_date: string;
  total_practices: number;
  source: string;
  max_pages: number;
  use_selenium: boolean;
}

// Palabras clave para cada categoría
const categories = {
  'Comercial y ventas': ['ventas', 'comercial', 'sales', 'business', 'vendedor', 'negocio', 'retail', 'cliente', 'account', 'comercio'],
  'Operaciones, cadena y proyectos': ['operaciones', 'cadena', 'logística', 'suministro', 'supply', 'chain', 'proyecto', 'operations', 'logistics', 'planificación', 'producción', 'calidad'],
  'Marketing y comunicaciones': ['marketing', 'comunicación', 'publicidad', 'community', 'redes', 'social', 'branding', 'digital', 'contenido', 'content', 'comunicaciones', 'diseño', 'gráfico'],
  'Capital humano': ['recursos', 'humanos', 'rrhh', 'hr', 'human', 'resources', 'talento', 'gestión', 'personal', 'selección', 'reclutamiento', 'recruitment', 'talent'],
  'Administración, economía y finanzas': ['administración', 'finanzas', 'contabilidad', 'economía', 'administrative', 'finance', 'accounting', 'financiero', 'tesorería', 'treasury', 'presupuesto', 'facturación', 'cuentas', 'auditoría', 'auditor'],
  'Tecnología e innovación': ['tecnología', 'software', 'programación', 'desarrollador', 'developer', 'IT', 'sistemas', 'informática', 'tech', 'data', 'datos', 'computación', 'web', 'frontend', 'backend', 'fullstack', 'ux', 'ui', 'innovación'],
  'Legal y derecho': ['legal', 'derecho', 'abogado', 'leyes', 'law', 'lawyer', 'jurídico', 'normativa', 'compliance', 'regulatorio'],
  'Ingeniería Civil y Arquitectura': ['civil', 'arquitectura', 'construcción', 'edificación', 'obra', 'ingeniero', 'ingeniería', 'engineering', 'topografía', 'estructural', 'MEP', 'industrial']
};

// Función para clasificar una práctica basada en su título
function classifyPractice(practice: Practice): string {
  const title = (practice.title || '').toLowerCase();
  const requirements = (practice.requirements || '').toLowerCase();
  const textToAnalyze = title + ' ' + requirements;
  
  // Primero intentamos encontrar una categoría basada en palabras clave
  for (const [category, keywords] of Object.entries(categories)) {
    for (const keyword of keywords) {
      if (textToAnalyze.includes(keyword.toLowerCase())) {
        return category;
      }
    }
  }
  
  // Si no se encuentra ninguna categoría, retornamos "Otros"
  return 'Otros';
}

// Obtener la extracción más reciente
export async function getLatestExtraction(): Promise<ExtractedData | null> {
  try {
    const extractionsRef = collection(db, 'extractions');
    const q = query(extractionsRef, orderBy('extraction_date', 'desc'), limit(1));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      extraction_date: doc.data().extraction_date,
      total_practices: doc.data().total_practices,
      source: doc.data().source,
      max_pages: doc.data().max_pages,
      use_selenium: doc.data().use_selenium
    };
  } catch (error) {
    console.error('Error getting latest extraction:', error);
    return null;
  }
}

// Obtener todas las prácticas de una extracción y clasificarlas
export async function getPractices(extractionId: string): Promise<{ [category: string]: Practice[] }> {
  try {
    const practicesRef = collection(db, `extractions/${extractionId}/practices`);
    const querySnapshot = await getDocs(practicesRef);
    
    // Inicializar objeto para almacenar prácticas por categoría
    const practicesByCategory: { [category: string]: Practice[] } = {};
    
    // Inicializar cada categoría con un array vacío
    for (const category of Object.keys(categories)) {
      practicesByCategory[category] = [];
    }
    practicesByCategory['Otros'] = []; // Para prácticas sin categoría clara
    
    // Procesar cada práctica
    querySnapshot.forEach((doc) => {
      const practice = {
        id: doc.id,
        ...doc.data()
      } as Practice;
      
      // Asignar categoría
      const category = classifyPractice(practice);
      practice.category = category;
      
      // Agregar a la categoría correspondiente
      if (practicesByCategory[category]) {
        practicesByCategory[category].push(practice);
      } else {
        practicesByCategory['Otros'].push(practice);
      }
    });
    
    // Eliminar categorías vacías
    for (const category of Object.keys(practicesByCategory)) {
      if (practicesByCategory[category].length === 0) {
        delete practicesByCategory[category];
      }
    }
    
    return practicesByCategory;
  } catch (error) {
    console.error('Error getting practices:', error);
    return {};
  }
}

// Función para obtener los datos más recientes ya clasificados
export async function getLatestPracticesByCategory(): Promise<{ 
  extractionDate: string | null, 
  practices: { [category: string]: Practice[] } 
}> {
  const latestExtraction = await getLatestExtraction();
  
  if (!latestExtraction) {
    return { extractionDate: null, practices: {} };
  }
  
  const practices = await getPractices(latestExtraction.id);
  return { 
    extractionDate: latestExtraction.extraction_date, 
    practices 
  };
} 