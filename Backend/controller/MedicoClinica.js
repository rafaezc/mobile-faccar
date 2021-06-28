const MedicoClinica = require('../model/MedicoClinica');

module.exports = {

 async index(req, res) {
    let medicoClinica = await MedicoClinica.find();
    return res.json(medicoClinica);
  },

  async store(req, res) {
    let {Medico, Clinica, Especialidade,  criado_em, atualizado_em, status} = req.body;
    medicoClinica = await MedicoClinica.create({Medico, Clinica, Especialidade,  criado_em, atualizado_em, status});
    return res.json(medicoClinica);
  },

}  