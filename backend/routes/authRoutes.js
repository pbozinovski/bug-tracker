const router = require('express').Router();
const {
    registerUser,
    loginUser,
    logoutUser
} = require('../service/authUser');

// create/register user
router.post('/register', registerUser);

// create/register user
router.post('/login', loginUser);

// logout user
router.get('/logout', logoutUser);


module.exports = router