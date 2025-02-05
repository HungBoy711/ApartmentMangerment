const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { getApartmentPage, getApartmentDetail,
    editApartment, editApartmentPage,
    createApartmentPage, createApartment,
    deleteApartment, searchApartmentNumber }
    = require('../controllers/apartmentController')

router.get('/', verifyToken, getApartmentPage)
router.get('/apartmentDetail/:ApartID', verifyToken, getApartmentDetail)
router.get('/createApartmentPage', verifyToken, createApartmentPage)
router.post('/createApartment', verifyToken, createApartment)
router.get('/editApartmentPage/:ApartID', verifyToken, editApartmentPage)
router.post('/edit-Apartment', verifyToken, editApartment)
router.post('/deleteApartment', verifyToken, deleteApartment)
router.post('/searchApartmentNumber', verifyToken, searchApartmentNumber)


module.exports = router