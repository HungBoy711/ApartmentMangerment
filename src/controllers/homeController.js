const express = require('express');
const Apartment = require('../models/apartment')
const Citizen = require('../models/citizen')
const Asset = require('../models/asset')
const User = require('../models/user')

const getStatistical = async (req, res) => {
    try {
        let [countApartInUse, countEmpty, countCitizen,
            countApart, countAsset, countUser] = await Promise.all([
                Apartment.countDocuments({ Status: "Đang ở" }),
                Apartment.countDocuments({ Status: "Trống" }),
                Citizen.countDocuments({}),
                Apartment.countDocuments({}),
                Asset.countDocuments({}),
                User.countDocuments({})
            ]);
        return res.render('home/homePage', {
            countApartInUse,
            countEmpty,
            countCitizen,
            countApart,
            countAsset,
            countUser
        });
    } catch (error) {
        return res.render('errorData.ejs');
    }
}

module.exports = { getStatistical }
