const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');


const { getServiceFeePage, createServiceFee,
    editServiceFee, deleteServiceFee,
    debit, getDebitPage
} = require('../controllers/serviceFeeController')

router.get('/serviceFee', verifyToken, getServiceFeePage)
router.post('/create-ServiceFee', createServiceFee)
router.post('/edit-ServiceFee', editServiceFee)
router.post('/delete-ServiceFee', deleteServiceFee)
router.get('/get-DebitPage/:id', verifyToken, getDebitPage)
router.post('/debit', debit)

module.exports = router