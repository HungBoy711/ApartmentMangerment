const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { getAssetPage, searchAssetCategory,
    createAsset, createAssetPage,
    editAssetPage, editAsset,
    deleteAsset
} = require('../controllers/assetController');

router.get('/', verifyToken, getAssetPage);
router.post('/searchAssetCategory', verifyToken, searchAssetCategory);
router.get('/createAssetPage', verifyToken, createAssetPage);
router.get('/editAssetPage/:AssetID', verifyToken, editAssetPage);

router.post('/createAsset', verifyToken, createAsset);
router.post('/editAsset', verifyToken, editAsset);
router.post('/deleteAsset', verifyToken, deleteAsset);

module.exports = router;
