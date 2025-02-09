const express = require('express');
const router = express.Router();

const { getLoginPage, Login, Logout, } = require('../controllers/authController')

router.get('/login', getLoginPage)
router.post('/login', Login)
router.get('/logout', Logout)

module.exports = router;