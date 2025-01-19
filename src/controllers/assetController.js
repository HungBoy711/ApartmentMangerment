const express = require('express');
const Asset = require('../models/asset')

const getAssetPage = async (req, res) => {
    let assetCatID = req.params.AssetCatID
    let asset = await Asset.find({ AssetCatID: assetCatID }).exec()
    return res.render('asset/assetPage.ejs', { listAssets: asset })
}
const createAssetPage = (req, res) => {
    return res.render('asset/create-Asset.ejs')
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
    createAssetPage, createAsset,
    editAssetPage, editAsset,
    deleteAssetPage, deleteAsset,
    getAssetPage
}