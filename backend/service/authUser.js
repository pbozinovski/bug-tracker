const User = require('../models/User')
const { createError } = require('../utils/error');
const { cleanUser } = require('../utils/userMapper');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


// REGISTER USER

const registerUser = async (req, res, next) => {
    try {
        const {username, email, password, isAdmin} = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({username, email, password: hashedPassword, isAdmin})
        res.status(201).json(cleanUser(user));
    } catch (error) {
        return next(createError(400, error.message));
    }
};


// LOGIN USER

const loginUser = async (req, res, next) => {
    try {
        const {username, password} = req.body;
        //console.log(username, password)

        const user = await User.findOne({username});
        if(!user){
            return next(createError(400, 'User does not exist!'));
        }
        //console.log(user)
        const match = bcrypt.compare(password, user.password);
        //console.log(match)

        if(!match){
            return next(createError(400, 'Wrong credentials!'));
        }

        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET)
        res.cookie("token", token, {maxAge: 900000, httpOnly: true})
        res.status(200).json(cleanUser(user));

    } catch (error) {
        return next(createError(400, error.message));
    }
};

module.exports = {registerUser, loginUser}