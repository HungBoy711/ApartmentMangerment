const express = require('express');
const Asset = require('../models/asset');
const paginate = require('../utils/paginate');

const getAssetPage = async (req, res) => {
    try {
        let { results, pagination } = paginate(req, Asset.find({}));
        let totalAssets = await Asset.countDocuments({});
        let totalPages = Math.ceil(totalAssets / pagination.limit);

        let listAssets = await results;
        return res.render('assets/assetPage.ejs',
            {
                listAssets: listAssets,
                currentPage: pagination.page,
                totalPages: totalPages,
                messages: req.flash()
            })
    }
    catch (error) {
        console.log(error); r
        es.status(400).json({ message: 'Lỗi không tìm thấy dữ liệu' });
    }
}

const searchAssetCategory = async (req, res) => {
    let assetcategory = req.body.searchData;
    try {
        if (!assetcategory || assetcategory.trim() === '') {
            return res.redirect('/asset');
        }
        const listAssets = await Asset.find({ AssetCategory: assetcategory });
        return res.render('assets/assetPage.ejs',
            {
                listAssets: listAssets,
                messages: req.flash(),
                currentPage: null,
                totalPages: null
            })
    } catch {
        res.status(400).json({ message: 'Lỗi dữ liệu tìm kiếm' });
    }
}

const createAssetPage = async (req, res) => {
    return res.render('assets/createAsset.ejs', { messages: req.flash() });
};
const createAsset = async (req, res) => {
    let { AssetID, AssetCategory, Name, PurchaseDate, Status, Location } = req.body;
    try {
        const assetExists = await Asset.findOne({ AssetID });

        if (!assetExists) {
            await Asset.create({ AssetID, AssetCategory, Name, PurchaseDate, Status, Location });
            req.flash("successAddAsset", "Thêm mới tài sản thành công!");
            return res.redirect(`/asset`);
        } else {
            req.flash("errorIdAsset", "Lỗi trùng mã tài sản, vui lòng nhập lại!");
            return res.redirect(`/asset/createAssetPage`);
        }
    } catch (error) {
        return res.send("error", "Lỗi dữ liệu không hợp lệ!");
    }
};

const editAssetPage = async (req, res) => {
    let AssetID = req.params.AssetID;
    let asset = await Asset.findOne({ AssetID });
    return res.render('assets/editAsset.ejs', { asset: asset, messages: req.flash() });
};

const editAsset = async (req, res) => {
    let { AssetID, AssetCategory, Name, PurchaseDate, Status, Location } = req.body;
    try {
        await Asset.updateOne({ AssetID: AssetID }, { AssetID, AssetCategory, Name, PurchaseDate, Status, Location });
        req.flash("successEditAsset", "Sửa thông tin= tài sản thành công!");
        res.redirect('/asset');
    } catch (error) {
        res.status(400).json({ message: 'Lỗi dữ liệu không hợp lệ' });
    }
};

const deleteAsset = async (req, res) => {
    let AssetID = req.body.AssetID
    try {
        await Asset.deleteOne({ AssetID: AssetID });
        req.flash("successDeleteAsset", "Xóa tài sản thành công!");
        res.redirect('/asset');
    } catch (error) {
        res.status(400).json({ message: 'Lỗi dữ liệu không hợp lệ' });
    }
};

module.exports = {
    getAssetPage,
    createAssetPage, createAsset,
    editAssetPage, editAsset,
    deleteAsset, searchAssetCategory
};
