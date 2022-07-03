const mongoose = require('mongoose')

const Schema = mongoose.Schema

const validateEmail = (email) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
}

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: 'Username is required'
    },
    email: {
        type: String, 
        unique: true,
        trim: true,
        lowercase: true,
        required: 'Email is required',
        validate: [validateEmail, 'Please enter a valid email.']
    },
    password: {
        type: String,
        required: 'Password is required'
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
}, {timestamps: true});

module.exports = mongoose.model('User', UserSchema);