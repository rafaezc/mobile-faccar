const Clinica = require('../model/Clinica')

module.exports = {

  async index(req,res) {
    let clinicas = await Clinica.find()
    return res.json(clinicas);
  },

  async store(req,res) { 
    let clinica = req.body;
    clinica = await Clinica.create(clinica);
    return res.json(clinica);
  },

  async update(req,res) {
    let clinica = req.body;
    clinica.atualizado_em = Date.now();
    clinica = await Clinica.updateOne({'_id': req.query.id} , clinica);
    return res.json(clinica);
  },

  async delete(req,res) {
    var id = req.query.id;
    let clinica = await Clinica.findById(id);
    clinica = await Clinica.deleteOne(clinica);
    return res.json(clinica);
  }

} 