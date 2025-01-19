const express = require('express');
const DebitHistory = require('../models/debitHistory')

const api_paid = process.env.API_GET_PAID;
const api_key = process.env.API_KEY;

const getDebitHistoryPage = async (req, res) => {
    let results = await DebitHistory.aggregate([
        {
            $project: {
                _id: 1,
                ServiceFeeID: 1,
                Owner: 1,
                ApartID: 1,
                PaymentMonth: {
                    $dateToString: { format: "%m-%Y", date: "$PaymentMonth" }
                },
                AmountOwed: 1,
                TotalFee: 1
            }
        },
        { $sort: { _id: -1 } }
    ]);
    return res.render('debitHistories/debitHistoryPage.ejs', { listDebitHistories: results })
}

const searchDebitDate = async (req, res) => {
    try {
        let month = req.body.month;
        let monthString = `${month}${"-01"}`;
        console.log(monthString)
        let results = await DebitHistory.aggregate([
            {
                $match: {
                    PaymentMonth: {
                        $eq: new Date(monthString)
                    }
                }
            },
            {
                $project: {
                    _id: 1,
                    ServiceFeeID: 1,
                    Owner: 1,
                    ApartID: 1,
                    PaymentMonth: {
                        $dateToString: { format: "%m-%Y", date: "$PaymentMonth" }
                    },
                    PaymentDate: {
                        $dateToString: { format: "%d-%m-%Y", date: "$PaymentDate" }
                    },
                    TotalFee: 1
                }
            }
        ]);
        return res.render('debitHistories/debitHistoryPage.ejs', { listDebitHistories: results })
    }
    catch (error) {
        console.log(error)
    }
}


const getPaymentHistoryBank = async (req, res) => {
    try {
        const response = await fetch(api_paid, {
            headers: {
                Authorization: `apikey ${api_key}`,
                "Content-Type": "application/json",
            },
        });
        const dataPayment = await response.json();

        const formattedRecords = dataPayment.data.records.map(record => {
            return {
                ...record,
                formattedDate: formatDate(record.when),
                money: formatMoney(record.amount)
            };
        });
        return res.render('paymentHistories/paymentHistoryPage.ejs', {
            listPaymentHistories: formattedRecords,
        });

    } catch (error) {
        console.log(error);
    }
};
const formatMoney = (amout) => {
    const moneyConvert = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
    return moneyConvert.format(amout);
}
const formatDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

module.exports = {
    getDebitHistoryPage, searchDebitDate
}