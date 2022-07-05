const User = require('../models/User')
const mongoose = require('mongoose');
const { createError } = require('../utils/error');
const { cleanUser } = require('../utils/userMapper');


const getAllUsers = async (req, res, next) => {
        try {
            const users = await User.find();
            res.status(200).json(users);
       } catch (error) {
            return next(createError(404, 'User not found!'))
       }
};

const findUserById = async (req, res, next) => {
    const id = req.params.id

    if(!mongoose.isValidObjectId(id)){
        return next(createError(400, 'Bad request, invalid id!'))
    }
    const user = await User.findById(id);

    if(!user){
        return next(createError(404, 'User not found!'))
    }
    res.status(200).json(cleanUser(user));
};


const updateUser = async (req, res, next) => {
    const id = req.params.id;

    if(!mongoose.isValidObjectId(id)){
        return next(createError(400, 'Bad request, invalid id!'))
    }
    try {
        const user = await User.findOneAndUpdate({_id: id}, {...req.body}, {new: true})
        res.status(201).json(cleanUser(user));
    } catch (error) {
        return next(createError(400, error.message));
    }
};

const deleteUser = async (req, res, next) => {
    const id = req.params.id
    if(!mongoose.isValidObjectId(id)){
        return next(createError(400, 'Bad request, invalid id!'))
    }
    const deletedUser = await User.findByIdAndDelete(id)
    if(!deletedUser){
        return next(createError(404, "User not found!"));
    }
    res.status(200).json(cleanUser(deletedUser))
};


module.exports = {
    getAllUsers,
    findUserById,
    updateUser,
    deleteUser
}

