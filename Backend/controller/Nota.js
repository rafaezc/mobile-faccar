const Nota = require('../model/Nota');

module.exports = {

  async index(req, res) {
    let notas = await Nota.find()
    return res.json(notas);
  },

  async store(req, res) {
    const {period, result, subject, user} = req.body;
    const nota = await Nota.create({period, result, subject, user});
    return res.json(nota);
  },

  async update(req, res) {
    var id = req.query.id;
    let nota = await Nota.findById(id);
    nota.period = req.body.period;
    nota.result = req.body.result;
    nota.subject = req.body.subject;
    nota.user = req.body.user;
    nota = await Nota.updateOne({'_id': req.query.id} , nota)
    return res.json({message : 'Atualizar a nota ' + id +' com os dados do post '+ nota.result});
  },

  async delete(req, res) {
    var id = req.query.id;
    let nota = await Nota.findById(id);
    nota = await Nota.deleteOne(nota);
    return res.json(nota);
  },

  async materiaHasNota(req, res) {
    var subject = req.query.subject;
    var user = req.query.user;
    let nota = await Nota.find({user: {$eq: user}, subject: {$eq: subject} }); //-- tentar trocar essa função de busca antes de entregar --//
    return res.json(nota);
  }

}