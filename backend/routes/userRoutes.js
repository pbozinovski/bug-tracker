const router = require('express').Router();
const {
    getAllUsers,
    findUserById,
    updateUser,
    deleteUser
} = require('../service/UserService');
const { verifyToken, verifyUser, verifyAdmin } = require('../utils/verifyToken');

// get all users
router.get('/', [verifyToken, verifyAdmin], getAllUsers);

// get user by id
router.get('/:id', [verifyToken, verifyUser], findUserById);

// update user
router.patch('/:id',[verifyToken, verifyUser], updateUser);

// delete user
router.delete('/:id',[verifyToken, verifyUser], deleteUser)

module.exports = router;