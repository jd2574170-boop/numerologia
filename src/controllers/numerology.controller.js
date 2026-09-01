const NumerologyProfile = require('../models/NumerologyProfile');
const { calculateLifePath, calculateExpression, calculateSoul } = require('../services/numerology.service');

const calculateProfile = async (req, res) => {
  try {
    const user = req.user;

    const numero_vida = calculateLifePath(user.fecha_nacimiento);
    const numero_expresion = calculateExpression(user.nombre_completo);
    const numero_alma = calculateSoul(user.nombre_completo);

    let profile = await NumerologyProfile.findOne({ user_id: user._id });

    if (profile) {
      profile.numero_vida = numero_vida;
      profile.numero_expresion = numero_expresion;
      profile.numero_alma = numero_alma;
      profile.fecha_calculo = Date.now();
      await profile.save();
    } else {
      profile = await NumerologyProfile.create({
        user_id: user._id,
        numero_vida,
        numero_expresion,
        numero_alma
      });
    }

    res.status(200).json({
      message: 'Perfil numerológico calculado con éxito',
      profile
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al calcular el perfil', error: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const profile = await NumerologyProfile.findOne({ user_id: req.user._id });
    if (!profile) {
      return res.status(404).json({ message: 'Perfil numerológico no encontrado. Ejecuta primero /calculate.' });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el perfil', error: error.message });
  }
};

module.exports = { calculateProfile, getProfile };