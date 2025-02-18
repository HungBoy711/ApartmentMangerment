const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { getStatistical } = require('../controllers/homeController')


router.get('/', verifyToken, getStatistical)

module.exports = router