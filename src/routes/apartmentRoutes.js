const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { getApartmentPage, getApartmentDetail, editApartment,
    createApartment, deleteApartment,
} = require('../controllers/apartmentController')

router.get('/apartment', verifyToken, getApartmentPage)
router.get('/apartmentDetail/:ApartID', verifyToken, getApartmentDetail)
router.post('/create-Apartment', verifyToken, createApartment)
router.post('/delete-Apartment', verifyToken, deleteApartment)
router.post('/edit-Apartment', verifyToken, editApartment)

module.exports = router