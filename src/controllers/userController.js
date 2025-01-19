const express = require('express');
const User = require('../models/user'); // Đảm bảo bạn đã có model User

const getUserPage = async (req, res) => {
    let users = await User.find({});
    return res.render('users/userPage', { listUsers: users });
};

const createUser = async (req, res) => {
    let { Username, Role, Email, Gender, Phone } = req.body;
    try {
        await User.create({
            Username,
            Role,
            Email,
            Gender,
            Phone,
        });
        res.redirect('/user');
    } catch (error) {
        console.error(error);
        res.status(500).send('Loi tao nguoi dung');
    }
};

const deleteUser = async (req, res) => {
    let ID = req.body.ID;
    try {
        await User.deleteOne({ _id: ID });
        res.redirect('/user');
    } catch (error) {
        console.error(error);
        res.status(500).send('Loi xoa nguoi dung');
    }
};

const editUser = async (req, res) => {
    let { ID, Username, Password, Role, Email, Gender, Phone } = req.body;
    try {
        await User.updateOne({ _id: ID }, {
            Username,
            Password,
            Role,
            Email,
            Gender,
            Phone,
        });
        res.redirect('/user');
    } catch (error) {
        console.error(error);
        res.render('errorData.ejs');
    }
};

module.exports = {
    getUserPage, createUser,
    deleteUser, editUser
};
