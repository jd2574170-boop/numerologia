const mongoose = require('mongoose');

const readingSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  prompt: {
    type: String,
    required: true
  },
  respuesta: {
    type: String,
    required: true
  },
  tipo_lectura: {
    type: String,
    enum: ['diaria', 'general', 'anual'],
    default: 'general'
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Reading', readingSchema);