const express = require('express');
const Citizen = require('../models/citizen')
const paginate = require('../utils/paginate');


const getCitizenPage = async (req, res) => {
    try {
        const { results, pagination } = paginate(req, Citizen.find({}));
        const totalCitizens = await Citizen.countDocuments({});
        const totalPages = Math.ceil(totalCitizens / pagination.limit);

        const listCitizens = await results;

        return res.render('citizens/citizenPage.ejs', {
            listCitizens: listCitizens,
            currentPage: pagination.page,
            totalPages: totalPages
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Lỗi không tìm thấy dữ liệu' });
    }
};

const searchCitizen = async (req, res) => {
    let name = req.body.data;
    try {
        if (!name || name.trim() === '') {
            return res.redirect('/citizen');
        }
        const { results, pagination } = paginate(req, Citizen.find({ Name: { $regex: name, $options: "i" } }))

        const totalCitizens = await Citizen.countDocuments({ Name: { $regex: name, $options: "i" } });
        const totalPages = Math.ceil(totalCitizens / pagination.limit);

        const listCitizens = await results;
        return res.render('citizens/citizenPage.ejs', {
            listCitizens: listCitizens,
            currentPage: pagination.page,
            totalPages: totalPages
        });
    } catch (error) {
        res.status(400).json({ message: 'Lỗi dữ liệu tìm kiếm' });
    }
};

const searchCitizenRoom = async (req, res) => {
    let room = Number(req.body.data);
    try {
        if (!room || room == null) {
            return res.redirect('/citizen');
        }
        const { results, pagination } = paginate(req, Citizen.find({ ApartID: room }))

        const totalCitizens = await Citizen.countDocuments({ ApartID: room });
        const totalPages = Math.ceil(totalCitizens / pagination.limit);


        const listCitizens = await results;
        return res.render('citizens/citizenPage.ejs', {
            listCitizens: listCitizens,
            currentPage: pagination.page,
            totalPages: totalPages
        });
    } catch (error) {
        res.status(400).json({ message: 'Lỗi dữ liệu tìm kiếm' });
    }
};
const getCitizenDetail = async (req, res) => {
    try {
        let citizenID = req.params.CitizenID;
        let citizen = await Citizen.findOne({ CitizenID: citizenID });
        console.log(citizen)
        return res.render('citizens/citizenDetail.ejs', {
            citizen: citizen
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Lỗi không tìm thấy dữ liệu' });
    }
}

module.exports = {
    getCitizenPage, getCitizenDetail,
    searchCitizen, searchCitizenRoom
}