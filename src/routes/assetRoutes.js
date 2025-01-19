const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { createAssetPage, createAsset,
    editAssetPage, editAsset,
    deleteAssetPage, deleteAsset,
    getAssetPage
} = require('../controllers/assetController')

router.get('/asset/:AssetCatID', verifyToken, getAssetPage)
router.get('/create-AssetPage', verifyToken, createAssetPage)
router.post('/create-Asset', verifyToken, createAsset)
router.get('/asset/edit-AssetPage/:id', verifyToken, editAssetPage)
router.post('/edit-Asset', verifyToken, editAsset)
router.get('/asset/delete-AssetPage/:id', verifyToken, deleteAssetPage)
router.post('/delete-Asset', verifyToken, deleteAsset)

module.exports = router;