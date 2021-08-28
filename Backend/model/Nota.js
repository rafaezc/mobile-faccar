const mongoose = require('mongoose');

const NotaSchema = new mongoose.Schema({
    period : String,
    result : Number,
    subject : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Materia'
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
});

module.exports = mongoose.model('Nota', NotaSchema);