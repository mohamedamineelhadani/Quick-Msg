const mongoose = require('mongoose');
require('dotenv').config();

const DB = process.env.MONGO_URL;

const connectDB = async () => {
  try{
    await mongoose.connect(DB);
    console.log("connection successfuly");
  }catch(error){
    console.error("Error : ",error.message);
    process.exit(1);
  }
}

module.exports = connectDB;