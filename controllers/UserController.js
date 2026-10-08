const User = require('../models/Users');
const bcrypt = require('bcryptjs');

exports.profile = async (req,res) =>{
    const id = req.user.id;
    try{
        const user = await User.findById(id);

        if (!user) {
            return res.status(400).json({success:false, message: "Profile Error"});
        }

        res.status(200).json({success:true, message:"profile", data:user});

    }catch(error){
        res.status(500).json({message:error.message});
    }
};

exports.update = async (req,res) =>{
    const id = req.user.id;
    const oldEmail = req.user.email;
    const {nom,email,motDePasse,role} = req.body;
    try{
        const hashed = await bcrypt.hash(motDePasse,10);
        if(email != oldEmail){
            return res.status(400).json({seccess:true,message:`please use the same email: ${oldEmail}`});
        }
        const updateUser = await User.findByIdAndUpdate(id,{nom,email,motDePasse:hashed,role});
        if(updateUser) res.status(200).json({seccess:true,message:`User ${id} is updated`});
    }catch(error){
        res.status(500).json({success:false,message:error.message});
    }
};

exports.delete = async (req,res) =>{
    const { id } = req.user.id;
    try{
        const deleteUser = await User.findByIdAndDelete(id);
        if(deleteUser) res.status(200).json({seccess:true,message:`User ${id} is deleted`}) ;
    }catch(error){
        res.status(500).json({success:false,message:error.message});
    }
};