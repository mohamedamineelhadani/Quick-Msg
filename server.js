const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
const connectDB = require('./config/database');
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const port =process.env.PORT || 3001;

connectDB();
app.listen(port,()=>{
  console.log(`the sever is running on ${port}`)
})


app.use("/auth",authRoutes);
app.use("/users",userRoutes);
app.use("/messages",messageRoutes);