const express = require('express');
const AssetCategory = require('../models/assetCategory')
const Asset = require('../models/asset')

const getAssetCatPage = async (req, res) => {
    let results = await AssetCategory.find({});
    return res.render('assetCats/assetCategoryPage.ejs', { listAssetCats: results })
}

const createAssetCatPage = (req, res) => {
    return res.render('assetCats/create-AssetCat.ejs')
}
const createAssetCat = async (req, res) => {
    let AssetCatID = req.body.AssetCatID
    let Name = req.body.Name
    let Description = req.body.Description
    await AssetCategory.create({
        AssetCatID: AssetCatID,
        Name: Name,
        Description: Description,
    }
    )
    res.redirect('/assetCategory')
}
const editAssetCatPage = async (req, res) => {
    let ID = req.params.id;
    let assetCat = await AssetCategory.findById(ID).exec();
    return res.render('assetCats/edit-AssetCat.ejs', { assetCat: assetCat })
}

const editAssetCat = async (req, res) => {
    let id = req.body.id
    let AssetCatID = req.body.AssetCatID
    let Name = req.body.Name
    let Description = req.body.Description
    await AssetCategory.updateOne({ _id: id }, {
        AssetCatID: AssetCatID,
        Name: Name,
        Description: Description,
    });
    res.redirect('/assetCategory');
}
const deleteAssetCatPage = async (req, res) => {
    let ID = req.params.id;
    let assetCat = await AssetCategory.findById(ID).exec();
    return res.render('assetCats/delete-AssetCatPage.ejs', { assetCat: assetCat })
}
const deleteAssetCat = async (req, res) => {
    let ID = req.body.ID
    await AssetCategory.deleteOne({
        _id: ID
    });
    res.redirect('/assetCategory');
}

module.exports = {
    getAssetCatPage, createAssetCatPage, createAssetCat,
    editAssetCatPage, editAssetCat,
    deleteAssetCatPage, deleteAssetCat,

}