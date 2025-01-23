const express = require('express');
const Apartment = require('../models/apartment')
const Citizen = require('../models/citizen')
const Contract = require('../models/contract')
const Asset = require('../models/asset')
const Invoice = require('../models/invoice')


const getData = async (req, res) => {
    try {
        // let countApart = await Apartment.find({}).count();
        // let countCitizen = await Citizen.find({}).count();
        // let countContract = await Contract.find({}).count();
        // let countAsset = await Asset.find({}).count();
        // let countInvoice = await Invoice.find({}).count();

        // let [results] = await Invoice.aggregate([
        //     {
        //         $group: {
        //             _id: null,
        //             totalAmount: {
        //                 $sum: {
        //                     $add: ["$ApartmentFee", "$ElectricityFee", "$WaterFee"]
        //                 }
        //             }
        //         }
        //     }
        // ]);

        // const totalInvoive = results ? results.totalAmount : 0

        // let ContractWithBuy = await Contract.find({ ContractType: "Mua bán" });
        // let ContractWithRent = await Contract.find({ ContractType: "Cho thuê" });

        return res.render('home/homePage', );
    } catch (error) {
        console.error("Lỗi data:", error);
        return res.render('errorData.ejs');
    }
}

module.exports = { getData }