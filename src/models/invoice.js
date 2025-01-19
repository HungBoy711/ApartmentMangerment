const mongoose = require('mongoose')

const invoiceSchema = new mongoose.Schema({
    InvoiceID: String,
    ContractID: String,
    PaymentTerm: Date,
    ApartmentFee: Number,
    ElectricityFee: Number,
    WaterFee: Number,
    Total: Number

});
const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;