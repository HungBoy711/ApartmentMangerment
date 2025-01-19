const mongoose = require('mongoose')

const citizenAccountSchema = new mongoose.Schema({
    ApartID: { type: Number, required: true },
    Password: { type: String, required: true }
});
const CitizenAccount = mongoose.model('CitizenAccount', citizenAccountSchema);

module.exports = CitizenAccount;
