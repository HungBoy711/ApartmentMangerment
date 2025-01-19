const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');

const { getContractPage, createContract,
    deleteContract, editContract
} = require('../controllers/contractController')

router.get('/contract', verifyToken, getContractPage)
router.post('/create-Contract', createContract)
router.post('/delete-Contract', deleteContract)
router.post('/edit-Contract', editContract)

module.exports = router