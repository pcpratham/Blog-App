const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 8000; 
const dbConnect = require("./config/database");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/Auth");
const blogRoutes = require("./routes/Blog");
const imageUploadRoutes = require("./routes/imageUploadRoute");
require("dotenv").config();
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use('/auth',authRoutes);
app.use('/blog', blogRoutes);
app.use('/image',imageUploadRoutes);
dbConnect();

app.get("/", (req, res) =>{
    res.send("Welcome to blog app!");
});


app.get('/blogcategories', async (req, res) => {
    const blogCategories = [
        "Technology Trends",
        "Health and Wellness",
        "Travel Destinations",
        "Food and Cooking",
        "Personal Finance",
        "Career Development",
        "Parenting Tips",
        "Self-Improvement",
        "Home Decor and DIY",
        "Book Reviews",
        "Environmental Sustainability",
        "Fitness and Exercise",
        "Movie and TV Show Reviews",
        "Entrepreneurship",
        "Mental Health",
        "Fashion and Style",
        "Hobby and Crafts",
        "Pet Care",
        "Education and Learning",
        "Sports and Recreation"
    ];
    res.json(
        {
            message: 'Categories fetched successfully',
            categories: blogCategories
        }
    )
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})