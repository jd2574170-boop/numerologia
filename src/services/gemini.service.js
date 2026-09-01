const model = require('../config/gemini');

const generateNumerologyReading = async (profile, type = 'general') => {
  const prompt = `Actúa como un experto en numerología. Genera una interpretación ${type} profesional, mística y orientadora para una persona con el siguiente perfil numerológico:
  - Número de Camino de Vida: ${profile.numero_vida}
  - Número de Expresión: ${profile.numero_expresion}
  - Número de Alma: ${profile.numero_alma}

  Escribe la respuesta en formato JSON válido con las claves "resumen", "fortalezas", "desafios" y "mensaje_principal".`;

  const result = await model.generateContent(prompt);
  const responseText = result.response.text();
  
  return { prompt, responseText };
};

const generateCompatibilityAnalysis = async (profile1, profile2) => {
  const prompt = `Analiza la compatibilidad numerológica entre dos personas:
  Persona 1 -> Camino de Vida: ${profile1.numero_vida}, Expresión: ${profile1.numero_expresion}, Alma: ${profile1.numero_alma}
  Persona 2 -> Camino de Vida: ${profile2.numero_vida}, Expresión: ${profile2.numero_expresion}, Alma: ${profile2.numero_alma}

  Calcula un puntaje estimado de compatibilidad de 0 a 100 y provee una breve interpretación detallada.
  Responde estrictamente con un objeto JSON válido con los campos:
  {
    "puntaje": 85,
    "interpretacion": "Explicación del análisis..."
  }`;

  const result = await model.generateContent(prompt);
  const responseText = result.response.text();

  let cleanedJson = responseText.replace(/```json|```/g, '').trim();
  let parsed = { puntaje: 70, interpretacion: responseText };

  try {
    parsed = JSON.parse(cleanedJson);
  } catch (e) {
    console.error("Error al parsear respuesta JSON de Gemini, usando fallback.");
  }

  return { prompt, parsed };
};

module.exports = {
  generateNumerologyReading,
  generateCompatibilityAnalysis
};