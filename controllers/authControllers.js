const jwt = require('jsonwebtoken');
const User = require('../models/Users');

const generateToken = (user) => {
    return jwt.sign({ id: user._id}, process.env.JWT_secret, { expriesIn:"7d" });   

}

exports.register = async (req, res) => {
    try{
        const { username, email, password } = req.body;
        const userExists = await User.findOne({ email });
        if(userExists) {
            return res.status(400).json({ message: "User already exists" });
            const user = await User.create({
                username,
                email,
                password    
            });
            res.status(201).json({ token: generateToken(user), user: (id) });
        }
    }
};