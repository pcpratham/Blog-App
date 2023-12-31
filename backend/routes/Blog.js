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
                success:false,
                message:"Blog not found"
            });
        }

        if(blog.Owner.toString()!== req.userId){
            return res.status(401).json({
                success:false,
                message:"Unauthorized to access this blog"
            });
        }
        req.blog = blog;
        next();
    }
    catch(err){
        res.status(500).json({ success:false,message:err.message });
    }
};

router.get('/test',authTokenHandler, async (req, res) => {
    res.status(200).json({
        message:"Testing of auth token"
    })
})

router.post('/',authTokenHandler, async (req, res) => {
    try{
        const {title,description,imageUrl,paragraphs,category} = req.body;
        const blog = new Blog({title,description,imageUrl,paragraphs,category,Owner:req.userId});
        await blog.save();

        //user ke blog array me bhi daal do ye
        const user = await User.findById(req.userId);
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found",
                blog
            });
        }

        user.blogs.push(blog._id);
        await user.save();
        res.status(201).json({
            success:false,
            message:"Blog created successfully"
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Error while creating blog"
        });
    }
});

router.get('/:id',async (req,res) => {
    try{
        const blog = await Blog.findById(req.params.id);
        if(!blog){
            return res.status(404).json({
                success:false,
                message:"Blog not found"
            });
        }
        res.status(200).json({
            success:true,
            blog
        });
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        });
    }
});

router.put('/:id',authTokenHandler,checkBlogOwnership,async (req,res)=>{
    try{
        const {title,description,imageUrl,paragraphs,category} = req.body;
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            {title,description,imageUrl,category,paragraphs},
            {new:true}
        )
        if(!updatedBlog){
            return res.status(404).json({
                success:false,
                message:"Blog not found"
            });
        }

        res.status(200).json({
            success:true,
            message:"Blog updated successfully",
            blog:updatedBlog
        });
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        });
    }
})


//search

router.get('/',async (req,res) => {
    try{
        const search = req.body.search||'';
        const page = parseInt(req.body.page) || 1;

        const perPage = 2;

        const searchQuery = new RegExp(search,'i');
        const totalBlogs = await Blog.countDocuments({title:searchQuery});
        const totalPages = Math.ceil(totalBlogs/perPage);

        if(page<1 || page>totalPages){
            return res.status(404).json({
                success:false,
                message:"Invalid page number"
            });
        }

        // to skip entries of page other than the entered page
        const skip = (page-1)*perPage;
        const blogs = await Blog.find({title:searchQuery}).sort({createdAt:-1}).skip(skip).limit(perPage);

        res.status(200).json({
            success:true,
            blogs,
            totalPages,
            currentPage:page,
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        });
    }
})

module.exports = router;