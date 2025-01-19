const express = require('express');
const Citizen = require('../models/citizen')
const paginate = require('../utils/paginate');


const getCitizenPage = async (req, res) => {
    try {
        const { results, pagination } = paginate(req, Citizen.find({}).sort({ _id: -1 }));
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

const createCitizen = async (req, res) => {
    let { currentPage, CitizenID, ApartID, Relationship, Name, BirthDay, Gender, Hometown, Phone } = req.body;
    try {
        await Citizen.create({
            CitizenID,
            ApartID,
            Relationship,
            Name,
            BirthDay,
            Gender,
            Hometown,
            Phone
        })
        res.status(200).redirect('/citizen');
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Lỗi dữ liệu ' });
    }

}

const editCitizen = async (req, res) => {
    let { ID, CitizenID, ApartID, Relationship, Name, Gender, Hometown, BirthDay, Phone } = req.body;
    try {
        await Citizen.updateOne({ _id: ID }, {
            CitizenID,
            ApartID,
            Relationship,
            Name,
            BirthDay,
            Gender,
            Hometown,
            Phone
        });

        res.redirect('/citizen');
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Lỗi dữ liệu không hợp lệ' });
    }
}

const deleteCitizen = async (req, res) => {
    let ID = new ObjectId(req.body.ID);
    try {
        await Citizen.deleteOne({
            _id: ID
        });
        res.redirect('/citizen');
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Lỗi' });
    }

}
module.exports = {
    getCitizenPage, createCitizen,
    deleteCitizen, editCitizen,
    searchCitizen, searchCitizenRoom
}