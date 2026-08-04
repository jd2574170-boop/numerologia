const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  nombre_completo: {
    type: String,
    required: [true, 'El nombre completo es obligatorio'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password_hash: {
    type: String,
    required: [true, 'La contraseña es obligatoria']
  },
  fecha_nacimiento: {
    type: Date,
    required: [true, 'La fecha de nacimiento es obligatoria']
  },
  fecha_registro: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password_hash')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password_hash = await bcrypt.hash(this.password_hash, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password_hash);
};

module.exports = mongoose.model('User', userSchema);