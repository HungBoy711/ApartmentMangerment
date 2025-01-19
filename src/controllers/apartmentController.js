const express = require('express');
const Apartment = require('../models/apartment')
const Citizen = require('../models/citizen')
const paginate = require('../utils/paginate');

const getApartmentPage = async (req, res) => {
    try {
        const { results, pagination } = paginate(req, Apartment.find({}));

        const totalApartments = await Apartment.countDocuments({});
        const totalPages = Math.ceil(totalApartments / pagination.limit);

        let listApartments = await results;
        return res.render('apartments/apartmentPage.ejs', {
            listApartments: listApartments,
            currentPage: pagination.page,
            totalPages: totalPages
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Lỗi không tìm thấy dữ liệu' });
    }

}
const getApartmentDetail = async (req, res) => {
    try {
        let apartID = req.params.ApartID;
        let citizen = await Citizen.find({ ApartID: apartID }).exec();
        return res.render('apartments/apartmentDetail.ejs', { citizen: citizen })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Lỗi không tìm thấy dữ liệu' });
    }

}

const createApartment = async (req, res) => {
    try {

        let { currentPage, ApartID, CitizenCount, Floor, Status, Size } = req.body;
        console.log(currentPage)
        await Apartment.create({
            ApartID,
            CitizenCount,
            Floor,
            Status,
            Size,
        });
        res.status(200).redirect(`/apartment`);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Lỗi dữ liệu không hợp lệ' });
    }
};

const editApartment = async (req, res) => {
    let { currentPage, ID, ApartID, CitizenCount, Floor, Status, Size } = req.body;
    try {
        await Apartment.updateOne({ _id: ID }, {
            ApartID: ApartID,
            CitizenCount: CitizenCount,
            Floor: Floor,
            Status: Status,
            Size: Size
        });
        res.status(200).redirect(`/apartment?page=${currentPage}&limit=8`);
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Lỗi dữ liệu không hợp lệ' });
    }
}

const deleteApartment = async (req, res) => {
    let ID = req.body.ID
    try {
        await Apartment.deleteOne({
            _id: ID
        });
        res.status(200).redirect('/apartment');
    }
    catch (error) {
        res.status(400).json({ message: 'Lỗi' });
    }

}

module.exports = {
    getApartmentPage, getApartmentDetail,
    editApartment, createApartment,
    deleteApartment
}