const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { getAssetCatPage, createAssetCatPage, createAssetCat
    , editAssetCatPage, editAssetCat,
    deleteAssetCatPage, deleteAssetCat,

} = require('../controllers/assetCatController')


router.get('/assetCategory/', verifyToken, getAssetCatPage)
router.get('/create-AssetCatPage', verifyToken, createAssetCatPage)
router.post('/create-AssetCat', verifyToken, createAssetCat)
router.get('/edit-AssetCatPage/:id', verifyToken, editAssetCatPage)
router.post('/edit-AssetCat', verifyToken, editAssetCat)
router.get('/delete-AssetCatPage/:id', verifyToken, deleteAssetCatPage)
router.post('/delete-AssetCat', verifyToken, deleteAssetCat)
module.exports = router;