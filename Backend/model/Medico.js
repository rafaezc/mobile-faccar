const mongoose = require('mongoose');

const MedicoSchema = new mongoose.Schema({
  name : String,
  crm : String,
  email : String,
  age : Number,
  password : String,
  cep: Number,
  numero: String,
  tem_clinica : Boolean,
  site : String,
  criado_em: Number,
  atualizado_em: Number,
  status : Boolean
});

module.exports = mongoose.model('Medico', MedicoSchema); 