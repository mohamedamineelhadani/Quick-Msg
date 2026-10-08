const mongoose = require('mongoose');

const MessageShema = mongoose.Schema({
    expediteur:{ type:String,required:true },
    destinataire:{ type:String,required:true },
    contenu:{ type:String,required:true },
    dateEnvoi:{ type:Date,required:true },
    lu:{ type:Boolean,required:true,default:false }
})

const Message = mongoose.model('message',MessageShema);

module.exports = Message;