const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');

const { getDebitHistoryPage, searchDebitDate } = require('../controllers/debitHistoryController')

router.get('/debitHistory', verifyToken, getDebitHistoryPage,)
router.post('/searchDebitDate/', verifyToken, searchDebitDate)


module.exports = router