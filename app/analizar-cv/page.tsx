'use client';

import React, { useState } from 'react';
import { analyzeCV, uploadCV } from '../../src/utils/cvAnalyzer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Upload, FileText } from 'lucide-react';
import Navbar from '@/components/navbar';

export default function AnalizarCVPage() {
  const [file, setFile] = useState<File | null>(null);
  const [puestoPostular, setPuestoPostular] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'application/pdf') {
        setFile(droppedFile);
        setError(null);
      } else {
        setError('Por favor, sube un archivo PDF');
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        setError(null);
      } else {
        setError('Por favor, sube un archivo PDF');
      }
    }
  };

  const handleAnalyze = async () => {
    // 1. Subir el archivo y obtener la URL
    const pdfUrl = await uploadCV(file);

    if (!puestoPostular) {
      setError('Por favor, ingresa el puesto al que postulas');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      console.log('Iniciando análisis con:', { pdfUrl, puestoPostular });
      const result = await analyzeCV(pdfUrl, puestoPostular);
      setResult(result);
    } catch (error) {
      console.error('Error en el componente:', error);
      setError(error instanceof Error ? error.message : 'Error al analizar el CV');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-blue-50 to-indigo-100 font-poppins">
      <Navbar />
      <div className="h-[52px]"></div>
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-900">
              Analiza tu CV con <span className="text-[#028bbf]">Inteligencia Artificial</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 text-center">
              Sube tu CV en PDF y recibe feedback instantáneo para el puesto que deseas.
            </p>
            <Card className="shadow-none border-0">
              <CardContent>
                <div className="space-y-6">
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center ${
                      dragActive ? 'border-primary bg-primary/10' : 'border-gray-300'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <Upload className="h-12 w-12 text-gray-400 mb-4" />
                      <span className="text-sm text-gray-600">
                        {file ? file.name : 'Arrastra tu CV aquí o haz clic para seleccionar'}
                      </span>
                      <span className="text-xs text-gray-500 mt-2">
                        Solo se aceptan archivos PDF
                      </span>
                    </label>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="puesto" className="text-sm font-medium">
                      Puesto al que postulas
                    </label>
                    <Input
                      id="puesto"
                      value={puestoPostular}
                      onChange={(e) => setPuestoPostular(e.target.value)}
                      placeholder="Ej: Desarrollador Frontend"
                    />
                  </div>
                  {error && (
                    <Alert variant="destructive">
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  {result && (
                    <Alert>
                      <AlertTitle>Análisis Completado</AlertTitle>
                      <AlertDescription>
                        <div className="mt-2 flex flex-col items-center gap-2">
                          <p>Tu CV ha sido analizado correctamente. Puedes ver los resultados en el siguiente enlace:</p>
                          <a
                            href={result}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#028bbf] text-white rounded-lg font-medium hover:bg-[#027ba8] transition-colors shadow"
                          >
                            <FileText className="h-5 w-5" />
                            Ver resultados PDF
                          </a>
                        </div>
                      </AlertDescription>
                    </Alert>
                  )}
                  <Button
                    onClick={handleAnalyze}
                    disabled={loading || !file || !puestoPostular}
                    className="w-full"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analizando...
                      </>
                    ) : (
                      <>
                        <FileText className="mr-2 h-4 w-4" />
                        Analizar CV
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}