const express = require('express');
const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const getLoginPage = async (req, res) => {
    try {
        return res.render('auth/loginPage.ejs')
    } catch (error) {
        res.status(500).json({ error: 'hiển thị thất bại', details: error });
    }
}
const getLoginCitizenPage = async (req, res) => {
    try {
        return res.render('auth/loginCitizenPage.ejs')
    } catch (error) {
        res.status(500).json({ error: 'hien thi that bai' });
    }
}
const Login = async (req, res) => {
    try {
        const { Username, Password } = req.body;
        const user = await User.findOne({ Username });
        if (!user) {
            return res.status(401).json({ error: 'Xac thuc user that bai' });
        }
        const passwordMatch = await bcrypt.compare(Password, user.Password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Xac thuc mk that bai' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });
        res.cookie('jwt', token, { httpOnly: true, secure: true, sameSite: 'None' });
        res.locals.user = user;
        return res.redirect('/')
    } catch (error) {
        res.status(500).json({
            error: 'Đăng nhập thất bại',
            message: error.message,
            stack: error.stack
        });
        res.send(error)
    }
}
const LoginCitizen = async (req, res) => {
    try {
        const { ApartID, Password } = req.body;
        const citizenAccount = await CitizenAccount.findOne({ ApartID });
        if (!citizenAccount) {
            return res.status(401).json({ error: 'Xac thuc user that bai' });
        }

        if (Password !== citizenAccount.Password) {
            return res.status(401).json({ error: 'Xac thuc mk that bai' });
        }
        return res.redirect('/citizenHomePage')
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Dang nhap that bai' });
    }
}
const Logout = async (req, res) => {
    res.clearCookie('jwt');
    res.redirect('/login');
}
module.exports = {
    getLoginCitizenPage, getLoginPage,
    Login, Logout,
    LoginCitizen
}