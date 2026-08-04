const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const register = async (req, res) => {
  try {
    const { nombre_completo, email, password, fecha_nacimiento } = req.body;

    if (!nombre_completo || !email || !password || !fecha_nacimiento) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado.' });
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
    if (user && (await user.matchPassword(password))) {
      res.json({
        message: 'Autenticación exitosa',
        token: generateToken(user._id),
        user: {
          id: user._id,
          nombre_completo: user.nombre_completo,
          email: user.email
        }
      });
    } else {
      res.status(401).json({ message: 'Credenciales inválidas.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

module.exports = { register, login };