const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { getApartmentPage, getApartmentDetail,
    editApartment, editApartmentPage,
    createApartmentPage, createApartment,
    deleteApartment, searchApartmentNumber,
    createCitizen, createCitizenPage,
    editCitizenPage, editCitizen,
    deleteCitizen }
    = require('../controllers/apartmentController')

router.get('/', verifyToken, getApartmentPage)
router.get('/createApartmentPage', verifyToken, createApartmentPage)
router.get('/editApartmentPage/:ApartID', verifyToken, editApartmentPage)
router.get('/:ApartID', verifyToken, getApartmentDetail)

router.post('/createApartment', verifyToken, createApartment)
router.post('/editApartment', verifyToken, editApartment)
router.post('/deleteApartment', verifyToken, deleteApartment)
router.post('/searchApartmentNumber', verifyToken, searchApartmentNumber)

router.get('/:ApartID/createCitizenPage', verifyToken, createCitizenPage)
router.post('/:ApartID/createCitizen', verifyToken, createCitizen)
router.get('/:ApartID/editCitizenPage/:CitizenID', verifyToken, editCitizenPage)
router.post('/:ApartID/editCitizen', verifyToken, editCitizen)
router.post('/:ApartID/deleteCitizen', verifyToken, deleteCitizen)


module.exports = router