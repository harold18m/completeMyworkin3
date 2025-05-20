'use client';

import Navbar from '@/components/navbar';
import { Bot, FileText, MessageSquare, Upload, Target, Briefcase, Users, Search } from 'lucide-react';

export default function MatchCV() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-blue-50 to-indigo-100 font-poppins">
      <Navbar />
      
      {/* Espaciador para compensar el header fijo */}
      <div className="h-[52px]"></div>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-8">
              <span className="text-black">Encuentra las </span>
              <span className="text-[#028bbf]">Prácticas Ideales</span>
            </h1>
            <p className="text-xl text-gray-600">
              Nuestra IA analiza tu CV y te conecta con las prácticas que mejor se ajustan a tu perfil.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-[#028bbf] rounded-full flex items-center justify-center">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Match Inteligente</h2>
                <p className="text-gray-600">Powered by El Chambas AI</p>
              </div>
            </div>

            <div className="space-y-8">
              {/* Sección de Upload */}
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
                <Upload className="w-12 h-12 text-[#028bbf] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Sube tu CV para comenzar</h3>
                <p className="text-gray-600 mb-4">
                  Encuentra las prácticas que mejor se ajustan a tus habilidades y experiencia
                </p>
                <button className="px-6 py-3 bg-[#028bbf] text-white rounded-xl font-medium hover:bg-[#027ba8] transition-colors">
                  Subir CV
                </button>
              </div>

              {/* Características del servicio */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Search className="w-6 h-6 text-[#028bbf]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Búsqueda Inteligente</h3>
                    <p className="text-gray-600">
                      Analizamos tus habilidades y experiencia para encontrar las mejores coincidencias.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-6 h-6 text-[#028bbf]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Prácticas Actualizadas</h3>
                    <p className="text-gray-600">
                      Accede a una base de datos de prácticas actualizada diariamente.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-[#028bbf]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Conexión Directa</h3>
                    <p className="text-gray-600">
                      Conecta directamente con los reclutadores de las empresas.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-6 h-6 text-[#028bbf]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Recomendaciones IA</h3>
                    <p className="text-gray-600">
                      Recibe sugerencias personalizadas para mejorar tus posibilidades.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-lg text-gray-600 mb-4">
                  ¿Quieres recibir alertas de prácticas en WhatsApp?
                </p>
                <a
                  href="https://mc.ht/s/SH1lIgc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-[#028bbf] text-white rounded-xl font-medium hover:bg-[#027ba8] transition-colors"
                >
                  Conecta con El Chambas
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 