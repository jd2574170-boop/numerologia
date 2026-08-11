const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password_hash');
      
      if (!req.user) {
        return res.status(401).json({ message: 'Usuario no encontrado.' });
      }

      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Token no válido o expirado.' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'No se proporcionó token de autenticación.' });
  }
};

module.exports = { protect };