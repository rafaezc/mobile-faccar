const Medico = require('../model/Medico')

module.exports = {

  async index(req,res) {
    let medicos = await Medico.find()
    return res.json(medicos);
  },

  async store(req,res) {
    let medico = req.body;
    medico = await Medico.create(medico);
    return res.json(medico);
  },

  async update(req,res) {

    let medico = req.body;
    medico.atualizado_em = Date.now();
    medico = await Medico.updateOne({'_id': req.query.id} , medico);
    return res.json(medico);
  },

  async delete(req,res) {

    var id = req.query.id;
    let medico = await Medico.findById(id);
    medico = await Medico.deleteOne(medico);
    return res.json(medico);
  }

} 