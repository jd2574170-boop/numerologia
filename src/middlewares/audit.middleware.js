const AuditLog = require('../models/AuditLog');

const auditMiddleware = (req, res, next) => {
  res.on('finish', async () => {
    try {
      await AuditLog.create({
        endpoint: req.originalUrl,
        metodo: req.method,
        status_code: res.statusCode,
        user_id: req.user ? req.user._id : null
      });
    } catch (error) {
      console.error('Error guardando AuditLog:', error.message);
    }
  });
  next();
};

module.exports = auditMiddleware;