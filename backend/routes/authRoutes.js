const router = require('express').Router();
const {
    registerUser,
    loginUser
} = require('../service/authUser');

// create/register user
router.post('/register', registerUser);

// create/register user
router.post('/login', loginUser);


module.exports = router