const express = require('express');
const router = express.Router();

const { getLoginCitizenPage,
    getLoginPage, Login, Logout,
    LoginCitizen
} = require('../controllers/authController')

router.get('/loginCitizen', getLoginCitizenPage)
router.get('/login', getLoginPage)
router.post('/login', Login)
router.get('/logout', Logout)
router.post('/loginCitizen', LoginCitizen)


module.exports = router;