const Protocolo = require('../model/Protocolo');

module.exports = {

  async index(req, res) {
    let protocolos = await Protocolo.find()
    return res.json(protocolos);
  },

  async store(req, res) {
    const {type, status, user} = req.body;
    const protocolo = await Protocolo.create({type, status, user});
    return res.json(protocolo);
  },

  async update(req, res) {
    var id = req.query.id;
    let protocolo = await Protocolo.findById(id);
    protocolo.type = req.body.type;
    protocolo.status = req.body.status;
    protocolo.user = req.body.user;
    protocolo = await Protocolo.updateOne({'_id': req.query.id} , protocolo)
    return res.json({message : 'Protocolo ' + id +' atualizado com os dados do post '+ protocolo.status});
  },

  async delete(req, res) {
    var id = req.query.id;
    let protocolo = await Protocolo.findById(id);
    protocolo = await Protocolo.deleteOne(protocolo);
    return res.json(protocolo);
  },

  async alunoHasProtocolo(req, res) {
    var user = req.body.user;
    let protocolo = await Protocolo.find({user: user}); 
    if (protocolo.length === 0) {
      return res.status(203).json({message: 'Não há protocolos registrados para este usuário'}); 
    } else {
      return res.status(200).json(protocolo);
    }
  }

}