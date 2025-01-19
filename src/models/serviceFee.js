const mongoose = require('mongoose')

const serviceFeeSchema = new mongoose.Schema({
    ServiceFeeID: { type: String, required: true },
    ApartID: { type: Number, required: true },
    Owner: { type: String, required: true },
    PaymentMonth: { type: Date },
    ParkingFee: { type: Number, required: true },
    GarbageFee: { type: Number, required: true },
    EnvironmentalFee: { type: Number, required: true },
    TotalFee: { type: Number },
    Status: { type: String, required: true }
});
const ServiceFee = mongoose.model('ServiceFee', serviceFeeSchema);

module.exports = ServiceFee;