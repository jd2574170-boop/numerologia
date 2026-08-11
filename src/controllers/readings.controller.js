const Reading = require('../models/Reading');
const NumerologyProfile = require('../models/NumerologyProfile');
const { generateNumerologyReading } = require('../services/gemini.service');

const generateReading = async (req, res) => {
  try {
    const { tipo_lectura } = req.body;
    const profile = await NumerologyProfile.findOne({ user_id: req.user._id });

    if (!profile) {
      return res.status(400).json({ message: 'Debes calcular tu perfil numerológico antes de solicitar una lectura.' });
    }

    const { prompt, responseText } = await generateNumerologyReading(profile, tipo_lectura || 'general');

    const newReading = await Reading.create({
      user_id: req.user._id,
      prompt,
      respuesta: responseText,
      tipo_lectura: tipo_lectura || 'general'
    });

    res.status(201).json({
      message: 'Lectura generada con éxito',
      reading: newReading
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al generar la lectura', error: error.message });
  }
};

const getHistory = async (req, res) => {
  try {
    const readings = await Reading.find({ user_id: req.user._id }).sort({ fecha: -1 });
    res.status(200).json(readings);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el historial de lecturas', error: error.message });
  }
};

module.exports = { generateReading, getHistory };