const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 8000; 
const dbConnect = require("./config/database");
const cookieParser = require("cookie-parser");


require("dotenv").config();
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());;