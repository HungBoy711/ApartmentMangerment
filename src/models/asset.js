const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
    AssetID: { type: String, required: true },
    AssetCategory: { type: String, required: true },
    Name: { type: String, required: true },
    PurchaseDate: { type: Date, required: true },
    Status: { type: String, required: true },
    Location: { type: String, required: true }
});

const Asset = mongoose.model('Asset', assetSchema);

module.exports = Asset;
