'use client';

import Navbar from '@/components/navbar';
import { Bot, FileText, MessageSquare } from 'lucide-react';

export default function CrearCV() {
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
              <span className="text-black">Crea tu </span>
              <span className="text-[#028bbf]">CV Profesional</span>
            </h1>
            <p className="text-xl text-gray-600">
              Utiliza nuestra herramienta inteligente para crear un CV que destaque tus habilidades y experiencia.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-[#028bbf] rounded-full flex items-center justify-center">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Creador de CV</h2>
                <p className="text-gray-600">Herramienta en desarrollo</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-[#028bbf]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Plantillas Profesionales</h3>
                  <p className="text-gray-600">
                    Elige entre una variedad de plantillas diseñadas por expertos en reclutamiento.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-6 h-6 text-[#028bbf]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Asistente IA</h3>
                  <p className="text-gray-600">
                    Recibe sugerencias inteligentes para mejorar el contenido de tu CV.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-6 h-6 text-[#028bbf]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Feedback en Tiempo Real</h3>
                  <p className="text-gray-600">
                    Obtén retroalimentación instantánea mientras construyes tu CV.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-lg text-gray-600 mb-4">
                ¡Próximamente! Estamos trabajando para traerte la mejor herramienta de creación de CV.
              </p>
              <a
                href="https://mc.ht/s/SH1lIgc"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#028bbf] text-white rounded-xl font-medium hover:bg-[#027ba8] transition-colors"
              >
                Mientras tanto, chatea con Worky
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 