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
            totalPages: totalPages,
            messages: req.flash()
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
        })
    } catch (error) {
        res.status(400).json({ message: 'Lỗi dữ liệu tìm kiếm' });
    }
};
const getApartmentDetail = async (req, res) => {
    try {
        let apartID = req.params.ApartID;
        let citizen = await Citizen.find({ ApartID: apartID }).exec();
        return res.render('apartments/apartmentDetail.ejs', { citizen: citizen, apartID: apartID })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Lỗi không tìm thấy dữ liệu' });
    }
}

const createApartmentPage = async (req, res) => {
    return res.render('apartments/createApartment.ejs', { messages: req.flash() });
}

const createApartment = async (req, res) => {
    try {
        let { ApartID, TotalRoom, Floor, Status, Size } = req.body;
        const apartmentID = await Apartment.findOne({ ApartID });

        if (!apartmentID) {
            await Apartment.create({ ApartID, TotalRoom, Floor, Status, Size });
            req.flash("success", "Thêm mới căn hộ thành công!");
            return res.redirect(`/apartment`);
        } else {
            req.flash("error", "Lỗi trùng số căn hộ, vui lòng nhập lại!");
            return res.redirect(`/apartment/createApartmentPage`);
        }
    } catch (error) {
        console.log(error);
        req.flash("error", "Lỗi dữ liệu không hợp lệ!");
        return res.redirect(`/apartment`);
    }
};

const editApartmentPage = async (req, res) => {
    let ApartID = req.params.ApartID
    let apartment = await Apartment.findById(ApartID).exec();
    return res.render('apartments/editApartment.ejs', { apartment: apartment })
}
const editApartment = async (req, res) => {
    let { currentPage, ApartID, CitizenCount, Floor, Status, Size } = req.body;
    try {
        await Apartment.updateOne({ ApartID: ApartID }, {
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
    let ApartID = req.body.ApartID
    try {
        await Apartment.deleteOne({
            ApartID: ApartID
        });
        req.flash("successDelete", "Xóa căn hộ thành công!")
        res.status(200).redirect('/apartment');
    }
    catch (error) {
        res.status(400).json({ message: 'Lỗi' });
    }

}

module.exports = {
    getApartmentPage, getApartmentDetail,
    createApartmentPage, createApartment,
    editApartmentPage, editApartment,
    deleteApartment, searchApartmentNumber
}