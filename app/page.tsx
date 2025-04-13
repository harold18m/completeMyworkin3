import Link from 'next/link';
import Navbar from '@/components/navbar';
import Counter from '@/components/counter';
import { 
  ArrowRight, 
  Briefcase, 
  Users, 
  Building2,
  Bot,
  FileText,
  Network,
  GraduationCap
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-blue-50 to-indigo-100 font-poppins">
      <Navbar />
      
      {/* Espaciador para compensar el header fijo */}
      <div className="h-[52px]"></div>

      {/* Hero Section */}
      <section className="py-8 md:py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-gray-900">
                Consigue tu<br />
                primer empleo con<br />
                <span className="text-[#028bbf]">Nuestros bots de empleabilidad</span>
              </h1>
              <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8">
                Potencia tu búsqueda laboral con IA. Optimiza tu CV, practica entrevistas y encuentra oportunidades laborales ideales para ti. Ya ayudamos a +2,000 jóvenes a conseguir su primer empleo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  href="https://api.whatsapp.com/send/?phone=+51966384746"
                  className="inline-flex items-center justify-center px-6 py-3 bg-[#028bbf] text-white rounded-full font-medium hover:bg-[#027ba8] transition-colors shadow-lg hover:shadow-xl w-full sm:w-auto"
                >
                  Empezar con Worky
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link 
                  href="/bolsa-trabajo"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#028bbf] rounded-full font-medium hover:bg-gray-50 transition-colors border border-[#028bbf] shadow-lg hover:shadow-xl w-full sm:w-auto"
                >
                  Ver oportunidades
                  <Briefcase className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
            <div className="relative mt-8 lg:mt-0">
              <div className="bg-white p-4 md:p-8 rounded-2xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
                <div className="aspect-[9/16] w-[280px] md:w-[300px] mx-auto">
                  <iframe
                    src="https://www.youtube.com/embed/IQLA4R-LrwI?autoplay=1&mute=1"
                    title="MyWorkIn Bot Demo"
                    className="w-full h-full rounded-xl shadow-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Jobs Section */}
      <section className="py-8 md:py-12 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Consigue practicas en las mejores empresas
            </h2>
            <div className="flex justify-center gap-12 md:gap-24">
              <div className="text-center">
                <Counter end={200} />
                <p className="text-gray-600">Prácticas disponibles</p>
              </div>
              <div className="text-center">
                <Counter end={50} />
                <p className="text-gray-600">Empresas top</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg overflow-hidden">
            <div className="flex animate-scroll gap-12 items-center">
              {/* First set of logos */}
              <div className="flex gap-12 items-center min-w-full justify-around py-4">
                <div className="w-32 h-32 flex items-center justify-center p-4 hover:scale-110 transition-transform duration-300">
                  <img src="/companies/klipartz.com(1).png" alt="Logo Empresa" className="w-full h-full object-contain" />
                </div>
                <div className="w-32 h-32 flex items-center justify-center p-4 hover:scale-110 transition-transform duration-300">
                  <img src="/companies/klipartz.com(2).png" alt="Logo Empresa" className="w-full h-full object-contain" />
                </div>
                <div className="w-32 h-32 flex items-center justify-center p-4 hover:scale-110 transition-transform duration-300">
                  <img src="/companies/klipartz.com(3).png" alt="Logo Empresa" className="w-full h-full object-contain" />
                </div>
                <div className="w-32 h-32 flex items-center justify-center p-4 hover:scale-110 transition-transform duration-300">
                  <img src="/companies/klipartz.com(4).png" alt="Logo Empresa" className="w-full h-full object-contain" />
                </div>
                <div className="w-32 h-32 flex items-center justify-center p-4 hover:scale-110 transition-transform duration-300">
                  <img src="/companies/klipartz.com(5).png" alt="Logo Empresa" className="w-full h-full object-contain" />
                </div>
                <div className="w-32 h-32 flex items-center justify-center p-4 hover:scale-110 transition-transform duration-300">
                  <img src="/companies/klipartz.com(6).png" alt="Logo Empresa" className="w-full h-full object-contain" />
                </div>
              </div>
              {/* Duplicate set of logos for seamless loop */}
              <div className="flex gap-12 items-center min-w-full justify-around py-4">
                <div className="w-32 h-32 flex items-center justify-center p-4 hover:scale-110 transition-transform duration-300">
                  <img src="/companies/klipartz.com(1).png" alt="Logo Empresa" className="w-full h-full object-contain" />
                </div>
                <div className="w-32 h-32 flex items-center justify-center p-4 hover:scale-110 transition-transform duration-300">
                  <img src="/companies/klipartz.com(2).png" alt="Logo Empresa" className="w-full h-full object-contain" />
                </div>
                <div className="w-32 h-32 flex items-center justify-center p-4 hover:scale-110 transition-transform duration-300">
                  <img src="/companies/klipartz.com(3).png" alt="Logo Empresa" className="w-full h-full object-contain" />
                </div>
                <div className="w-32 h-32 flex items-center justify-center p-4 hover:scale-110 transition-transform duration-300">
                  <img src="/companies/klipartz.com(4).png" alt="Logo Empresa" className="w-full h-full object-contain" />
                </div>
                <div className="w-32 h-32 flex items-center justify-center p-4 hover:scale-110 transition-transform duration-300">
                  <img src="/companies/klipartz.com(5).png" alt="Logo Empresa" className="w-full h-full object-contain" />
                </div>
                <div className="w-32 h-32 flex items-center justify-center p-4 hover:scale-110 transition-transform duration-300">
                  <img src="/companies/klipartz.com(6).png" alt="Logo Empresa" className="w-full h-full object-contain" />
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link 
                href="/bolsa-trabajo"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#028bbf] text-white rounded-full font-medium hover:bg-[#027ba8] transition-colors shadow-lg hover:shadow-xl"
              >
                Ver todas las oportunidades
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16">
            {/* Feature 1: AI Assistant */}
            <div className="space-y-8">
              <div className="bg-blue-50 p-4 rounded-2xl inline-block">
                <Bot className="h-8 w-8 text-[#028bbf]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Worky, tu asistente de IA</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="bg-blue-50 p-1 rounded-full mt-1">
                    <ArrowRight className="h-4 w-4 text-[#028bbf]" />
                  </div>
                  <span className="text-gray-600">Recibe feedback personalizado sobre tu CV</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-blue-50 p-1 rounded-full mt-1">
                    <ArrowRight className="h-4 w-4 text-[#028bbf]" />
                  </div>
                  <span className="text-gray-600">Practica entrevistas con IA y mejora tus respuestas</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-blue-50 p-1 rounded-full mt-1">
                    <ArrowRight className="h-4 w-4 text-[#028bbf]" />
                  </div>
                  <span className="text-gray-600">Obtén consejos personalizados para tu búsqueda laboral</span>
                </li>
              </ul>
              <Link 
                href="https://api.whatsapp.com/send/?phone=+51966384746"
                className="inline-flex items-center text-[#028bbf] font-medium hover:text-[#027ba8] transition-colors"
              >
                Conoce a Worky
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>

            {/* Feature 2: CV Builder */}
            <div className="space-y-8">
              <div className="bg-blue-50 p-4 rounded-2xl inline-block">
                <FileText className="h-8 w-8 text-[#028bbf]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">CV Optimizado con IA</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="bg-blue-50 p-1 rounded-full mt-1">
                    <ArrowRight className="h-4 w-4 text-[#028bbf]" />
                  </div>
                  <span className="text-gray-600">Crea un CV profesional en minutos</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-blue-50 p-1 rounded-full mt-1">
                    <ArrowRight className="h-4 w-4 text-[#028bbf]" />
                  </div>
                  <span className="text-gray-600">Optimiza tu CV para cada postulación</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-blue-50 p-1 rounded-full mt-1">
                    <ArrowRight className="h-4 w-4 text-[#028bbf]" />
                  </div>
                  <span className="text-gray-600">Destaca tus logros y habilidades clave</span>
                </li>
              </ul>
              <Link 
                href="/cv-builder"
                className="inline-flex items-center text-[#028bbf] font-medium hover:text-[#027ba8] transition-colors"
              >
                Crear mi CV
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>

            {/* Feature 3: Job Matching */}
            <div className="space-y-8">
              <div className="bg-blue-50 p-4 rounded-2xl inline-block">
                <Network className="h-8 w-8 text-[#028bbf]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Match Inteligente</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="bg-blue-50 p-1 rounded-full mt-1">
                    <ArrowRight className="h-4 w-4 text-[#028bbf]" />
                  </div>
                  <span className="text-gray-600">Encuentra ofertas que coincidan con tu perfil</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-blue-50 p-1 rounded-full mt-1">
                    <ArrowRight className="h-4 w-4 text-[#028bbf]" />
                  </div>
                  <span className="text-gray-600">Recibe alertas de nuevas oportunidades</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-blue-50 p-1 rounded-full mt-1">
                    <ArrowRight className="h-4 w-4 text-[#028bbf]" />
                  </div>
                  <span className="text-gray-600">Postula a empleos verificados y confiables</span>
                </li>
              </ul>
              <Link 
                href="/bolsa-trabajo"
                className="inline-flex items-center text-[#028bbf] font-medium hover:text-[#027ba8] transition-colors"
              >
                Ver empleos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>

            {/* Feature 4: Learning */}
            <div className="space-y-8">
              <div className="bg-blue-50 p-4 rounded-2xl inline-block">
                <GraduationCap className="h-8 w-8 text-[#028bbf]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Desarrollo Profesional</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="bg-blue-50 p-1 rounded-full mt-1">
                    <ArrowRight className="h-4 w-4 text-[#028bbf]" />
                  </div>
                  <span className="text-gray-600">Accede a recursos de aprendizaje exclusivos</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-blue-50 p-1 rounded-full mt-1">
                    <ArrowRight className="h-4 w-4 text-[#028bbf]" />
                  </div>
                  <span className="text-gray-600">Participa en talleres y eventos de networking</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-blue-50 p-1 rounded-full mt-1">
                    <ArrowRight className="h-4 w-4 text-[#028bbf]" />
                  </div>
                  <span className="text-gray-600">Mejora tus habilidades profesionales</span>
                </li>
              </ul>
              <Link 
                href="/recursos"
                className="inline-flex items-center text-[#028bbf] font-medium hover:text-[#027ba8] transition-colors"
              >
                Explorar recursos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 md:py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <Users className="h-8 w-8 text-[#028bbf]" />
                </div>
                <h3 className="text-4xl font-bold text-[#028bbf]">2,000+</h3>
              </div>
              <p className="text-gray-600">Jóvenes empleados</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <Building2 className="h-8 w-8 text-[#028bbf]" />
                </div>
                <h3 className="text-4xl font-bold text-[#028bbf]">500+</h3>
              </div>
              <p className="text-gray-600">Empresas confían</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 md:py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div>
              <img src="/MyWorkIn-web.png" alt="MyWorkIn Logo" className="h-8 mb-4" />
              <p className="text-gray-600">La plataforma líder de empleabilidad juvenil en Perú.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Plataforma</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-600 hover:text-[#028bbf]">Inicio</Link></li>
                <li><Link href="/bolsa-trabajo" className="text-gray-600 hover:text-[#028bbf]">Bolsa de trabajo</Link></li>
                <li><Link href="/agentes-ai" className="text-gray-600 hover:text-[#028bbf]">Agentes de AI</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Recursos</h3>
              <ul className="space-y-2">
                <li><Link href="/blog" className="text-gray-600 hover:text-[#028bbf]">Blog</Link></li>
                <li><Link href="/guias" className="text-gray-600 hover:text-[#028bbf]">Guías</Link></li>
                <li><Link href="/eventos" className="text-gray-600 hover:text-[#028bbf]">Eventos</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/terminos" className="text-gray-600 hover:text-[#028bbf]">Términos y Condiciones</Link></li>
                <li><Link href="/privacidad" className="text-gray-600 hover:text-[#028bbf]">Política de Privacidad</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-12 pt-8 text-center">
            <p className="text-gray-600">© 2024 MyWorkIn. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 