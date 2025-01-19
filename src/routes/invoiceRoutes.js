const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');

const { getInvoicePage, createInvoice,
    editInvoice, deleteInvoice,
    paymentInvoice
} = require('../controllers/invoiceController')

router.get('/Invoice', verifyToken, getInvoicePage)
router.post('/create-Invoice', createInvoice)
router.post('/edit-Invoice', editInvoice)
router.post('/delete-Invoice', deleteInvoice)
router.post('/payment-Invoice', paymentInvoice)

module.exports = router