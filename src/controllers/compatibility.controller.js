const CompatibilityMatch = require('../models/CompatibilityMatch');
const NumerologyProfile = require('../models/NumerologyProfile');
const { generateCompatibilityAnalysis } = require('../services/gemini.service');

const checkCompatibility = async (req, res) => {
  try {
    const { target_user_id } = req.body;

    if (!target_user_id) {
      return res.status(400).json({ message: 'Se requiere el ID del otro usuario (target_user_id).' });
    }

    const profile1 = await NumerologyProfile.findOne({ user_id: req.user._id });
    const profile2 = await NumerologyProfile.findOne({ user_id: target_user_id });

    if (!profile1 || !profile2) {
      return res.status(400).json({ message: 'Ambos usuarios deben contar con un perfil numerológico previo.' });
    }

    const { parsed } = await generateCompatibilityAnalysis(profile1, profile2);

    const match = await CompatibilityMatch.create({
      user1_id: req.user._id,
      user2_id: target_user_id,
      puntaje: parsed.puntaje,
      interpretacion: typeof parsed.interpretacion === 'object' 
        ? JSON.stringify(parsed.interpretacion) 
        : parsed.interpretacion
    });

    res.status(201).json({
      message: 'Análisis de compatibilidad completado',
      match
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al procesar la compatibilidad', error: error.message });
  }
};

module.exports = { checkCompatibility };