const express = require('express');

const app = express();

// Middleware para entender JSON en las peticiones
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API de Numerología en funcionamiento' });
});

module.exports = app;