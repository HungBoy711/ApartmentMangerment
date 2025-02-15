const express = require('express');
const Apartment = require('../models/apartment')
const Citizen = require('../models/citizen')
const Asset = require('../models/asset')

const getData = async (req, res) => {
    try {
        const [countApart, countEmpty, countCitizen] = await Promise.all([
            Apartment.countDocuments({ Status: "Đang ở" }),
            Apartment.countDocuments({ Status: "Trống" }),
            Citizen.countDocuments({})
        ]);
        return res.render('home/homePage', {
            countApart,
            countEmpty,
            countCitizen
        });
    } catch (error) {
        return res.render('errorData.ejs');
    }
}

module.exports = { getData }