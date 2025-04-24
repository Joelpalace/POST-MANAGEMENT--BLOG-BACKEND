const jwt = require('jsonwebtoken');
const User = require('../models/Users');

const generateToken = (user) => {
    return jwt.sign({ id: user._id}, process.env.JWT_secret, { expriesIn:"7d" });   

}

