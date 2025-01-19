const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { getData } = require('../controllers/homeController')


router.get('/homePage', verifyToken, getData)

module.exports = router