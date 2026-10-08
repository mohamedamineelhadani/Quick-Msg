const Messages = require('../models/Messages');
const User = require('../models/Users');
const { message } = require('../utils/messages');

exports.sent = async (req,res) =>{
    const  expediteur = req.user.email;
    try{
        const messages =await Messages.find({expediteur});
        if(messages) res.status(200).json({seccess:true,message:"Messages you sent",data:messages});
        
    }catch(error){
        res.status(500).json({message:error.message});
    }
};

exports.inbox = async (req,res) =>{
    const destinataire = req.user.email;
    try{
        const messages =await Messages.find({destinataire});
        if(messages) res.status(200).json({seccess:true,message:"Messages of inbox",data:messages});
        
    }catch(error){
        res.status(500).json({message:error.message});
    }
};

exports.compose = async (req,res) =>{
    const expediteur = req.user.email;
    const {destinataire,contenu} = req.body;
    const dateEnvoi = new Date();
    try{
        let des = await User.findOne({email:destinataire});

        if (!des || !des.actif) {
            return res.status(400).json({success:false, message: "Email Destinataire not valide" });
        }

        const mailSending = message(expediteur,destinataire,`email from ${expediteur}`,`email from ${expediteur}`,contenu);
        if(mailSending){
            const newMessage = await Messages.create({expediteur,destinataire,contenu,dateEnvoi});
            if(newMessage) res.status(200).json({success:true,message:"A message was sent"});
        }
    }catch(error){
        res.status(500).json({message:error.message});
    }
};

exports.read = async (req,res) =>{
    const { destinataire } = req.user.email;
    const { id } = req.params;
    try{
        const updateMessage =await Messages.findByIdAndUpdate(id,{lu:true});
        if(updateMessage) res.status(200).json({seccess:true,message:`Message ${id} is updated`});
    }catch(error){
        res.status(500).json({message:error.message});
    }
};

exports.delete = async (req,res) =>{
    const { id } = req.params;
    try{
        const deleteMessage = await Messages.findByIdAndDelete(id);
        if(deleteMessage) res.status(200).json({seccess:true,message:`Message ${id} is deleted`});
    }catch(error){
        res.status(500).json({message:error.message});
    }
};