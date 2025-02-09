const express = require('express');
const Asset = require('../models/asset')
const paginate = require('../utils/paginate');

const getAssetPage = async (req, res) => {
    try {
        const { results, pagination } = paginate(req, Asset.find({}));

        const totalAssets = await Asset.countDocuments({});
        const totalPages = Math.ceil(totalAssets / pagination.limit);

        let listAssets = await results;
        return res.render('asset/assetPage.ejs', {
            listAssets: listAssets,
            currentPage: pagination.page,
            totalPages: totalPages,
            messages: req.flash()
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Lỗi không tìm thấy dữ liệu' });
    }
}

const createAsset = async (req, res) => {
    let AssetID = req.body.AssetID
    let AssetCatID = req.body.AssetCatID
    let Name = req.body.Name
    let PurchaseDate = req.body.PurchaseDate
    let Status = req.body.Status
    let Location = req.body.Location
    let Supplier = req.body.Supplier
    await Asset.create({
        AssetID: AssetID,
        AssetCatID: AssetCatID,
        Name: Name,
        PurchaseDate: PurchaseDate,
        Status: Status,
        Location: Location,
        Supplier: Supplier
    }
    )
    res.redirect('/asset/' + AssetCatID);
}
const editAssetPage = async (req, res) => {
    let ID = req.params.id;
    let asset = await Asset.findById(ID).exec();
    return res.render('asset/edit-Asset.ejs', { asset: asset })
}

const editAsset = async (req, res) => {
    let id = req.body.id
    let AssetID = req.body.AssetID
    let AssetCatID = req.body.AssetCatID
    let Name = req.body.Name
    let PurchaseDate = req.body.PurchaseDate
    let Status = req.body.Status
    let Location = req.body.Location
    let Supplier = req.body.Supplier
    await Asset.updateOne({ _id: id }, {
        AssetID: AssetID,
        AssetCatID: AssetCatID,
        Name: Name,
        PurchaseDate: PurchaseDate,
        Status: Status,
        Location: Location,
        Supplier: Supplier
    });
    res.redirect('/asset/' + AssetCatID);
}
const deleteAssetPage = async (req, res) => {
    let ID = req.params.id;
    let asset = await Asset.findById(ID).exec();
    return res.render('asset/delete-AssetPage.ejs', { asset: asset })
}
const deleteAsset = async (req, res) => {
    let ID = req.body.ID
    let AssetCatID = req.body.AssetCatID
    await Asset.deleteOne({
        _id: ID
    });
    res.redirect('/asset/' + AssetCatID);
}
module.exports = {
    createAsset,
    editAssetPage, editAsset,
    deleteAssetPage, deleteAsset,
    getAssetPage
}