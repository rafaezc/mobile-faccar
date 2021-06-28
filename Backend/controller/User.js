const User = require('../model/User');

module.exports = {

  async index(req, res) {
    let users = await User.find()
    return res.json(users);
  },

  async store(req, res) {
    const {name, email, ra, pwd} = req.body;
    const user = await User.create({name, email, ra, pwd});
    return res.json(user);
  },

  async update(req, res) {
    var id = req.query.id;
    let user = await User.findById(id);
    user.name = req.body.name;
    user.email = req.body.email;
    user.ra = req.body.ra;
    user.pwd = req.body.pwd;
    user = await User.updateOne({'_id': req.query.id} , user)
    return res.json({messagem : 'Atualizar o user ' + id +' com os dados do post '+ user.name});
  },

  async delete(req, res) {
    var id = req.query.id;
    let user = await User.findById(id);
    user = await User.deleteOne(user);
    return res.json(user);
  },

  async validation(req, res) {
    const {ra, pwd} = req.body;
    let user = await User.findOne({ra: ra, pwd: pwd});
    if (user === null) {
      return res.status(203).json({mensagem: 'RA ou senha inválidos!' }); //--403 Forbidden para senha ou RA errado?--//
    } else {
      return res.status(200).json(user);
    }
  }

} 