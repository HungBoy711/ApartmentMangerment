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
const searchApartmentNumber = async (req, res) => {
    let name = req.body.data;
    try {
        if (!name || name.trim() === '') {
            return res.redirect('/apartment');
        }
        const listApartments = await Apartment.find({ ApartID: name });
        return res.render('apartments/apartmentPage.ejs', {
            listApartments: listApartments,
        });
    } catch (error) {
        res.status(400).json({ message: 'Lỗi dữ liệu tìm kiếm' });
    }
};
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

const createApartmentPage = async (req, res) => {
    const errorID = null
    return res.render('apartments/createApartment.ejs', { errorID: errorID })
}
const createApartment = async (req, res) => {
    try {
        let { ApartID, TotalRoom, Floor, Status, Size } = req.body;
        const apartmentID = await Apartment.findOne({ ApartID })
        if (!apartmentID) {
            await Apartment.create({
                ApartID,
                TotalRoom,
                Floor,
                Status,
                Size,
            });
            res.status(200).redirect(`/apartment`);

        }
        else {
            const errorID = " Số căn hộ bị trùng, mời nhập lại!"
            return res.render('apartments/createApartment.ejs', { errorID: errorID })
        }
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
    createApartmentPage,
    editApartment, createApartment,
    deleteApartment, searchApartmentNumber
}