const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');

const { getUserPage, createUser,
    deleteUser, editUser
} = require('../controllers/userController')

router.get('/user', verifyToken, getUserPage)
router.post('/create-User', createUser)
router.post('/delete-User', deleteUser)
router.post('/edit-User', editUser)

module.exports = router