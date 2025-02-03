const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { getApartmentPage, getApartmentDetail, createApartmentPage,
    editApartment, createApartment, deleteApartment, searchApartmentNumber
} = require('../controllers/apartmentController')

router.get('/apartment', verifyToken, getApartmentPage)
router.get('/apartmentDetail/:ApartID', verifyToken, getApartmentDetail)
router.get('/createApartmentPage', verifyToken, createApartmentPage)
router.post('/createApartment', verifyToken, createApartment)
router.post('/delete-Apartment', verifyToken, deleteApartment)
router.post('/edit-Apartment', verifyToken, editApartment)
router.post('/searchApartmentNumber', verifyToken, searchApartmentNumber)


module.exports = router