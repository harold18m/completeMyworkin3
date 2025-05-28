'use client';

import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [university, setUniversity] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      if (isRegister) {
        const userCredential = await createUserWithEmailAndPassword(
          require("../../firebase/config").auth, 
          email, 
          password
        );
        
        // Actualizar el perfil del usuario con el nombre
        if (displayName) {
          await updateProfile(userCredential.user, {
            displayName: displayName
          });
        }
        
        setLoading(false);
        router.push('/dashboard');
      } else {
        await login(email, password);
        setLoading(false);
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(
        isRegister 
          ? "No se pudo crear la cuenta. ¿Ya existe?" 
          : "Correo o contraseña incorrectos"
      );
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center px-4 pt-16">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/">
            <img src="/MyWorkIn-web.png" alt="MyWorkIn Logo" className="h-12 mx-auto mb-4" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isRegister ? "Crear cuenta" : "Iniciar sesión"}
          </h1>
          <p className="text-gray-600">
            {isRegister 
              ? "Crea una cuenta para acceder a más funciones" 
              : "Accede con tu correo y contraseña"
            }
          </p>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleLogin} className="space-y-6 text-gray-800">
            {/* Campos adicionales para registro */}
            {isRegister && (
              <>
                <div>
                  <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre completo
                  </label>
                  <input
                    id="displayName"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#028bbf] focus:border-transparent transition"
                    type="text"
                    placeholder="Tu nombre completo"
                    value={displayName}
                    onChange={e => setDisplayName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="university" className="block text-sm font-medium text-gray-700 mb-1">
                    Universidad (opcional)
                  </label>
                  <input
                    id="university"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#028bbf] focus:border-transparent transition"
                    type="text"
                    placeholder="Tu universidad"
                    value={university}
                    onChange={e => setUniversity(e.target.value)}
                  />
                </div>
              </>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Correo electrónico
              </label>
              <input
                id="email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#028bbf] focus:border-transparent transition"
                type="email"
                placeholder="tu@correo.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <input
                id="password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#028bbf] focus:border-transparent transition"
                type="password"
                placeholder="Tu contraseña"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#028bbf] hover:bg-[#027ba8] text-white py-3 rounded-lg font-semibold transition disabled:opacity-50 flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading && (
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              )}
              {loading 
                ? (isRegister ? "Creando..." : "Ingresando...") 
                : (isRegister ? "Crear cuenta" : "Ingresar")
              }
            </button>
          </form>

          <div className="mt-6 space-y-4">
            <button
              type="button"
              className="w-full text-[#028bbf] hover:text-[#027ba8] font-medium transition"
              onClick={() => { setIsRegister(!isRegister); setError(""); }}
            >
              {isRegister ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
            </button>
            
            <Link 
              href="/"
              className="block w-full text-center text-gray-500 hover:text-gray-700 transition"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
