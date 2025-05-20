import axios from 'axios';
import { supabase } from './supabaseClient';

// Cambia esto si tu bucket tiene otro nombre
const BUCKET_NAME = 'cv-pdfs';

// Función para crear una URL con el proxy CORS
const createProxyUrl = (url) => {
  // Usando cors-anywhere como proxy
  return `https://cors-anywhere.herokuapp.com/${url}`;
};

// Función para verificar si el servidor está disponible
const checkServerStatus = async () => {
  try {
    // Intentamos hacer una petición al endpoint principal
    const response = await fetch('https://api-cv-myworkin.onrender.com/analizar-cv/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      mode: 'cors',
    });
    // Si recibimos cualquier respuesta, el servidor está funcionando
    return true;
  } catch (error) {
    console.error('Error al verificar el servidor:', error);
    return false;
  }
};

// Función para subir el archivo PDF a Supabase Storage y obtener la URL pública
const uploadPDFToSupabase = async (file) => {
  try {
    const fileName = `${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage.from(BUCKET_NAME).upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });
    if (error) throw error;
    // Obtener la URL pública
    const { data: publicUrlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(fileName);
    return publicUrlData.publicUrl;
  } catch (error) {
    console.error('Error al subir el archivo a Supabase:', error);
    throw new Error('Error al subir el archivo PDF');
  }
};

export const analyzeCV = async (file, puestoPostular) => {
  try {
    console.log('Iniciando análisis de CV con:', { file, puestoPostular });
    
    // Verificar que tenemos un archivo
    if (!file) {
      throw new Error('No se proporcionó un archivo PDF');
    }

    // Subir el archivo y obtener la URL pública
    const pdfUrl = await uploadPDFToSupabase(file);
    console.log('PDF subido, URL:', pdfUrl);

    // Reemplazar espacios con guiones bajos en el puesto
    const formattedPuesto = puestoPostular.replace(/\s+/g, '_');
    
    // Construir la URL usando el proxy de Next.js
    const url = `/api/analizar-cv?pdf_url=${encodeURIComponent(pdfUrl)}&puesto_postular=${encodeURIComponent(formattedPuesto)}`;
    console.log('URL de la petición:', url);

    // Realizar la petición GET con timeout extendido (3 minutos)
    const response = await fetch(url, {
      method: 'GET',
    });
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      throw new Error('Respuesta del servidor no es JSON: ' + text.slice(0, 200));
    }

    console.log('Respuesta recibida:', data);

    // Si la respuesta es un string, es probablemente una URL directa
    if (typeof data === 'string' && data.startsWith('http')) {
      console.log('Respuesta directa con URL:', data);
      return data;
    }

    // Si la respuesta es un JSON con pdf_url, extraer esa URL
    if (data && data.pdf_url) {
      console.log('Respuesta JSON con pdf_url:', data.pdf_url);
      return data.pdf_url;
    }

    // Si la respuesta está vacía o no es un objeto, devolver la URL original
    if (!data || (typeof data !== 'object' && typeof data !== 'string')) {
      console.log('Respuesta vacía o inválida, devolviendo URL original del PDF');
      return pdfUrl;
    }

    return data;
  } catch (error) {
    console.error('Error detallado al analizar CV:', error);
    throw new Error(`Error al analizar el CV: ${error.message}`);
  }
}; 