const mongoose = require('mongoose');

const FaltaSchema = new mongoose.Schema({
    period : String,
    quantity : Number,
    subject : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Materia'
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
});

module.exports = mongoose.model('Falta', FaltaSchema);