const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();
const cors = require('cors');

mongoose.connect('mongodb+srv://usuario_secundario:pretinha@app.a2kbu.mongodb.net/CadeMeuMedicoDb?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3000);

console.log("servidor rodando no end: http://localhost:3000"); 