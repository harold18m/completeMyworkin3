"use client";

import React, { useState, useEffect } from "react";
import { analyzeCV, uploadCV } from "../../src/utils/cvAnalyzer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Upload, FileText, Crown, AlertCircle } from "lucide-react";
import Navbar from "@/components/navbar";
import { useAuth } from "../../hooks/useAuth";
import { cvReviewService, CV_PACKAGES } from "../../services/cvReviewService";
import CVPricingModal from "../../components/CVPricingModal";
import CVPaymentModal from "../../components/CVPaymentModal";
import { mercadoPagoService } from "../../services/mercadoPagoService";

export default function AnalizarCVPage() {
  const [file, setFile] = useState<File | null>(null);
  const [puestoPostular, setPuestoPostular] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const { user } = useAuth();
  const [freeUsed, setFreeUsed] = useState(false);
  const [longWait, setLongWait] = useState(false);
  const [veryLongWait, setVeryLongWait] = useState(false);  // Nuevos estados para el sistema persistente
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [userStats, setUserStats] = useState({
    totalReviews: 0,
    remainingReviews: 0,
    freeReviewUsed: false,
    lastReviewDate: undefined as Date | undefined,
  });
  const [reviewPermission, setReviewPermission] = useState({
    canReview: false,
    reason: "loading",
  });
  const [reviewId, setReviewId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadUserData();
    } else {
      const used = localStorage.getItem("cv_analysis_used");
      setFreeUsed(used === "true");
    }
  }, [user]);  const loadUserData = async () => {
    if (!user) return;

    try {      // Cargar datos reales del usuario
      const stats = await cvReviewService.getUserStats(user);
      const permission = await cvReviewService.canUserReview(user);

      setUserStats({
        totalReviews: stats.totalReviews,
        remainingReviews: stats.remainingReviews,
        freeReviewUsed: stats.freeReviewUsed,
        lastReviewDate: stats.lastReviewDate || undefined,
      });

      setReviewPermission(permission);
      setFreeUsed(stats.freeReviewUsed);

    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  useEffect(() => {
    let longWaitTimer: NodeJS.Timeout;
    let veryLongWaitTimer: NodeJS.Timeout;
    if (loading) {
      setLongWait(false);
      setVeryLongWait(false);
      longWaitTimer = setTimeout(() => setLongWait(true), 30000); // 30s
      veryLongWaitTimer = setTimeout(() => setVeryLongWait(true), 120000); // 2min
    } else {
      setLongWait(false);
      setVeryLongWait(false);
    }
    return () => {
      clearTimeout(longWaitTimer);
      clearTimeout(veryLongWaitTimer);
    };
  }, [loading]);

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
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile);
        setError(null);
      } else {
        setError("Por favor, sube un archivo PDF");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
        setError(null);
      } else {
        setError("Por favor, sube un archivo PDF");
      }
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError("Por favor, sube un archivo PDF");
      return;
    }
    if (!puestoPostular) {
      setError("Por favor, ingresa el puesto al que postulas");
      return;
    }

    // Si no hay usuario y ya usó el análisis gratuito, mostrar error
    if (!user && freeUsed) {
      setError(
        "Has usado tu análisis gratuito. Inicia sesión para analizar más CVs."
      );
      return;
    } // Para usuarios autenticados, verificar si pueden hacer revisión
    if (user) {
      if (!reviewPermission.canReview && userStats.remainingReviews === 0) {
        setShowPaymentModal(true);
        return;
      }
    }    setLoading(true);
    setError(null);
    setResult(null);
    setLongWait(false);
    setVeryLongWait(false);
    
    let currentReviewId: string | null = null;
    
    try {
      // 1. Subir el archivo CV
      const cvUrl = await uploadCV(file);
      
      // 2. Crear la revisión en el sistema (solo para usuarios autenticados)
      if (user) {
        currentReviewId = await cvReviewService.createReview(user, {
          fileName: file.name,
          position: puestoPostular,
          status: 'processing',
          fileUrl: cvUrl
        });
        setReviewId(currentReviewId);
        
        // 3. Consumir una revisión del usuario
        await cvReviewService.consumeReview(user);
        
        // 4. Actualizar estadísticas locales
        await loadUserData();
      }
      
      // 5. Procesar el análisis real del CV
      const analysisResult = await analyzeCV(cvUrl, puestoPostular);
      
      // 6. Actualizar la revisión con el resultado (solo para usuarios autenticados)
      if (user && currentReviewId) {
        // Extraer la URL del resultado del análisis
        const resultUrl = analysisResult?.extractedData?.analysisResults?.pdf_url || cvUrl;
        
        await cvReviewService.updateReviewResult(currentReviewId, {
          resultUrl: resultUrl,
          status: 'completed'
        });
      }
      
      // 7. Mostrar el resultado al usuario
      const finalResultUrl = analysisResult?.extractedData?.analysisResults?.pdf_url || cvUrl;
      setResult(finalResultUrl);

      // Marcar como usado solo después de un análisis exitoso para usuarios no logueados
      if (!user) {
        setFreeUsed(true);
        localStorage.setItem("cv_analysis_used", "true");
      }
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Error al analizar el CV";
      setError(errorMsg);
      
      // Si hubo error y se creó una revisión, actualizarla como fallida
      if (user && currentReviewId) {
        try {
          await cvReviewService.updateReviewResult(currentReviewId, {
            status: 'failed',
            errorMessage: errorMsg
          });
        } catch (updateError) {
          console.error('Error actualizando estado de revisión fallida:', updateError);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePurchaseSuccess = async (purchaseData: any) => {
    if (!user) return;

    try {
      // Agregar las revisiones compradas al usuario
      await cvReviewService.addPurchasedReviews(user, purchaseData);

      // Recargar datos del usuario
      await loadUserData();

      // Cerrar modal
      setShowPricingModal(false);

      // Mostrar mensaje de éxito
      setError(null);
    } catch (error) {
      console.error("Error processing purchase:", error);
      setError("Error al procesar la compra. Por favor, contacta soporte.");
    }
  };  const handleSelectPackage = async (packageId: string) => {
    if (!user) {
      setError("Debes iniciar sesión para comprar un paquete");
      return;
    }    try {
      // Buscar información del paquete
      const selectedPackage = CV_PACKAGES.find(pkg => pkg.id === packageId);
      if (!selectedPackage) {
        throw new Error("Paquete no encontrado");
      }

      // Crear preferencia de pago real en Mercado Pago
      const paymentData = await mercadoPagoService.createPaymentPreference({
        packageId,
        userEmail: user.email || '',
        userId: user.uid,
        userName: user.displayName || user.email || 'Usuario',
        packageName: selectedPackage.name,
        amount: selectedPackage.price,
        currency: 'PEN'
      });

      // Redirigir al usuario a Mercado Pago
      if (paymentData.init_point) {
        window.location.href = paymentData.init_point;
      } else {
        throw new Error("No se pudo crear el enlace de pago");
      }
    } catch (error) {
      console.error("Error creating payment:", error);
      setError("Error al procesar la compra. Por favor, intenta nuevamente.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-blue-50 to-indigo-100 font-poppins">
      <Navbar />
      <div className="h-[52px]"></div>
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            {" "}
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-900">
              Analiza tu CV con{" "}
              <span className="text-[#028bbf]">Inteligencia Artificial</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 text-center">
              Sube tu CV en PDF y recibe feedback instantáneo para el puesto que
              deseas.
            </p>
            <Card className="shadow-none border-0">
              <CardContent>
                <div className="space-y-6">
                  {/* Información para usuarios autenticados */}
                  {user && (
                    <Alert className="mb-6 border-blue-200 bg-blue-50">
                      <Crown className="h-4 w-4 text-blue-600" />
                      <AlertTitle className="text-blue-800">
                        Estado de tu cuenta
                      </AlertTitle>
                      <AlertDescription className="text-blue-700">
                        <div className="space-y-1">
                          <p>Revisiones realizadas: {userStats.totalReviews}</p>
                          <p>
                            Revisiones disponibles: {userStats.remainingReviews}
                          </p>
                          {userStats.freeReviewUsed && (
                            <p className="text-sm text-blue-600">
                              ✓ Revisión gratuita utilizada
                            </p>
                          )}
                        </div>
                      </AlertDescription>
                    </Alert>
                  )}
                  {/* Alerta para usuarios no logueados que ya usaron su análisis gratuito */}
                  {!user && freeUsed && (
                    <Alert className="mb-6 border-amber-200 bg-amber-50">
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                      <AlertTitle className="text-amber-800">
                        Análisis gratuito utilizado
                      </AlertTitle>
                      <AlertDescription className="text-amber-700">
                        Ya usaste tu análisis gratuito. Crea una cuenta para
                        acceder a análisis ilimitados y muchas funciones más.
                      </AlertDescription>
                    </Alert>
                  )}
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center ${
                      dragActive
                        ? "border-primary bg-primary/10"
                        : "border-gray-300"
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
                        {file
                          ? file.name
                          : "Arrastra tu CV aquí o haz clic para seleccionar"}
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
                  {loading && (
                    <Alert>
                      <AlertTitle>Analizando tu CV...</AlertTitle>
                      <AlertDescription>
                        <div className="flex flex-col gap-2 items-center">
                          <Loader2 className="h-8 w-8 animate-spin text-[#028bbf] mb-2" />
                          <span>
                            Estamos analizando tu CV. Esto puede demorar hasta 2
                            minutos.
                          </span>
                          {longWait && !veryLongWait && (
                            <span className="text-sm text-gray-500">
                              Sigue esperando, esto puede demorar un poco más de
                              lo normal...
                            </span>
                          )}
                          {veryLongWait && (
                            <span className="text-sm text-red-500">
                              El análisis está tardando demasiado. Puedes
                              intentarlo más tarde o revisar tu conexión.
                            </span>
                          )}
                        </div>
                      </AlertDescription>
                    </Alert>
                  )}
                  {result && (
                    <Alert>
                      <AlertTitle>¡Análisis completado!</AlertTitle>
                      <AlertDescription>
                        <div className="flex flex-col items-center gap-2 mt-2">
                          <p>
                            Tu CV ha sido analizado correctamente. Puedes ver el
                            resultado en el siguiente enlace:
                          </p>
                          <a
                            href={result}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#028bbf] text-white rounded-lg font-medium hover:bg-[#027ba8] transition-colors shadow"
                          >
                            <FileText className="h-5 w-5" />
                            Ver PDF generado
                          </a>
                        </div>
                      </AlertDescription>
                    </Alert>
                  )}{" "}
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
                  {/* Botón para compra cuando no hay revisiones */}
                  {user && userStats.remainingReviews === 0 && (
                    <div className="mt-4 p-4 bg-gradient-to-r from-[#028bbf]/10 to-[#0369a1]/10 border border-[#028bbf]/20 rounded-lg">
                      <p className="text-[#028bbf] text-sm mb-3 font-medium">
                        💎 ¡Desbloquea análisis premium de CV!
                      </p>
                      <p className="text-gray-600 text-xs mb-3">
                        Obtén análisis detallados con recomendaciones
                        personalizadas de IA
                      </p>
                      <Button
                        onClick={() => setShowPaymentModal(true)}
                        className="w-full bg-gradient-to-r from-[#028bbf] to-[#0369a1] hover:from-[#027ba8] hover:to-[#1e40af]"
                      >
                        <Crown className="mr-2 h-4 w-4" />
                        Ver Planes de Análisis
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* Modal de precios */}
      {showPricingModal && (
        <CVPricingModal
          isOpen={showPricingModal}
          onClose={() => setShowPricingModal(false)}
          onSelectPackage={handleSelectPackage}
          userEmail={user?.email ?? undefined}
          loading={loading}
        />
      )}

      {/* Modal de pago con MercadoPago */}
      {showPaymentModal && (
        <CVPaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          userEmail={user?.email ?? undefined}
          userName={user?.displayName ?? user?.email ?? undefined}
        />
      )}
    </div>
  );
}
