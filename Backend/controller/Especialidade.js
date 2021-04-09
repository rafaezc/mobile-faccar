const Especialidade = require('../model/Especialidade');

module.exports = {

  async index(req,res) {
    let especialidades = await Especialidade.find();
    return res.json(especialidades);
  },

  async store(req,res) {
    let especialidade = req.body;
    especialidade = await Especialidade.create(especialidade);
    return res.json(especialidade);
  },

  async update(req,res) {        
    let especialidade = req.body;
    especialidade.atualizado_em = Date.now();
    especialidade = await Especialidade.updateOne({'_id': req.query.id} , especialidade);
    return res.json(especialidade);
  },

  async delete(req,res) {    
    var id = req.query.id;
    let especialidade = await Especialidade.findById(id);
    especialidade = await Especialidade.deleteOne(especialidade);
    return res.json(especialidade);
  }

} 