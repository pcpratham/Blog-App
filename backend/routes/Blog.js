const express = require('express');
const router = express.Router();
const user = require("../models/UserSchema");
const jwt = require('jsonwebtoken');
const authTokenHandler = require('../Middlewares/checkAuthToken');
const blog = require('../models/BlogSchema');

router.get('/test',authTokenHandler, async (req, res) => {
    res.json({
        message:"Testing of auth token"
    })
})

module.exports = router;