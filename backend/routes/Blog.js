const express = require('express');
const router = express.Router();
const User = require("../models/UserSchema");
const Blog = require("../models/BlogSchema");
const jwt = require('jsonwebtoken');
const authTokenHandler = require('../Middlewares/checkAuthToken');

const checkBlogOwnership = async (req, res, next) => {
    try{
        const blog = await Blog.findById(req.params.id);
        if(!blog){
            return res.status(404).json({
                message:"Blog not found"
            });
        }

        if(blog.Owner.toString()!== req.userId){
            return res.status(401).json({
                message:"Unauthorized to access this blog"
            });
        }
        req.blog = blog;
        next();
    }
    catch(err){
        res.status(500).json({ message:err.message });
    }
};

router.get('/test',authTokenHandler, async (req, res) => {
    res.status(200).json({
        message:"Testing of auth token"
    })
})

router.post('/',authTokenHandler, async (req, res) => {
    try{
        const {title,description,image,paragraphs} = req.body;
        const blog = new Blog({title,description,image,paragraphs,Owner:req.userId});
        await blog.save();

        //user ke blog array me bhi daal do ye
        const user = await User.findById(req.userId);
        if(!user){
            return res.status(404).json({
                message:"User not found",
                blog
            });
        }

        user.blogs.push(blog._id);
        await user.save();
        res.status(201).json({
            message:"Blog created successfully"
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message:"Error while creating blog"
        });
    }
});

router.get('/:id',async (req,res) => {
    try{
        const blog = await Blog.findById(req.params.id);
        if(!blog){
            return res.status(404).json({
                message:"Blog not found"
            });
        }
        res.status(200).json({
            blog
        });
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
});

router.put('/:id',authTokenHandler,checkBlogOwnership,async (req,res)=>{
    try{
        const {title,description,image,paragraphs} = req.body;
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            {title,description,image,paragraphs},
            {new:true}
        )
        if(!updatedBlog){
            return res.status(404).json({
                message:"Blog not found"
            });
        }

        res.status(200).json({
            message:"Blog updated successfully",
            blog:updatedBlog
        });
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
})


module.exports = router;