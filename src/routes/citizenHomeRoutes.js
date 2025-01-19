const express = require('express');
const router = express.Router();
const verifyCitizenToken = require('../middleware/authCitizenMiddleware');
const { getCitizenHomePage } = require('../controllers/citizenHomeController')


router.get('/citizenHomePage', verifyCitizenToken, getCitizenHomePage)


module.exports = router