require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const auditMiddleware = require('./middlewares/audit.middleware');

const authRoutes = require('./routes/auth.routes');
const numerologyRoutes = require('./routes/numerology.routes');
const readingsRoutes = require('./routes/readings.routes');
const compatibilityRoutes = require('./routes/compatibility.routes');

const app = express();

// Conectar a MongoDB
connectDB();

// Middlewares
app.use(express.json());
app.use(auditMiddleware);

// Rutas API
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/numerology', numerologyRoutes);
app.use('/api/v1/readings', readingsRoutes);
app.use('/api/v1/compatibility', compatibilityRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor de Numerología ejecutándose en el puerto ${PORT}`);
});

module.exports = app;