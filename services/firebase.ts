import { 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  limit,
  doc,
  getDoc,
  where
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
  'Ingeniería Industrial y Mecánica': [
    'maquinaria', 'mecánica', 'industrial', 'mantenimiento', 'máquinas', 'equipos',
    'producción industrial', 'planta', 'manufactura', 'automatización', 'mecatrónica',
    'maquinaria pesada', 'operador', 'técnico mecánico', 'electromecánico'
  ],
  'Ingeniería Civil y Arquitectura': [
    'civil', 'arquitectura', 'construcción', 'edificación', 'obra', 'topografía',
    'estructural', 'MEP', 'residente', 'infraestructura', 'diseño estructural',
    'supervisor de obra', 'proyectos civiles', 'inmobiliaria', 'edificaciones'
  ],
  'Tecnología e innovación': [
    'tecnología', 'software', 'programación', 'desarrollador', 'developer', 'IT',
    'sistemas', 'informática', 'tech', 'data', 'datos', 'computación', 'web',
    'frontend', 'backend', 'fullstack', 'ux', 'ui', 'innovación', 'aplicaciones',
    'base de datos', 'redes', 'cloud', 'devops', 'ciberseguridad', 'soporte técnico'
  ],
  'Administración, economía y finanzas': [
    'administración', 'finanzas', 'contabilidad', 'economía', 'administrative',
    'finance', 'accounting', 'financiero', 'tesorería', 'treasury', 'presupuesto',
    'facturación', 'cuentas', 'auditoría', 'auditor', 'tributación', 'costos',
    'gestión administrativa', 'asistente administrativo', 'back office'
  ],
  'Comercial y ventas': [
    'ventas', 'comercial', 'sales', 'business', 'vendedor', 'negocio', 'retail',
    'cliente', 'account', 'comercio', 'atención al cliente', 'servicio al cliente',
    'asesor comercial', 'ejecutivo de ventas', 'telemarketing', 'call center'
  ],
  'Operaciones, cadena y proyectos': [
    'operaciones', 'cadena', 'logística', 'suministro', 'supply', 'chain',
    'proyecto', 'operations', 'logistics', 'planificación', 'calidad',
    'almacén', 'inventario', 'distribución', 'compras', 'abastecimiento',
    'gestión de proyectos', 'PMO', 'control de calidad'
  ],
  'Marketing y comunicaciones': [
    'marketing', 'comunicación', 'publicidad', 'community', 'redes sociales',
    'social media', 'branding', 'digital', 'contenido', 'content', 'comunicaciones',
    'diseño', 'gráfico', 'audiovisual', 'medios', 'relaciones públicas', 'PR'
  ],
  'Capital humano': [
    'recursos humanos', 'rrhh', 'hr', 'human resources', 'talento', 'gestión',
    'personal', 'selección', 'reclutamiento', 'recruitment', 'talent',
    'capacitación', 'desarrollo organizacional', 'bienestar', 'compensaciones'
  ],
  'Legal y derecho': [
    'legal', 'derecho', 'abogado', 'leyes', 'law', 'lawyer', 'jurídico',
    'normativa', 'compliance', 'regulatorio', 'contratos', 'legislación',
    'asesoría legal', 'notarial', 'procesos legales'
  ]
};

// Función para clasificar una práctica basada en su título y requisitos
function classifyPractice(practice: Practice): string {
  const title = (practice.title || '').toLowerCase();
  const requirements = (practice.requirements || '').toLowerCase();
  const textToAnalyze = title + ' ' + requirements;
  
  // Primero intentamos encontrar una categoría basada en palabras clave
  for (const [category, keywords] of Object.entries(categories)) {
    for (const keyword of keywords) {
      // Usamos una coincidencia de palabra completa para evitar falsos positivos
      const regex = new RegExp(`\\b${keyword.toLowerCase()}\\b`);
      if (regex.test(textToAnalyze)) {
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

// Obtener todas las extracciones del día actual
export async function getTodayExtractions(): Promise<ExtractedData[]> {
  try {
    const extractionsRef = collection(db, 'extractions');
    
    // Obtener la fecha actual en el formato "YYYY-MM-DD"
    const today = new Date().toISOString().split('T')[0];
    const startOfDay = today + " 00:00:00";
    const endOfDay = today + " 23:59:59";
    
    // Consultar todas las extracciones del día actual
    const q = query(
      extractionsRef,
      orderBy('extraction_date'),
      where('extraction_date', '>=', startOfDay),
      where('extraction_date', '<=', endOfDay)
    );
    
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      extraction_date: doc.data().extraction_date,
      total_practices: doc.data().total_practices,
      source: doc.data().source,
      max_pages: doc.data().max_pages,
      use_selenium: doc.data().use_selenium
    }));
  } catch (error) {
    console.error('Error getting today extractions:', error);
    return [];
  }
}

// Función para obtener los datos del día actual ya clasificados
export async function getTodayPracticesByCategory(): Promise<{ 
  extractionDate: string | null, 
  practices: { [category: string]: Practice[] } 
}> {
  const todayExtractions = await getTodayExtractions();
  
  if (todayExtractions.length === 0) {
    return { extractionDate: null, practices: {} };
  }
  
  // Inicializar objeto para almacenar todas las prácticas por categoría
  const allPracticesByCategory: { [category: string]: Practice[] } = {};
  
  // Inicializar cada categoría con un array vacío
  for (const category of Object.keys(categories)) {
    allPracticesByCategory[category] = [];
  }
  allPracticesByCategory['Otros'] = [];
  
  // Obtener y combinar las prácticas de todas las extracciones del día
  for (const extraction of todayExtractions) {
    const extractionPractices = await getPractices(extraction.id);
    
    // Combinar las prácticas por categoría
    for (const [category, practices] of Object.entries(extractionPractices)) {
      if (allPracticesByCategory[category]) {
        // Filtrar duplicados basados en la URL
        const existingUrls = new Set(allPracticesByCategory[category].map(p => p.url));
        const newPractices = practices.filter(p => !existingUrls.has(p.url));
        allPracticesByCategory[category].push(...newPractices);
      }
    }
  }
  
  // Eliminar categorías vacías
  for (const category of Object.keys(allPracticesByCategory)) {
    if (allPracticesByCategory[category].length === 0) {
      delete allPracticesByCategory[category];
    }
  }
  
  // Usar la fecha de la extracción más reciente
  const latestExtraction = todayExtractions.reduce((latest, current) => {
    return !latest || current.extraction_date > latest.extraction_date ? current : latest;
  }, todayExtractions[0]);
  
  return { 
    extractionDate: latestExtraction.extraction_date, 
    practices: allPracticesByCategory 
  };
} 