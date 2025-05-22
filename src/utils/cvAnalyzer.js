import axios from 'axios';
// import { supabase } from './supabaseClient';

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

export const uploadCV = async (file) => {
  try {
    if (!file) {
      throw new Error('No se proporcionó un archivo PDF');
    }
    const formData = new FormData();
    formData.append('file', file);
    // Llamada al endpoint externo
    const response = await fetch('https://worky-bot.onrender.com/upload', {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      throw new Error('Error al subir el archivo al servidor externo');
    }
    const data = await response.json();
    // Espera un JSON con { success: true, url: '...' }
    if (!data.success || !data.url) {
      throw new Error('No se recibió la URL del archivo subido');
    }
    return data.url;
  } catch (error) {
    console.error('Error al subir el CV:', error);
    throw new Error('Error al subir el CV');
  }
}

export const analyzeCV = async (pdfUrl, puestoPostular) => {
  try {
    console.log('Iniciando análisis de CV con:', { pdfUrl, puestoPostular });
    // Reemplazar espacios con guiones bajos en el puesto
    const formattedPuesto = puestoPostular.replace(/\s+/g, '_');

    const url = `https://api-cv-myworkin.onrender.com/analizar-cv?pdf_url=${encodeURIComponent(pdfUrl)}&puesto_postular=${encodeURIComponent(formattedPuesto)}`;

    // Realizar la petición GET
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
    return data.pdf_url || data;
  } catch (error) {
    console.error('Error detallado al analizar CV:', error);
    throw new Error(`Error al analizar el CV: ${error.message}`);
  }
};

export const matchesCV = async (cvUrl, puestoPostular, telefono) => {
  try {
    // Construir la URL real del endpoint externo (no proxy interno)
    const url = `https://api-jobs-tyc1.onrender.com/analizar_cv/?pdf_url=${encodeURIComponent(cvUrl)}&puesto=${encodeURIComponent(puestoPostular)}&numero=${encodeURIComponent(telefono)}`;

    // Realizar la petición GET
    const response = await fetch(url, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Error al buscar prácticas: ' + response.statusText);
    }
    const data = await response.json();
    console.log('Respuesta recibida:', data);

    // Validar que la respuesta tenga el array de trabajos
    if (data && Array.isArray(data.trabajos)) {
      return data.trabajos;
    }
    // Si la respuesta es un objeto con trabajos
    if (data && data.trabajos) {
      return data.trabajos;
    }
    // Si la respuesta es un string con URL
    if (typeof data === 'string' && data.startsWith('http')) {
      return data;
    }
    // Si la respuesta es un JSON con pdf_url
    if (data && data.pdf_url) {
      return data.pdf_url;
    }
    // Si la respuesta está vacía o no es un objeto, devolver la URL original
    return cvUrl;
  } catch (error) {
    console.error('Error detallado al analizar coincidencias de CV:', error);
    throw new Error(`Error al analizar coincidencias de CV: ${error.message}`);
  }
};