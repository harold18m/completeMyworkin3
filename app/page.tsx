import { Info } from "lucide-react"
import JobCategory from "@/components/job-category"
import JobListing from "@/components/job-listing"
import CategoryNav from "@/components/category-nav"
import { getTodayPracticesByCategory, Practice } from "@/services/firebase"
import Link from 'next/link'

// Cambiamos a renderización estática para compatibilidad con exportación
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidar cada hora, pero esto solo funciona con ISR, no con exportación estática

interface CategoryData {
  icon: string;
  bgColor: string;
  practices: Practice[];
}

// Iconos para las categorías
const categoryIcons: Record<string, string> = {
  'Ingeniería Industrial y Mecánica': '🔧',
  'Ingeniería Civil y Arquitectura': '🏗️',
  'Tecnología e innovación': '💻',
  'Administración, economía y finanzas': '📊',
  'Comercial y ventas': '💼',
  'Operaciones, cadena y proyectos': '📦',
  'Marketing y comunicaciones': '📱',
  'Capital humano': '👥',
  'Legal y derecho': '⚖️',
  'Otros': '🔍'
};

export default async function Home() {
  // Obtener datos clasificados desde Firebase usando la nueva función
  const { extractionDate, practices: practicesByCategory } = await getTodayPracticesByCategory();
  
  // Formatear la fecha de extracción
  const formattedDate = extractionDate 
    ? new Date(extractionDate).toLocaleDateString('es-ES', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      })
    : 'No disponible';

  // Preparar las categorías para el menú de navegación
  const navigationCategories = Object.entries(practicesByCategory)
    .map(([name, practices]) => ({
      id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name,
      count: practices.length,
      icon: categoryIcons[name] || '📋'
    }))
    .sort((a, b) => b.count - a.count); // Ordenar por cantidad de prácticas

  // Crear un objeto con todas las categorías configuradas y sus prácticas
  const categoriesData: Record<string, CategoryData> = {};
  
  Object.entries(categoryIcons).forEach(([category, icon]) => {
    categoriesData[category] = {
      icon: icon,
      bgColor: category === 'Otros' ? 'bg-gray-50' : 'bg-amber-50',
      practices: practicesByCategory[category] || []
    };
  });

  // Función para renderizar las prácticas de una categoría
  const renderPractices = (practices: Practice[]) => {
    if (practices.length === 0) {
      return (
        <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-md text-center">
          <p className="text-gray-500">No hay prácticas disponibles en esta categoría actualmente.</p>
        </div>
      );
    }

    return (
      <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-md">
        {practices.map((practice) => (
          <JobListing key={practice.id} practice={practice} />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-blue-50 to-indigo-100 font-sans">
      {/* Header con fondo blanco para MyWorkIn */}
      <header className="bg-white py-3 relative shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/MyWorkIn-web.png" alt="MyWorkIn Logo" className="h-8" />
            </div>
            
            <a 
              href="https://mc.ht/s/SH1lIgc"
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-1.5 px-3 bg-[#028bbf] hover:bg-[#027ba8] text-white rounded-full font-medium shadow-md hover:shadow-lg transition-all text-sm"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>Chatea con Worky</span>
            </a>
          </div>
          
          <div className="mt-3 mb-3 text-center max-w-4xl mx-auto">
            <h2 className="text-xl font-bold mb-1 text-[#028bbf]">Prepárate para tu próxima entrevista</h2>
            <p className="text-gray-600 text-xs mb-0">Tu asistente virtual que revisa CVs y simula entrevistas laborales</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-4 max-w-4xl">
        {/* Title Section - Oportunidades Laborales */}
        <div className="mb-4 bg-[#028bbf] p-4 rounded-xl shadow-xl transform transition-transform duration-300 hover:scale-[1.01]">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-xl">💼</span>
            <h2 className="text-2xl font-bold text-white">
              Oportunidades Laborales
            </h2>
          </div>
          <p className="text-white/90 ml-12 text-sm">
            @MyWorkIn #PrácticasProfesionales
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Info Card con fecha de actualización */}
          <div className="bg-white p-3 rounded-xl shadow-md flex items-center gap-3 border border-indigo-100">
            <div className="text-indigo-500 bg-indigo-50 p-1.5 rounded-full">
              <Info className="h-4 w-4" />
            </div>
            <p className="text-gray-700 text-xs">
              Última actualización: <span className="font-medium text-indigo-700">{formattedDate}</span>
            </p>
          </div>

          {/* Proceso de Aplicación */}
          <div className="bg-white p-3 rounded-xl shadow-md border border-indigo-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="bg-[#028bbf] text-white h-6 w-6 rounded-full flex items-center justify-center mr-2 shadow-sm text-xs">1</span>
                <h3 className="text-sm font-bold text-gray-800">Proceso:</h3>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  <span className="text-lg mr-1">🔍</span>
                  <span className="text-gray-700 text-xs">Encuentra</span>
                </div>
                <div className="flex items-center">
                  <span className="text-lg mr-1">📋</span>
                  <span className="text-gray-700 text-xs">Revisa</span>
                </div>
                <div className="flex items-center">
                  <span className="text-lg mr-1">✅</span>
                  <span className="text-gray-700 text-xs">Postula</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Menú de navegación por categorías */}
        <CategoryNav categories={navigationCategories} />

        {/* Categorías de Prácticas */}
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3 text-gray-800 flex items-center">
            <span className="bg-[#028bbf] text-white h-7 w-7 rounded-full flex items-center justify-center mr-2 shadow-md">2</span>
            <span className="relative">
              Ofertas por Categoría
              <span className="absolute -top-1 -right-20 bg-[#028bbf] text-white text-xs px-2 py-0.5 rounded-full animate-pulse">¡Nuevas!</span>
            </span>
          </h2>

          <div className="space-y-3">
            {Object.entries(practicesByCategory).map(([category, practices]) => (
              practices.length > 0 ? (
                <JobCategory 
                  key={category}
                  id={category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                  icon={categoryIcons[category] || '📋'}
                  title={`${category} (${practices.length})`}
                  bgColor={category === 'Otros' ? 'bg-gray-50' : 'bg-amber-50'}
                >
                  {renderPractices(practices)}
                </JobCategory>
              ) : null
            ))}
          </div>
        </section>
        
        {/* Newsletter y Banner en una sola fila en pantallas más grandes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Newsletter Section - Simplificado */}
          <section className="bg-white p-4 rounded-xl shadow-md border border-indigo-50 h-full">
            <div className="text-center">
              <h2 className="text-sm font-bold mb-2 text-gray-800">¿Quieres recibir alertas de nuevas oportunidades?</h2>
              <div className="flex max-w-full mx-auto">
                <input type="email" placeholder="tucorreo@ejemplo.com" className="flex-grow py-1.5 px-3 bg-gray-50 rounded-l-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs" />
                <button className="py-1.5 px-3 bg-indigo-600 hover:bg-indigo-700 rounded-r-lg text-white font-medium text-xs transition-colors">
                  Suscribirme
                </button>
              </div>
            </div>
          </section>

          {/* Banner de Worky para promoción */}
          <section className="bg-white p-4 rounded-xl shadow-md border border-indigo-50 h-full">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-800 mb-1">¿Buscando prepararte mejor?</h3>
                <p className="text-gray-600 text-xs">Chatear con Worky y practica tus entrevistas</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-gray-50 p-1 rounded-lg shadow-sm hidden sm:block border border-gray-100">
                  <img src="/qr-code.png" alt="QR Code para Worky" className="w-12 h-12" />
                </div>
                <a 
                  href="https://api.whatsapp.com/send/?phone=+51966384746&text&type=phone_number&app_absent=0"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="py-1.5 px-3 bg-green-500 hover:bg-green-600 text-white rounded-lg text-xs flex items-center gap-1 transition-colors shadow-sm"
                >
                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>Chatear</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      {/* Footer simplificado */}
      <footer className="bg-white border-t border-gray-200 py-3 mt-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col justify-center items-center">
            <p className="text-gray-600 text-xs mb-2">© 2025 MyWorkIn. Todos los derechos reservados.</p>
            <div className="flex justify-center space-x-4 text-xs text-indigo-600">
              <Link href="/terminos-condiciones" className="hover:text-indigo-800 transition-colors">Términos y Condiciones</Link>
              <Link href="/politica-privacidad" className="hover:text-indigo-800 transition-colors">Política de Privacidad</Link>
              <Link href="/politica-reembolsos" className="hover:text-indigo-800 transition-colors">Política de Reembolsos</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

