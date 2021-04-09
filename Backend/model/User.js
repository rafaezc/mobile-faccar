const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name : String,
    email : String,
    age : Number,
    password : String
});

module.exports = mongoose.model('User', UserSchema);