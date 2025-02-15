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
        return res.render('apartments/apartmentPage.ejs',
            {
                listApartments: listApartments,
                messages: req.flash(),
                currentPage: null,
                totalPages: null
            })
    } catch (error) {
        res.status(400).json({ message: 'Lỗi dữ liệu tìm kiếm' });
    }
};
const getApartmentDetail = async (req, res) => {
    try {
        let apartID = req.params.ApartID;
        let citizen = await Citizen.find({ ApartID: apartID }).exec();

        let citizenCount = await Citizen.countDocuments({ ApartID: apartID });
        const status = citizenCount > 0 ? "Đang ở" : "Trống";
        await Apartment.updateOne({ ApartID: apartID }, { $set: { Status: status } });

        return res.render('apartments/apartmentDetail.ejs', {
            messages: req.flash(), citizen: citizen, apartID: apartID
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Lỗi không tìm thấy dữ liệu' });
    }
}

const createApartmentPage = async (req, res) => {
    return res.render('apartments/createApartment.ejs', { messages: req.flash() });
}

const createApartment = async (req, res) => {
    let { ApartID, TotalRoom, Floor, Status, Size } = req.body;
    try {
        const apartmentID = await Apartment.findOne({ ApartID });

        if (!apartmentID) {
            await Apartment.create({ ApartID, TotalRoom, Floor, Status, Size });
            req.flash("successAddAp", "Thêm mới căn hộ thành công!");
            return res.redirect(`/apartment`);
        } else {
            req.flash("errorIdAp", "Lỗi trùng số căn hộ, vui lòng nhập lại!");
            return res.redirect(`/apartment/createApartmentPage`);
        }
    } catch (error) {
        req.send("error", "Lỗi dữ liệu không hợp lệ!");
        return res.redirect(`/apartment`);
    }
};

const editApartmentPage = async (req, res) => {
    let ApartID = req.params.ApartID
    let apartment = await Apartment.findOne({ ApartID: ApartID });
    return res.render('apartments/editApartment.ejs', { apartment: apartment })
}
const editApartment = async (req, res) => {
    let { ApartID, TotalRoom, Floor, Status, Size } = req.body;
    try {
        await Apartment.updateOne({ ApartID: ApartID }, {
            TotalRoom,
            Floor: Floor,
            Status: Status,
            Size: Size
        });
        req.flash("successEditAp", "Sửa thông tin căn hộ thành công!");
        res.status(200).redirect(`/apartment`);
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
        req.flash("successDeleteAp", "Xóa căn hộ thành công!")
        res.status(200).redirect('/apartment');
    }
    catch (error) {
        res.status(400).json({ message: 'Lỗi' });
    }
}
const createCitizenPage = async (req, res) => {
    let apartID = req.params.ApartID
    return res.render('apartments/createCitizen.ejs', { messages: req.flash(), apartID: apartID });
}
const createCitizen = async (req, res) => {
    let { CitizenID, ApartID, IdentificationCard, Role, Relationship,
        Name, BirthDay, Gender, Hometown, Phone } = req.body;
    try {
        const citizenID = await Citizen.findOne({ CitizenID })
        if (!citizenID) {
            await Citizen.create({
                CitizenID,
                ApartID,
                IdentificationCard,
                Role,
                Relationship,
                Name,
                BirthDay,
                Gender,
                Hometown,
                Phone
            })
            req.flash("successAddCitizen", "Thêm mới cư dân thành công!")
            res.status(200).redirect(`/apartment/${ApartID}`);
        } else {
            req.flash("errorIdCitizen", "Lỗi trùng mã cư dân, vui lòng nhập lại!");
            res.status(500).redirect(`/apartment/${ApartID}/createCitizenPage`);
        }
    }
    catch (error) {
        res.status(400).json({ message: 'Lỗi dữ liệu' });
    }
}
const editCitizenPage = async (req, res) => {
    let apartID = req.params.ApartID
    let CitizenID = req.params.CitizenID
    let citizen = await Citizen.findOne({ CitizenID: CitizenID });
    return res.render('apartments/editCitizen.ejs', { citizen: citizen, apartID: apartID })
}
const editCitizen = async (req, res) => {
    let { CitizenID, ApartID, Name, BirthDay, Phone,
        IdentificationCard, Gender, Hometown, Relationship, Role } = req.body;
    try {
        await Citizen.updateOne({ CitizenID: CitizenID }, {
            Name,
            BirthDay,
            Phone,
            IdentificationCard,
            Gender,
            Hometown,
            Relationship,
            Role
        });
        req.flash("successEditCitizen", "Sửa thông tin cư dân thành công!");
        res.status(200).redirect(`/apartment/${ApartID}`);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Lỗi dữ liệu không hợp lệ' });
    }
};
const deleteCitizen = async (req, res) => {
    let ApartID = req.body.ApartID
    let CitizenID = req.body.CitizenID
    try {
        await Citizen.deleteOne({
            CitizenID: CitizenID
        });
        req.flash("successDeleteCitizen", "Xóa Cư dân thành công!")
        res.status(200).redirect(`/apartment/${ApartID}`);
    }
    catch (error) {
        res.status(400).json({ message: 'Lỗi' });
    }
}
module.exports = {
    getApartmentPage, getApartmentDetail,
    createApartmentPage, createApartment,
    editApartmentPage, editApartment,
    deleteApartment, searchApartmentNumber,
    createCitizenPage, createCitizen,
    editCitizenPage, editCitizen,
    deleteCitizen
}