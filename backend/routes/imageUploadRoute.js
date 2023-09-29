const express = require('express');
const router = express.Router();
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const sharp = require('sharp');
// const User = require('../models/UserSchema');


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY
});

const storage = multer.memoryStorage();
const upload = multer({storage});

//upload.single -> inbuilt middleware to upload image locally first
router.post('/uploadImage',upload.single('myimage'),async (req,res)=>{
    const file = req.file;
    if(!file){
        return res.status(400).json({success:false,message:'No Image Found'});
    }

    sharp(file.buffer).resize({width:800}).toBuffer(async (err, data, info)=>{
        if(err){
            console.log("Error in Image resizing and saving to cloudinary");
            return res.status(400).json({success:false,message:err});
        }

        cloudinary.uploader.upload_stream({resource_type:'auto'},async (error,result)=>{
            if(error){
                console.log("Cloudinary upload error");
                return res.status(500).json({success:false,message:"Error in Cloudinary upload"});
            }
            res.status(200).json({
                success:true,
                message:"Image uploaded successfully",
                url:result.url
            })
        }).end(data);
    })

})

module.exports = router;
