require('dotenv').config();
const express = require('express');
const connectDB = require('./connectDB.js'); 
const User = require('./UserSchema.js'); 

const app = express();
const port = 3010;

app.use(express.static('static'));
app.use(express.json());

app.post('/signup',async(req,res)=>{
    const {username,email,password} = req.body;
    if(!username||!email||!password){
      return res.status(400).json({message:"All fields are required"  });
    }
    try {
      const bcrypt = require('bcryptjs'); 
      const HashedPassord = await bcrypt.hash(password,10); 
      const newUser = new User({
        username,
        email,
        password:HashedPassord,
      });
      await newUser.save();
      return res.status(201).json({message:"User registered succesfully", newUser});
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({message:"Server error"});      
    }

});

app.listen(port, () => {
  connectDB();
  console.log(`Example app listening at http://localhost:${port}`);
});
