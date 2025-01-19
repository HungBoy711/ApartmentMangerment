const mongoose = require('mongoose')

const debitHistorySchema = new mongoose.Schema({
    ServiceFeeID: { type: String, required: true },
    Description: { type: String, required: true },
    ApartID: { type: Number, required: true },
    Owner: { type: String, required: true },
    PaymentMonth: { type: Date },
    ParkingFee: { type: Number, required: true },
    GarbageFee: { type: Number, required: true },
    EnvironmentalFee: { type: Number, required: true },
    TotalFee: { type: Number, required: true },
    AmountOwed: { type: Number, required: false }

});
const DebitHistory = mongoose.model('DebitHistory', debitHistorySchema);

module.exports = DebitHistory;