const mongoose = require('mongoose')

const ClinicaSchema = new mongoose.Schema({
  name : String,
  cnpj : String,
  email : String,
  cep: Number,
  numero: String,
  site : String,
  criado_em: Number,
  atualizado_em: Number,
  status : Boolean
});

module.exports = mongoose.model('Clinica', ClinicaSchema); 