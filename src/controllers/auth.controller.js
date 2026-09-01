const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
    expiresIn: '30d'
  });
};

const register = async (req, res) => {
  try {
    const { nombre_completo, email, password, fecha_nacimiento } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const user = await User.create({
      nombre_completo,
      email,
      password_hash: password,
      fecha_nacimiento
    });

    const token = generateToken(user._id);

    res.status(201).json({
      message: 'Usuario registrado con éxito',
      token,
      user: {
        id: user._id,
        nombre_completo: user.nombre_completo,
        email: user.email,
        fecha_nacimiento: user.fecha_nacimiento
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      message: 'Autenticación exitosa',
      token,
      user: {
        id: user._id,
        nombre_completo: user.nombre_completo,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

module.exports = { register, login };