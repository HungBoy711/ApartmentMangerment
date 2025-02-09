const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { getCitizenPage, getCitizenDetail,
    searchCitizen, searchCitizenRoom
} = require('../controllers/citizenController')

router.get('/', verifyToken, getCitizenPage)
router.get('/:CitizenID', verifyToken, getCitizenDetail)
router.post('/citizenSearch', verifyToken, searchCitizen)
router.post('/citizenRoomSearch', verifyToken, searchCitizenRoom)

module.exports = router