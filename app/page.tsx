import Link from 'next/link';
import Navbar from '@/components/navbar';
import Counter from '@/components/counter';
import { 
  ArrowRight, 
  Briefcase
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
            <div className="flex animate-scroll gap-6 md:gap-12 items-center">
              {/* First set of logos */}
              <div className="flex gap-6 md:gap-12 items-center min-w-full justify-around py-4">
                <div className="w-32 md:w-32 h-32 md:h-32 flex items-center justify-center p-1 md:p-4 hover:scale-110 transition-transform duration-300">
                  <img src="/companies/klipartz.com(1).png" alt="Logo Empresa" className="w-full h-full object-contain" />
                </div>
                <div className="w-32 md:w-32 h-32 md:h-32 flex items-center justify-center p-1 md:p-4 hover:scale-110 transition-transform duration-300">
                  <img src="/companies/klipartz.com(2).png" alt="Logo Empresa" className="w-full h-full object-contain" />
                </div>
                <div className="w-32 md:w-32 h-32 md:h-32 flex items-center justify-center p-1 md:p-4 hover:scale-110 transition-transform duration-300">
                  <img src="/companies/klipartz.com(3).png" alt="Logo Empresa" className="w-full h-full object-contain" />
                </div>
                <div className="w-32 md:w-32 h-32 md:h-32 flex items-center justify-center p-1 md:p-4 hover:scale-110 transition-transform duration-300">
                  <img src="/companies/klipartz.com(4).png" alt="Logo Empresa" className="w-full h-full object-contain" />
                </div>
                <div className="w-32 md:w-32 h-32 md:h-32 flex items-center justify-center p-1 md:p-4 hover:scale-110 transition-transform duration-300">
                  <img src="/companies/klipartz.com(5).png" alt="Logo Empresa" className="w-full h-full object-contain" />
                </div>
                <div className="w-32 md:w-32 h-32 md:h-32 flex items-center justify-center p-1 md:p-4 hover:scale-110 transition-transform duration-300">
                  <img src="/companies/klipartz.com(6).png" alt="Logo Empresa" className="w-full h-full object-contain" />
                </div>
              </div>
              {/* Duplicate set of logos for seamless loop */}
              <div className="flex gap-6 md:gap-12 items-center min-w-full justify-around py-4">
                <div className="w-32 md:w-32 h-32 md:h-32 flex items-center justify-center p-1 md:p-4 hover:scale-110 transition-transform duration-300">
                  <img src="/companies/klipartz.com(1).png" alt="Logo Empresa" className="w-full h-full object-contain" />
                </div>
                <div className="w-32 md:w-32 h-32 md:h-32 flex items-center justify-center p-1 md:p-4 hover:scale-110 transition-transform duration-300">
                  <img src="/companies/klipartz.com(2).png" alt="Logo Empresa" className="w-full h-full object-contain" />
                </div>
                <div className="w-32 md:w-32 h-32 md:h-32 flex items-center justify-center p-1 md:p-4 hover:scale-110 transition-transform duration-300">
                  <img src="/companies/klipartz.com(3).png" alt="Logo Empresa" className="w-full h-full object-contain" />
                </div>
                <div className="w-32 md:w-32 h-32 md:h-32 flex items-center justify-center p-1 md:p-4 hover:scale-110 transition-transform duration-300">
                  <img src="/companies/klipartz.com(4).png" alt="Logo Empresa" className="w-full h-full object-contain" />
                </div>
                <div className="w-32 md:w-32 h-32 md:h-32 flex items-center justify-center p-1 md:p-4 hover:scale-110 transition-transform duration-300">
                  <img src="/companies/klipartz.com(5).png" alt="Logo Empresa" className="w-full h-full object-contain" />
                </div>
                <div className="w-32 md:w-32 h-32 md:h-32 flex items-center justify-center p-1 md:p-4 hover:scale-110 transition-transform duration-300">
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

      {/* CV Optimization Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Optimiza tu CV en minutos
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Recibe recomendaciones personalizadas y mejora tu CV con IA. Destaca entre los demás
              candidatos de manera rápida y sencilla.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12 mt-16">
            {/* Step 1 */}
            <div className="text-center space-y-6">
              <div className="relative mx-auto w-[260px] h-[520px]">
                <img 
                  src="/cv_screens/6ce38e_5d9dbf82348b4f50987fa1064f360b42~mv2.avif" 
                  alt="Envía tu CV por WhatsApp" 
                  className="w-full h-full object-cover rounded-[32px] shadow-xl"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">1. Envía tu CV</h3>
            </div>

            {/* Step 2 */}
            <div className="text-center space-y-6">
              <div className="relative mx-auto w-[260px] h-[520px]">
                <img 
                  src="/cv_screens/Diseño sin título (9)_edited.avif" 
                  alt="Menciona la posición deseada" 
                  className="w-full h-full object-cover rounded-[32px] shadow-xl"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">2. Menciona la posición que te interesa</h3>
            </div>

            {/* Step 3 */}
            <div className="text-center space-y-6">
              <div className="relative mx-auto w-[260px] h-[520px]">
                <img 
                  src="/cv_screens/Diseño sin título (10)_edited.avif" 
                  alt="Recibe tu análisis en PDF" 
                  className="w-full h-full object-cover rounded-[32px] shadow-xl"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">3. Recibe tu análisis en pdf</h3>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link 
              href="https://api.whatsapp.com/send/?phone=+51966384746"
              className="inline-flex items-center justify-center px-8 py-3 bg-[#028bbf] text-white rounded-full font-medium hover:bg-[#027ba8] transition-colors shadow-lg hover:shadow-xl"
            >
              Optimiza tu CV ahora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Banner between CV and Interview sections */}
      <section className="py-20 bg-gradient-to-r from-emerald-500 via-[#028bbf] to-emerald-500">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center text-white space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Un buen CV te abre puertas, pero una gran entrevista te consigue el trabajo.
            </h2>
            <p className="text-xl text-white/90">
              Nosotros te ayudamos con ambos.
            </p>
            <div className="mt-8">
              <Link 
                href="https://api.whatsapp.com/send/?phone=+51966384746"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white rounded-full font-medium hover:bg-white hover:text-[#028bbf] transition-colors"
              >
                Prueba gratis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Interview Simulation Section */}
      <section className="py-20 px-4 bg-white overflow-hidden">
        <div className="container mx-auto max-w-6xl relative">
          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            {/* Content Side */}
            <div className="z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Estás a sólo un paso de practicar para tus entrevistas
              </h2>
              <p className="text-lg text-gray-600 mb-12">
                Nuestro agente de IA está disponible las 24 horas del día, los 7 días de la semana,
                garantizando que cada estudiante pueda practicar en cualquier momento.
              </p>

              <div className="grid grid-cols-2 gap-6">
                {/* Benefit 1 */}
                <div className="bg-[#003B6D] text-white p-6 rounded-2xl">
                  <h3 className="text-lg font-semibold">Aumenta tu confianza</h3>
                </div>

                {/* Benefit 2 */}
                <div className="bg-[#003B6D] text-white p-6 rounded-2xl">
                  <h3 className="text-lg font-semibold">Simula entrevistas reales</h3>
                </div>

                {/* Benefit 3 */}
                <div className="bg-[#003B6D] text-white p-6 rounded-2xl">
                  <h3 className="text-lg font-semibold">Mejora tus respuestas</h3>
                </div>

                {/* Benefit 4 */}
                <div className="bg-[#003B6D] text-white p-6 rounded-2xl">
                  <h3 className="text-lg font-semibold">Destaca frente a otros</h3>
                </div>
              </div>
            </div>

            {/* Phone Image Side */}
            <div className="lg:justify-self-end">
              <div className="relative w-[300px] md:w-[400px] mx-auto">
                <img 
                  src="/simular_entrevista/Diseño sin título (11)_edited.avif" 
                  alt="Simulador de entrevistas" 
                  className="w-full h-auto rounded-3xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Traditional Process Banner */}
      <section className="py-20 bg-gradient-to-r from-emerald-500 via-[#028bbf] to-emerald-500">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center text-white space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              ¿No sabes dónde buscar prácticas? ¿Te parece desordenado el proceso tradicional?
            </h2>
            <p className="text-xl text-white/90">
              Nosotros lo hacemos fácil.
            </p>
            <div className="mt-8">
              <Link 
                href="/bolsa-trabajo"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white rounded-full font-medium hover:bg-white hover:text-[#028bbf] transition-colors"
              >
                Bolsa de trabajo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
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