const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 8000; 
const dbConnect = require("./config/database");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/Auth");
const blogRoutes = require("./routes/Blog");
require("dotenv").config();
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use('/auth',authRoutes);
app.use('/blog', blogRoutes);

app.get("/", (req, res) =>{
    res.send("Welcome to blog app!");
});
dbConnect();
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})