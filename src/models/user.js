const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    Username: { type: String, unique: true, required: true },
    Password: { type: String, required: false },
    Role: { type: String, required: true },
    Email: { type: String, required: true },
    Gender: { type: String, required: true },
    Phone: { type: Number, required: true }
});

const User = mongoose.model('User', userSchema);
module.exports = User;