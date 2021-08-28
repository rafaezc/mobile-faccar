const Falta = require('../model/Falta');
// const Materias = require('../model/Materias');

module.exports = {

  async index(req, res) {
    let faltas = await Falta.find()
    return res.json(faltas);
  },

  async store(req, res) {
    const {period, quantity, subject, user} = req.body;
    const falta = await Falta.create({period, quantity, subject, user});
    return res.json(falta);
  },

  async update(req, res) {
    var id = req.query.id;
    let falta = await Falta.findById(id);
    falta.period = req.body.period;
    falta.quantity = req.body.quantity;
    falta.subject = req.body.subject;
    falta.user = req.body.subject;
    falta = await Falta.updateOne({'_id': req.query.id} , falta)
    return res.json({message : 'Atualizar as faltas ' + id +' com os dados do post '+ falta.quantity});
  },

  async delete(req, res) {
    var id = req.query.id;
    let falta = await Falta.findById(id);
    falta = await Falta.deleteOne(falta);
    return res.json(falta);
  },

  async materiaHasFalta(req, res) {
    var subject = req.query.subject;
    var user = req.query.user;
    let falta = await Nota.find({user: {$eq: user}, subject: {$eq: subject} }); //-- tentar trocar essa função de busca antes de entregar --//
    return res.json(falta);
  }

} 