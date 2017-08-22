const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    role: String
});

module.exports = mongoose.model('Users', userSchema);
