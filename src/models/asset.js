const mongoose = require('mongoose')

const assetSchema = new mongoose.Schema({
    AssetID: String,
    AssetCatID: String,
    Name: String,
    PurchaseDate: String,
    Status: String,
    Location: String,
    Supplier: String
});
const Asset = mongoose.model('Asset', assetSchema);

module.exports = Asset;
