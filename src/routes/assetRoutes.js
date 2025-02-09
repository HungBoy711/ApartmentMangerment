const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { getAssetPage, createAsset,
    editAssetPage, editAsset,
    deleteAssetPage, deleteAsset,
} = require('../controllers/assetController')

router.get('/', verifyToken, getAssetPage)
router.post('/create-Asset', verifyToken, createAsset)
router.get('/asset/edit-AssetPage/:id', verifyToken, editAssetPage)
router.post('/edit-Asset', verifyToken, editAsset)
router.get('/asset/delete-AssetPage/:id', verifyToken, deleteAssetPage)
router.post('/delete-Asset', verifyToken, deleteAsset)

module.exports = router;