const express = require('express');
const router = express.Router();

const citizenRoutes = require('./citizenRoutes');
const apartmentRoutes = require('./apartmentRoutes');
const assetRoutes = require('./assetRoutes')
const homeRoutes = require('./homeRoutes')
const authRoutes = require('./authRoutes')
const userRoutes = require('./userRoutes')

const verifyToken = require('../middleware/authMiddleware');

router.get('/', verifyToken, (req, res) => {
    res.redirect('/homepage');
});

router.use('/', homeRoutes);
router.use('/apartment', apartmentRoutes);
router.use('/citizen', citizenRoutes);
router.use('/asset', assetRoutes);
router.use('/', authRoutes);
router.use('/', userRoutes);

module.exports = router;
