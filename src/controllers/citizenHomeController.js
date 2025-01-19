const express = require('express');
const CitizenAccount = require('../models/citizenAccount')
const Contract = require('../models/contract')
const Citizen = require('../models/citizen')
const DebitHistory = require('../models/debitHistory')
const ServiceFee = require('../models/serviceFee')

const getCitizenHomePage = async (req, res) => {
    try {
        const citizenAccount = res.locals.citizenAccount;
        const member = await Citizen.find({ ApartID: citizenAccount.ApartID })
        const contract = await Contract.find({ ApartNumber: citizenAccount.ApartID })
        const servicefee = await ServiceFee.aggregate([
            {
                $match: {
                    ApartID: citizenAccount.ApartID
                }
            },
            {
                $project: {
                    ServiceFeeID: 1,
                    ApartID: 1,
                    Owner: 1,
                    PaymentMonth: {
                        $dateToString: { format: "%d-%m-%Y", date: "$PaymentMonth" }
                    },
                    ParkingFee: 1,
                    GarbageFee: 1,
                    EnvironmentalFee: 1,
                    TotalFee: { $sum: ["$ParkingFee", "$GarbageFee", "$EnvironmentalFee"] },
                    Status: 1
                }
            }
        ]);
        const debithistory = await DebitHistory.find({ ApartID: citizenAccount.ApartID })
        console.log(servicefee)
        return res.render('home/citizenHomePage.ejs',
            {
                member: member,
                contract: contract,
                servicefee: servicefee,
                debithistory: debithistory
            }
        );

    } catch (error) {
        return res.render('errorData.ejs');
    }
}

module.exports = { getCitizenHomePage }