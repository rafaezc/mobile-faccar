const express = require('express');

const UserController = require('../controller/User');
const ClinicaController = require('../controller/Clinica');
const EspecialidadeController = require('../controller/Especialidade');
const MedicoController = require('../controller/Medico');
const MedicoClinicaController = require('../controller/MedicoClinica');
const MateriaController = require('../controller/Materia');

const routes = express.Router();

routes.get('/', (req, res) => {
  return res.json({message : 'pagina principal'})
}); 

routes.get('/user', UserController.index);
routes.post('/user', UserController.store);
routes.put('/user', UserController.update);
routes.delete('/user', UserController.delete);
routes.post('/user/validation', UserController.validation);

routes.get('/clinica', ClinicaController.index);
routes.post('/clinica', ClinicaController.store);
routes.put('/clinica', ClinicaController.update);
routes.delete('/clinica', ClinicaController.delete);

routes.get('/especialidade', EspecialidadeController.index);
routes.post('/especialidade', EspecialidadeController.store);
routes.put('/especialidade', EspecialidadeController.update);
routes.delete('/especialidade', EspecialidadeController.delete);

routes.get('/medico', MedicoController.index);
routes.post('/medico', MedicoController.store);
routes.put('/medico', MedicoController.update);
routes.delete('/medico', MedicoController.delete);

routes.get('/materia', MateriaController.index);
routes.post('/materia', MateriaController.store);
routes.put('/materia', MateriaController.update);
routes.delete('/materia', MateriaController.delete);

routes.get('/medico-clinica', MedicoClinicaController.index);
routes.post('/medico-clinica', MedicoClinicaController.store);
// routes.get('/medico-clinica', MedicoClinicaController.update);
// routes.post('/medico-clinica', MedicoClinicaController.delete);

module.exports = routes;