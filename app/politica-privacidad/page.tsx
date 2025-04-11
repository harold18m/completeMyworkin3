import Link from 'next/link';

export default function PoliticaPrivacidad() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-blue-50 to-indigo-100 font-sans">
      <header className="bg-white py-3 relative shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center gap-2">
                <img src="/MyWorkIn-web.png" alt="MyWorkIn Logo" className="h-8" />
              </div>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Política de Privacidad y Cookies</h1>
          
          <div className="space-y-4 text-gray-700">
            <p>En MyWorkIn, nos comprometemos a proteger tu privacidad y tus datos personales. Esta política de privacidad describe cómo recopilamos, utilizamos y compartimos la información que nos proporcionas a través de nuestro portal de prácticas profesionales.</p>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-6">1. Información que recopilamos</h2>
            <p>Podemos recopilar los siguientes tipos de información:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Información de registro:</strong> Nombre, dirección de correo electrónico, contraseña, y datos profesionales.</li>
              <li><strong>Información del perfil:</strong> Experiencia laboral, educación, habilidades y foto de perfil.</li>
              <li><strong>Información de uso:</strong> Cómo interactúas con nuestro servicio, incluyendo ofertas vistas, aplicaciones enviadas y tiempos de sesión.</li>
              <li><strong>Información del dispositivo:</strong> Tipo de dispositivo, sistema operativo, navegador y dirección IP.</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-6">2. Cómo utilizamos tu información</h2>
            <p>Utilizamos la información recopilada para:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Proporcionar y mejorar nuestros servicios</li>
              <li>Personalizar tu experiencia en la plataforma</li>
              <li>Conectarte con oportunidades de prácticas profesionales</li>
              <li>Comunicarnos contigo sobre actualizaciones, ofertas y eventos relevantes</li>
              <li>Garantizar la seguridad de nuestra plataforma</li>
              <li>Cumplir con obligaciones legales</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-6">3. Compartir información</h2>
            <p>Podemos compartir tu información con:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Empresas ofertantes:</strong> Al aplicar a una oferta, compartimos tu perfil profesional con la empresa que publicó la oportunidad.</li>
              <li><strong>Proveedores de servicios:</strong> Trabajamos con terceros que nos ayudan a operar nuestra plataforma y proporcionar servicios.</li>
              <li><strong>Autoridades legales:</strong> Cuando sea necesario para cumplir con obligaciones legales o proteger nuestros derechos.</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-6">4. Cookies y tecnologías similares</h2>
            <p>Utilizamos cookies y tecnologías similares para mejorar tu experiencia, recordar tus preferencias y comprender cómo utilizas nuestra plataforma. Puedes configurar tu navegador para rechazar todas las cookies o para indicarte cuándo se envía una cookie. Sin embargo, algunas funcionalidades de nuestro servicio pueden no funcionar correctamente si rechazas las cookies.</p>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-6">5. Tus derechos</h2>
            <p>Dependiendo de tu ubicación, puedes tener ciertos derechos relacionados con tus datos personales, incluyendo:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Acceder a los datos personales que tenemos sobre ti</li>
              <li>Rectificar o actualizar tus datos personales</li>
              <li>Eliminar tus datos personales</li>
              <li>Oponerte al procesamiento de tus datos personales</li>
              <li>Retirar tu consentimiento en cualquier momento</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-6">6. Seguridad de datos</h2>
            <p>Implementamos medidas de seguridad técnicas y organizativas para proteger tus datos personales contra el acceso no autorizado, la pérdida o la alteración. Sin embargo, ningún sistema es completamente seguro, y no podemos garantizar la seguridad absoluta de tu información.</p>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-6">7. Transferencias internacionales</h2>
            <p>Podemos transferir, almacenar y procesar tu información en países distintos al tuyo. Tomaremos medidas para garantizar que tus datos personales reciban un nivel adecuado de protección en los países donde los procesamos.</p>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-6">8. Cambios a esta política</h2>
            <p>Podemos actualizar esta política de privacidad periódicamente. Te notificaremos cualquier cambio significativo mediante un aviso destacado en nuestra plataforma o enviándote un correo electrónico.</p>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-6">9. Contacto</h2>
            <p>Si tienes preguntas o inquietudes sobre esta política de privacidad o sobre cómo tratamos tus datos personales, contáctanos a través de nuestra sección de soporte o enviando un correo electrónico a privacy@myworkin.com.</p>
            
            <p className="mt-6">Última actualización: 30 de marzo de 2025</p>
          </div>
        </div>
      </main>
      
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
  );
} 