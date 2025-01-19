const express = require('express');
const Contract = require('../models/contract')

const getContractPage = async (req, res) => {
    let contract = await Contract.find({})
    return res.render('contracts/contractPage', { listContracts: contract });
}
const createContract = async (req, res) => {
    let ContractID = req.body.ContractID
    let ApartNumber = req.body.ApartNumber
    let Owner = req.body.Owner
    let ContractType = req.body.ContractType
    let ContractStartDate = req.body.ContractStartDate
    let ContractEndDate = req.body.ContractEndDate
    let ContractStatus = req.body.ContractStatus
    await Contract.create({
        ContractID: ContractID,
        ApartNumber: ApartNumber,
        Owner: Owner,
        ContractType: ContractType,
        ContractStartDate: ContractStartDate,
        ContractEndDate: ContractEndDate,
        ContractStatus: ContractStatus,
    }
    )

    res.redirect('/contract')
}
const deleteContract = async (req, res) => {
    let ID = req.body.ID
    await Contract.deleteOne({
        _id: ID
    });
    res.redirect('/contract');
}
const editContract = async (req, res) => {
    let ID = req.body.ID;
    let ContractID = req.body.ContractID;
    let ApartNumber = req.body.ApartNumber
    let Owner = req.body.Owner;
    let ContractType = req.body.ContractType;
    let ContractStartDate = req.body.ContractStartDate;
    let ContractEndDate = req.body.ContractEndDate;
    let ContractStatus = req.body.ContractStatus;

    await Contract.updateOne({ _id: ID }, {
        ContractID: ContractID,
        ApartNumber: ApartNumber,
        Owner: Owner,
        ContractType: ContractType,
        ContractStartDate: ContractStartDate,
        ContractEndDate: ContractEndDate,
        ContractStatus: ContractStatus
    });

    res.redirect('/contract');
}

module.exports = {
    getContractPage, createContract,
    deleteContract, editContract

}