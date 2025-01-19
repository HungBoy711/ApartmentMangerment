const express = require('express');
const ServiceFee = require('../models/serviceFee')
const DebitHistory = require('../models/debitHistory')

const getServiceFeePage = async (req, res) => {
    try {
        const results = await ServiceFee.aggregate([
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
        return res.render('servicefees/serviceFeePage.ejs', { listServiceFees: results })
    } catch (error) {
        console.error("Lỗi", error);
    }
};

const createServiceFee = async (req, res) => {
    let { ServiceFeeID, ApartID, Owner, PaymentMonth, ParkingFee,
        GarbageFee, EnvironmentalFee, Status } = req.body
    try {
        await ServiceFee.create({
            ServiceFeeID,
            ApartID,
            Owner,
            PaymentMonth,
            GarbageFee,
            ParkingFee,
            EnvironmentalFee,
            Status
        })
        res.status(200).redirect('/serviceFee');
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Lỗi dữ liệu không hợp lệ' });
    }
}

const editServiceFee = async (req, res) => {
    let { ID, ServiceFeeID, ApartID, Owner, PaymentTerm,
        GarbageFee, EnvironmentalFee, Status } = req.body
    try {
        await ServiceFee.updateOne({ _id: ID },
            {
                ServiceFeeID,
                ApartID,
                Owner,
                PaymentTerm,
                GarbageFee,
                ParkingFee,
                EnvironmentalFee,
                Status
            })
        res.status(200).redirect('/serviceFee');
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Lỗi dữ liệu không hợp lệ' });
    }
}

const deleteServiceFee = async (req, res) => {
    let ID = req.body.ID
    try {
        await ServiceFee.deleteOne({
            _id: ID
        });
        res.status(200).redirect('/serviceFee');
    }
    catch (error) {
        res.status(400).json({ message: 'Lỗi' });
    }
}


const getDebitPage = async (req, res) => {
    let ID = req.params.id;
    let results = await ServiceFee.findById(ID).exec();
    return res.render('servicefees/getDebitPage', { servicefee: results })
};
const debit = async (req, res) => {
    let { ServiceFeeID, Owner, ApartID, PaymentMonth, PaymentDate, Description,
        ParkingFee, GarbageFee, EnvironmentalFee, TotalFee, Status, AmountOwed } = req.body;

    try {
        await DebitHistory.create({
            ServiceFeeID,
            PaymentMonth,
            PaymentDate,
            Description,
            ApartID,
            Owner,
            ParkingFee,
            GarbageFee,
            EnvironmentalFee,
            TotalFee,
            Status,
            AmountOwed
        });
        res.status(200).redirect('/serviceFee');
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Lỗi' });
    };
};


module.exports = {
    getServiceFeePage, createServiceFee,
    editServiceFee, deleteServiceFee,
    debit, getDebitPage
}