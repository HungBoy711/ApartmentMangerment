const mongoose = require('mongoose')

const apartmentSchema = new mongoose.Schema({
    ApartID: { type: Number, required: true },
    TotalRoom: { type: Number, required: true },
    Floor: { type: Number, required: true },
    Status: { type: String, required: true },
    Size: { type: Number, required: true }
});
const Apartment = mongoose.model('Apartment', apartmentSchema);

module.exports = Apartment;
