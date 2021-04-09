const express = require('express');
const UserController = require('../controller/User');
const routes = express.Router();


routes.get('/', (req, res) => {
  return res.json({message : "pagina principal"})
}); 

routes.get('/user',UserController.index);
routes.post('/user',UserController.store);
routes.put('/user', UserController.update);
routes.delete('/user', UserController.delete);

module.exports = routes;