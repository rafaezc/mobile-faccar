const express = require('express');

const app = express();

app.listen(3000)
app.use(express.json()) 

app.get('/', (req, res) =>{
  var id = req.query.id;
  return res.json({messagem : 'hello word ' + id})
});

app.post('/', (req, res) =>{
  var nome = req.body.nome;
  return res.json({messagem : 'hello word ' + nome})
}); 