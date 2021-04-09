const User = require('../model/User');

module.exports = {

  async index(req,res) {
    let users = await User.find()
    return res.json(users);
  },

  async store(req,res) {
    const {name, email, age, password} = req.body;
    const user = await User.create({name, email, age, password});
    return res.json(user)
  },

  update(req,res) {
    var id = req.query.id;
    var produto = req.body.produto;
    return res.json({messagem : 'Atualizar o produt ' + id +' com os dados do post '+ produto.nome});
  },

  delete(req,res) {
    var id = req.query.id;
    return res.json({messagem : 'deleta o produto ' + id});
  }

} 

