const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const user = require("../models/UserSchema");

router.get('/test',async (req,res) => {
    res.json({
        message:"Auth Api is working!!"
    })
});

router.post('/register',async (req,res) => {
    try{
        const {name,email,password} = req.body;
        const existingUser = await user.find({ email: email});
        if(!existingUser){
            return res.status(409).json({message:"User already registered"});
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password,salt);
        const newUser = await user.create({
            name:name,
            email:email,
            password:secPass
        })
        res.status(201).json({
            success: true,
            message:"User registered successfully",
            data:newUser
        });
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
})

module.exports = router;