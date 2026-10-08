const mongoose = require('mongoose');

const UserShema = new mongoose.Schema({
    nom:{ type: String, required: true },
    email:{ type: String, required: true , unique:true},
    motDePasse :{ type: String, required: true },
    role:{ type: String, required: true },
    actif:{ type: Boolean, required:true, default:false},
},{
    timestamps:true
});

const User = mongoose.model('users',UserShema);

module.exports = User;