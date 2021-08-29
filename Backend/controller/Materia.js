const Materia = require('../model/Materia');

module.exports = {

  async index(req, res) {
    let materias = await Materia.find().sort({name: 1});
    if (materias === null) {
      return res.status(203).json({message: 'Não foram encontradas matérias vinculadas ao RA logado'}); 
    } else {
      return res.status(200).json(materias);
    }
  },

  async store(req, res) {
    const {name} = req.body;
    const materia = await Materia.create({name});
    return res.json(materia);
  },

  async update(req, res) {
    var id = req.query.id;
    let materia = await Materia.findById(id);
    materia.name = req.body.name;
    materia = await Materia.updateOne({'_id': req.query.id} , materia)
    return res.json({message : 'Atualizar a matéria ' + id +' com os dados do post '+ materia.name});
  },

  async delete(req, res) {
    var id = req.query.id;
    let materia = await Materia.findById(id);
    materia = await Materia.deleteOne(materia);
    return res.json(materia);
  }

} 