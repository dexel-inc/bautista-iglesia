export const churchStructuredData = {
  "@context": "https://schema.org",
  "@type": "Church",
  "name": "Iglesia Bautista Fundamental",
  "alternateName": "IBF Casa Grande",
  "description": "Iglesia Bautista Fundamental e independiente que predica y practica la Palabra de Dios en español.",
  "url": "https://iglesiabautistafundamental.com",
  "telephone": "(520) 840-5633",
  "email": "ibfdeaz@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "18280 West Hanna Road",
    "addressLocality": "Casa Grande",
    "addressRegion": "AZ",
    "postalCode": "85193",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "32.82169288170392",
    "longitude": "-111.76663102570213"
  },
  "openingHours": [
    "Su 11:00-12:30",
    "Th 19:00-20:30"
  ],
  "sameAs": [
    "https://www.youtube.com/@iglesiabautistafundamental9995",
    "https://radiolavoz.net/"
  ],
  "founder": {
    "@type": "Person",
    "name": "Roberto Goins"
  }
};

export const injectStructuredData = (data: object) => {
  // Solo ejecutar en el navegador
  if (typeof window === 'undefined') return;

  try {
    // Validar que los datos sean válidos antes de inyectar
    const jsonString = JSON.stringify(data, null, 2);
    if (!jsonString || jsonString === '{}') {
      console.warn('Invalid structured data provided');
      return;
    }

    // Remove existing structured data if any
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Create and inject new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = jsonString;
    document.head.appendChild(script);
    
    // Log para debugging en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.log('Structured data injected:', data);
    }
  } catch (error) {
    console.error('Error injecting structured data:', error);
  }
};

// Función para crear structured data específico para diferentes páginas
export const createPageStructuredData = (pageType: 'home' | 'about', additionalData?: object) => {
  const baseData = { ...churchStructuredData };
  
  if (pageType === 'about') {
    return {
      ...baseData,
      "@type": "AboutPage",
      "mainEntity": baseData,
      ...additionalData
    };
  }
  
  return { ...baseData, ...additionalData };
};
