const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 8000; 
const dbConnect = require("./config/database");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/Auth");
require("dotenv").config();
app.use(bodyParser.json());
app.use(cors());
app.use('/auth',authRoutes);

const router = require("./routes/Auth");

app.get("/", (req, res) =>{
    res.send("Welcome to blog app!");
});
dbConnect();
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})