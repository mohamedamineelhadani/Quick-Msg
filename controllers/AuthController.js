const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { sendValidation } = require('../utils/authEmail');

exports.register = async (req,res)=>{
    const {nom,email,motDePasse,role}= req.body;
    try{
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({success:false, message: "Email already exists" });
        }

        const hashed = await bcrypt.hash(motDePasse,10);

        user = new User({
            nom,
            email,
            motDePasse: hashed,
            role,
        });

        const saveUser = await user.save();

        if(saveUser){  
            sendValidation(email,saveUser._id);
            res.status(201).json({success:true,message: "Account created successfully But you need to active your account!"});
        }

    }catch(error){
        res.status(500).json({success:false ,message: "Server error: " + error.message });
    }
};

exports.active = async (req,res)=>{
    const {email,id} = req.params;
    try{
        let user = await User.findOne({ email });
        if(!user){
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user._id != id) {
            return res.status(400).json({ success: false, message: "Not the same user" });
        }

        await User.updateOne({email},{$set:{actif:true}});
        res.status(200).json({ success: true, message: "Account Activated!" });

    }catch(error){
        res.status(500).json({success:false ,message: "Server error: " + error.message });
    }
};

exports.login = async (req,res)=>{
    const {email,motDePasse} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success:false,message: "Email not exists" });
        }

        const isMatch = await bcrypt.compare(motDePasse,user.motDePasse);
        
        if(!isMatch){
            return res.status(400).json({success:false,message: "The password not match"});
        }

        if (user.actif !== true) {
            return res.status(400).json({ success: false, message: "You need to active your account"});
        }

        const token = jwt.sign(
          {
            id : user._id,
            email : user.email,
            role : user.role
          },
          process.env.JWT_SECRET,
          {expiresIn:"1h"} 
        )

        
        res.status(201).json({success:true,message: "Login successfully!",token :token});

    }catch(error){
        res.status(500).json({success:false,message: "Server error: " + error.message });
    }
};