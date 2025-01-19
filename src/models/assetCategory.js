const mongoose = require('mongoose')

const assetCategorySchema = new mongoose.Schema({
    AssetCatID: String,
    Name: String,
    Description: String,
});
const AssetCategory = mongoose.model('AssetCategory', assetCategorySchema);

module.exports = AssetCategory;
