const mongoose = require('mongoose');

const paragraphSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    }
});

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    paragraphs: {
        type:[paragraphSchema],
        default: []
    },
    Owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"user"
    }
},{
    timestamps: true
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;