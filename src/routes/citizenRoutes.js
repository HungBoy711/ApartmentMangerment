const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { createCitizen, getCitizenPage,
    deleteCitizen, editCitizen,
    searchCitizen, searchCitizenRoom
} = require('../controllers/citizenController')

router.get('/citizen', verifyToken, getCitizenPage)
router.post('/citizenSearch', verifyToken, searchCitizen)
router.post('/citizenRoomSearch', verifyToken, searchCitizenRoom)
router.post('/create-Citizen', createCitizen)
router.post('/delete-Citizen', deleteCitizen)
router.post('/edit-Citizen', editCitizen)

module.exports = router