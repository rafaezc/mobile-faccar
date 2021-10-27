const mongoose = require('mongoose');

const ProtocoloSchema = new mongoose.Schema({
    type : String,
    status : String,
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
});

module.exports = mongoose.model('Protocolo', ProtocoloSchema);